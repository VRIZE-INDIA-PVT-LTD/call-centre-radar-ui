import { Component, inject } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CallRecord } from '../../models/call-radar.models';
import { CallRadarStore } from '../../services/call-radar.store';

@Component({
  imports: [RouterLink, NgClass, DatePipe],
  selector: 'app-call-detail',
  styleUrl: './call-detail.scss',
  templateUrl: './call-detail.html',
})
export class CallDetail {
  private static readonly MANAGER_ATTENTION_THRESHOLD = 65;

  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(CallRadarStore);

  readonly callId = this.route.snapshot.paramMap.get('callId') ?? '';
  readonly uploadedCall = this.getUploadedCallFromNavigationState();
  readonly call = this.uploadedCall ?? this.store.getCallById(this.callId);
  readonly waveformBars = [
    8, 18, 44, 30, 12, 58, 36, 48, 24, 40, 64, 46, 22, 16, 28, 42, 34, 20,
  ];
  readonly customerPriorCalls = this.call
    ? this.store.getCallsByCustomer(this.call.customerId).filter((row) => row.id !== this.call?.id).length
    : 0;
  readonly customerSatisfaction = this.call
    ? Math.min(5, Math.max(2.3, Number(((this.call.needsAttention / 25) * -0.2 + 4.6).toFixed(1))))
    : 0;
  readonly managerAttentionNeeded = this.call
    ? this.call.needsAttention >= CallDetail.MANAGER_ATTENTION_THRESHOLD
    : false;

  formatClock(seconds: number): string {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const sec = (seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  }

  getMoodColor(mood: number): string {
    const normalized = Math.max(0, Math.min(100, mood));
    const hue = (normalized / 100) * 120;
    return `hsl(${hue}, 84%, 46%)`;
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
