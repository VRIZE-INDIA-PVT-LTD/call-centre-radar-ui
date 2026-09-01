import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CallRecord } from '../../models/call-radar.models';
import { CallRadarService } from '../../services/call-radar-service';
import { CallRadarStore } from '../../services/call-radar.store';

@Component({
  imports: [RouterLink, NgClass, DatePipe],
  selector: 'app-call-detail',
  styleUrl: './call-detail.scss',
  templateUrl: './call-detail.html',
})
export class CallDetail implements OnInit {
  private static readonly MANAGER_ATTENTION_THRESHOLD = 65;
  private static readonly WAVEFORM_BAR_COUNT = 72;
  private static readonly WAVEFORM_MAX_HEIGHT = 64;
  private static readonly WAVEFORM_MIN_HEIGHT = 4;

  private readonly route = inject(ActivatedRoute);
  private readonly callRadarService = inject(CallRadarService);
  private readonly store = inject(CallRadarStore);

  readonly callId = this.route.snapshot.paramMap.get('callId') ?? '';
  readonly uploadedCall = this.getUploadedCallFromNavigationState();
  readonly call = this.uploadedCall ?? this.store.getCallById(this.callId);
  readonly audioSource = this.call ? this.callRadarService.getCallAudioUrl(this.call.id) : '';
  readonly waveformBars = signal<number[]>([]);
  readonly currentTime = signal(0);
  readonly playbackDuration = signal(this.call?.durationSec ?? 0);
  readonly isPlaying = signal(false);
  readonly customerPriorCalls = this.call
    ? this.store.getCallsByCustomer(this.call.customerId).filter((row) => row.id !== this.call?.id).length
    : 0;
  readonly customerSatisfaction = this.call
    ? Math.min(5, Math.max(2.3, Number(((this.call.needsAttention / 25) * -0.2 + 4.6).toFixed(1))))
    : 0;
  readonly managerAttentionNeeded = this.call
    ? this.call.needsAttention >= CallDetail.MANAGER_ATTENTION_THRESHOLD
    : false;

  async ngOnInit(): Promise<void> {
    if (!this.call) {
      return;
    }

    try {
      const audioData = await firstValueFrom(this.callRadarService.getCallAudioData(this.call.id));
      const audioContext = new AudioContext();

      try {
        const audioBuffer = await audioContext.decodeAudioData(audioData);
        this.waveformBars.set(this.buildWaveform(audioBuffer));
      } finally {
        await audioContext.close();
      }
    } catch {
      this.waveformBars.set([]);
    }
  }

  formatClock(seconds: number): string {
    const wholeSeconds = Math.max(0, Math.floor(seconds));
    const min = Math.floor(wholeSeconds / 60)
      .toString()
      .padStart(2, '0');
    const sec = (wholeSeconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  }

  playbackProgress(): number {
    return this.playbackDuration() > 0 ? this.currentTime() / this.playbackDuration() : 0;
  }

  displayedTranscript() {
    if (!this.call || !this.isPlaying()) {
      return this.call?.transcript ?? [];
    }

    const currentTime = this.currentTime();
    return this.call.transcript.filter((turn) => currentTime >= turn.startSec);
  }

  updatePlayback(audio: HTMLAudioElement): void {
    this.currentTime.set(audio.currentTime);

    if (Number.isFinite(audio.duration)) {
      this.playbackDuration.set(audio.duration);
    }
  }

  seekTo(event: Event, audio: HTMLAudioElement): void {
    const requestedTime = Number((event.target as HTMLInputElement).value);
    audio.currentTime = requestedTime;
    this.currentTime.set(requestedTime);
  }

  async togglePlayback(audio: HTMLAudioElement): Promise<void> {
    if (audio.paused) {
      await audio.play();
      return;
    }

    audio.pause();
  }

  getMoodColor(mood: number): string {
    const normalized = Math.max(0, Math.min(100, mood));
    const hue = (normalized / 100) * 120;
    return `hsl(${hue}, 84%, 46%)`;
  }

  private buildWaveform(audioBuffer: AudioBuffer): number[] {
    const channelData = Array.from(
      { length: audioBuffer.numberOfChannels },
      (_, channel) => audioBuffer.getChannelData(channel),
    );
    const samplesPerBar = Math.max(1, Math.floor(audioBuffer.length / CallDetail.WAVEFORM_BAR_COUNT));
    const amplitudes = Array.from({ length: CallDetail.WAVEFORM_BAR_COUNT }, (_, barIndex) => {
      const start = barIndex * samplesPerBar;
      const end = Math.min(start + samplesPerBar, audioBuffer.length);
      let sumOfSquares = 0;
      let sampleCount = 0;

      for (const samples of channelData) {
        for (let sampleIndex = start; sampleIndex < end; sampleIndex += 1) {
          sumOfSquares += samples[sampleIndex] ** 2;
          sampleCount += 1;
        }
      }

      return sampleCount > 0 ? Math.sqrt(sumOfSquares / sampleCount) : 0;
    });
    const peak = Math.max(...amplitudes, Number.EPSILON);

    return amplitudes.map((amplitude) =>
      Math.round(
        CallDetail.WAVEFORM_MIN_HEIGHT
        + (amplitude / peak) * (CallDetail.WAVEFORM_MAX_HEIGHT - CallDetail.WAVEFORM_MIN_HEIGHT),
      ),
    );
  }

  private getUploadedCallFromNavigationState(): CallRecord | undefined {
    const state = history.state as { call?: unknown };
    const maybeCall = state.call;

    if (!maybeCall || typeof maybeCall !== 'object') {
      return undefined;
    }

    const record = maybeCall as Partial<CallRecord>;
    if (!record.id || !record.customerId || !record.agentId) {
      return undefined;
    }

    return maybeCall as CallRecord;
  }
}
