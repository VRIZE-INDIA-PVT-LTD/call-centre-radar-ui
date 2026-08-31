import { inject, Injectable } from '@angular/core';
import { Agent, AgentMetric, CallRecord, Customer, TrendingIssue } from '../models/call-radar.models';
import { CallRadarService } from './call-radar-service';

@Injectable({
  providedIn: 'root',
})
export class CallRadarStore {
  private readonly callRadarService = inject(CallRadarService);
  private readonly dataset = this.callRadarService.getSnapshot();

  readonly agents = this.dataset.agents;
  readonly customers = this.dataset.customers;
  readonly calls = this.dataset.calls;

  getAgentById(agentId: string): Agent | undefined {
    return this.agents.find((agent) => agent.id === agentId);
  }

  getCustomerById(customerId: string): Customer | undefined {
    return this.customers.find((customer) => customer.id === customerId);
  }

  getCallById(callId: string): CallRecord | undefined {
    return this.calls.find((call) => call.id === callId);
  }

  getCallsByCustomer(customerId: string): CallRecord[] {
    return this.calls
      .filter((call) => call.customerId === customerId)
      .sort((a, b) => Date.parse(b.startedAt) - Date.parse(a.startedAt));
  }

  getCallsByAgent(agentId: string): CallRecord[] {
    return this.calls
      .filter((call) => call.agentId === agentId)
      .sort((a, b) => Date.parse(b.startedAt) - Date.parse(a.startedAt));
  }

  getAttentionQueue(): CallRecord[] {
    return [...this.calls].sort((a, b) => b.needsAttention - a.needsAttention);
  }

  getTrendingIssues(): TrendingIssue[] {
    const issueMap = new Map<string, number>();

    for (const call of this.calls) {
      issueMap.set(call.issueTag, (issueMap.get(call.issueTag) ?? 0) + 1);
    }

    return Array.from(issueMap.entries())
      .map(([issueTag, count]) => ({
        issueTag,
        count,
        deltaVsLastWeek: Math.max(1, Math.floor((count / this.calls.length) * 7)),
      }))
      .sort((a, b) => b.count - a.count);
  }

  getAgentMetrics(): AgentMetric[] {
    const byAgent = new Map<string, CallRecord[]>();

    for (const call of this.calls) {
      const existing = byAgent.get(call.agentId) ?? [];
      existing.push(call);
      byAgent.set(call.agentId, existing);
    }

    return Array.from(byAgent.entries()).map(([agentId, calls]) => {
      const callVolume = calls.length;
      const avgHandleTimeSec = Math.round(
        calls.reduce((sum, call) => sum + call.durationSec, 0) / callVolume,
      );
      const resolvedPct = Math.round(
        (calls.filter((call) => call.resolved).length / callVolume) * 100,
      );
      const escalations = calls.filter((call) => call.needsAttention >= 70).length;
      const agentName = this.getAgentById(agentId)?.name ?? calls[0]?.agentName ?? 'Unknown Agent';

      return {
        agentId,
        agentName,
        callVolume,
        avgHandleTimeSec,
        resolvedPct,
        escalations,
      };
    });
  }
}
