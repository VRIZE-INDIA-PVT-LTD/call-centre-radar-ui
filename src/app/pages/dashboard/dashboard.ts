import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CallRadarStore } from '../../services/call-radar.store';

@Component({
  imports: [RouterLink],
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private readonly store = inject(CallRadarStore);

  readonly calls = this.store.calls;
  readonly attentionTop = this.store.getAttentionQueue().slice(0, 3);
  readonly trendingIssues = this.store.getTrendingIssues().slice(0, 3);
  readonly recentCalls = [...this.calls]
    .sort((a, b) => Date.parse(b.startedAt) - Date.parse(a.startedAt))
    .slice(0, 4);

  readonly activeCalls = this.calls.length;
  readonly avgHandleSec = Math.round(
    this.calls.reduce((sum, call) => sum + call.durationSec, 0) / this.calls.length,
  );
  readonly resolvedRate = Math.round(
    (this.calls.filter((call) => call.resolved).length / this.calls.length) * 100,
  );
  readonly netSentiment = this.calls.reduce((total, call) => {
    const start = call.moodTimeline[0]?.mood ?? 0;
    const end = call.moodTimeline[call.moodTimeline.length - 1]?.mood ?? 0;
    return total + (end - start);
  }, 0);
  readonly liveUpdateRate = Math.max(2, Math.round(this.calls.length * 1.6));

  formatSeconds(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const rest = seconds % 60;
    return `${minutes}m ${rest}s`;
  }

  getAttentionTone(score: number): 'critical' | 'elevated' | 'watch' {
    if (score >= 85) {
      return 'critical';
    }

    if (score >= 65) {
      return 'elevated';
    }

    return 'watch';
  }
}
