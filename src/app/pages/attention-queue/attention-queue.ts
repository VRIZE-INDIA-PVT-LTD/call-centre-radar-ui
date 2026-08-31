import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CallRadarStore } from '../../services/call-radar.store';

@Component({
  imports: [RouterLink],
  selector: 'app-attention-queue',
  styleUrl: './attention-queue.scss',
  templateUrl: './attention-queue.html',
})
export class AttentionQueue {
  private readonly store = inject(CallRadarStore);

  readonly queue = this.store.getAttentionQueue();
  readonly highPriority = this.queue.filter((call) => call.needsAttention >= 80).length;
  readonly escalations = this.queue.filter((call) => !call.resolved).length;

  scoreBand(score: number): 'critical' | 'elevated' | 'watch' {
    if (score >= 85) {
      return 'critical';
    }

    if (score >= 65) {
      return 'elevated';
    }

    return 'watch';
  }
}
