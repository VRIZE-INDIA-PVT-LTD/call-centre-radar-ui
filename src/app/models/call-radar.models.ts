export type Speaker = 'agent' | 'customer';

export interface TranscriptTurn {
  speaker: Speaker;
  startSec: number;
  endSec: number;
  text: string;
}

export interface Evidence {
  timestampSec: number;
  quote: string;
  rationale: string;
}

export interface MoodPoint {
  minute: number;
  mood: number;
  label: string;
}

export interface CallAnalysisEvidence {
  intent: Evidence;
  moodShift: Evidence;
  outcome: Evidence;
  attention: Evidence;
}

export interface CallResponseEvent {
  submitTimeMs: number;
}

export interface CallSurveyResponse {
  submitTimeMs: number;
  data: Record<string, string>;
}

export interface CallPartyMetadata {
  arrivalTimeMs: number;
  hangupTimeMs: number;
  metadata: Record<string, string>;
  responses: CallResponseEvent[];
  speakerId: number;
  surveyResponse: CallSurveyResponse;
}

export interface CallQualityLabels {
  lhvbScript: number;
  callerMos: number;
  agentMos: number;
}

export interface CallMetadata {
  agent: CallPartyMetadata;
  caller: CallPartyMetadata;
  endTimeMs: number;
  sid: string;
  startTimeMs: number;
  labels: CallQualityLabels;
  session: string;
}

export interface CallRecord {
  id: string;
  customerId: string;
  customerName: string;
  agentId: string;
  agentName: string;
  startedAt: string;
  durationSec: number;
  audioUrl: string;
  summary: string;
  intent: string;
  resolved: boolean;
  needsAttention: number;
  moodShiftSec: number;
  moodBefore: string;
  moodAfter: string;
  issueTag: string;
  transcript: TranscriptTurn[];
  moodTimeline: MoodPoint[];
  evidence: CallAnalysisEvidence;
  metadata: CallMetadata;
}

export interface Customer {
  id: string;
  name: string;
}

export interface Agent {
  id: string;
  name: string;
}

export interface TrendingIssue {
  issueTag: string;
  count: number;
  deltaVsLastWeek: number;
}

export interface AgentMetric {
  agentId: string;
  agentName: string;
  callVolume: number;
  avgHandleTimeSec: number;
  resolvedPct: number;
  escalations: number;
}
