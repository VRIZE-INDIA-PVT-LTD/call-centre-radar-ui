import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CallRadarStore } from '../../services/call-radar.store';

@Component({
  imports: [RouterLink],
  selector: 'app-agent-performance',
  styleUrl: './agent-performance.scss',
  templateUrl: './agent-performance.html',
})
export class AgentPerformance {
  private readonly store = inject(CallRadarStore);

  readonly metrics = this.store
    .getAgentMetrics()
    .map((metric) => ({
      ...metric,
      score: Math.round(metric.resolvedPct - metric.escalations * 4 + metric.callVolume),
    }))
    .sort((a, b) => b.score - a.score);

  readonly bestPerformer = this.metrics[0];
  readonly averageResolution = Math.round(
    this.metrics.reduce((sum, row) => sum + row.resolvedPct, 0) / this.metrics.length,
  );
  readonly totalEscalations = this.metrics.reduce((sum, row) => sum + row.escalations, 0);

  formatSeconds(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const rest = seconds % 60;
    return `${minutes}m ${rest}s`;
  }

  loadBand(callVolume: number): 'steady' | 'heavy' {
    return callVolume >= 2 ? 'heavy' : 'steady';
  }
}
