import { Agent, CallRecord, Customer } from '../models/call-radar.models';

export const CUSTOMERS: Customer[] = [
  { id: '1', name: 'Maya Thompson' },
  { id: '2', name: 'Arjun Mehta' },
  { id: '3', name: 'Elena Ruiz' },
  { id: '4', name: 'Noah Carter' },
];

export const AGENTS: Agent[] = [
  { id: '1', name: 'Rina Das' },
  { id: '2', name: 'Liam Fox' },
  { id: '3', name: 'Priya Jain' },
];

export const CALLS: CallRecord[] = [
  {
    id: '0de8d60b29d24dfd',
    customerId: '1',
    customerName: 'Maya Thompson',
    agentId: '1',
    agentName: 'Rina Das',
    startedAt: '2026-08-21T09:14:00Z',
    durationSec: 514,
    audioUrl: 'assets/audio/call-1001.mp3',
    summary: 'Customer disputed duplicate card charge; temporary credit issued, investigation opened, and follow-up promised within two business days.',
    intent: 'Dispute a duplicate debit card transaction and request immediate credit.',
    resolved: false,
    needsAttention: 88,
    moodShiftSec: 132,
    moodBefore: 'frustrated',
    moodAfter: 'angry',
    issueTag: 'duplicate-charge-dispute',
    transcript: [
      {
        speaker: 'customer',
        startSec: 9,
        endSec: 24,
        text: 'I have the same coffee shop charge twice and nobody fixed it after my last call.',
      },
      {
        speaker: 'agent',
        startSec: 25,
        endSec: 43,
        text: 'I understand. I can open a charge dispute and request a temporary credit for you now.',
      },
      {
        speaker: 'customer',
        startSec: 132,
        endSec: 149,
        text: 'You said that yesterday too, this is exactly why I am losing trust in your bank.',
      },
      {
        speaker: 'agent',
        startSec: 410,
        endSec: 438,
        text: 'I have submitted the case and you should hear from back office in two business days.',
      },
    ],
    moodTimeline: [
      { minute: 0, mood: 44, label: 'frustrated' },
      { minute: 1, mood: 41, label: 'frustrated' },
      { minute: 2, mood: 29, label: 'angry' },
      { minute: 4, mood: 38, label: 'tense' },
      { minute: 7, mood: 47, label: 'cautiously calm' },
    ],
    evidence: {
      intent: {
        timestampSec: 12,
        quote: 'I have the same coffee shop charge twice',
        rationale: 'Explicitly asks to reverse a duplicate transaction.',
      },
      moodShift: {
        timestampSec: 132,
        quote: 'this is exactly why I am losing trust in your bank',
        rationale: 'Language escalates from frustration to anger and distrust.',
      },
      outcome: {
        timestampSec: 426,
        quote: 'you should hear from back office in two business days',
        rationale: 'Action was initiated but outcome still pending.',
      },
      attention: {
        timestampSec: 132,
        quote: 'losing trust in your bank',
        rationale: 'High reputational risk and unresolved financial dispute.',
      },
    },
    metadata: {
      agent: {
        arrivalTimeMs: 1798209226000,
        hangupTimeMs: 1798209743000,
        metadata: {
          agent_name: 'Rina Das',
        },
        responses: [{ submitTimeMs: 1798209721000 }],
        speakerId: 17,
        surveyResponse: {
          submitTimeMs: 1798209756000,
          data: {
            ease_of_connection: '8',
            partner_rating: '8',
          },
        },
      },
      caller: {
        arrivalTimeMs: 1798209218000,
        hangupTimeMs: 1798209761000,
        metadata: {
          'first and last name': 'Maya Thompson',
        },
        responses: [{ submitTimeMs: 1798209737000 }],
        speakerId: 29,
        surveyResponse: {
          submitTimeMs: 1798209764000,
          data: {},
        },
      },
      endTimeMs: 1798209740000,
      sid: '0de8d60b29d24dfd',
      startTimeMs: 1798209229000,
      labels: {
        lhvbScript: 4.1,
        callerMos: 3.2,
        agentMos: 3.5,
      },
      session: 'Retail Support - East',
    },
  },
  {
    id: '2f91bc7a43d84e6c',
    customerId: '2',
    customerName: 'Arjun Mehta',
    agentId: '2',
    agentName: 'Liam Fox',
    startedAt: '2026-08-21T11:02:00Z',
    durationSec: 362,
    audioUrl: 'assets/audio/call-1002.mp3',
    summary: 'Customer needed travel card unlock. Agent verified identity, lifted location block, and customer confirmed card now works.',
    intent: 'Enable overseas transactions on card during travel.',
    resolved: true,
    needsAttention: 18,
    moodShiftSec: 210,
    moodBefore: 'anxious',
    moodAfter: 'relieved',
    issueTag: 'travel-card-block',
    transcript: [
      {
        speaker: 'customer',
        startSec: 17,
        endSec: 34,
        text: 'My card is blocked in Singapore and I need it for hotel check-in tonight.',
      },
      {
        speaker: 'agent',
        startSec: 92,
        endSec: 110,
        text: 'Thanks for confirming. I am removing the travel restriction now.',
      },
      {
        speaker: 'customer',
        startSec: 211,
        endSec: 224,
        text: 'Great, the payment just went through on my second try.',
      },
    ],
    moodTimeline: [
      { minute: 0, mood: 48, label: 'anxious' },
      { minute: 2, mood: 52, label: 'focused' },
      { minute: 3, mood: 71, label: 'relieved' },
      { minute: 5, mood: 79, label: 'satisfied' },
    ],
    evidence: {
      intent: {
        timestampSec: 20,
        quote: 'My card is blocked in Singapore',
        rationale: 'Direct request to unblock card for travel.',
      },
      moodShift: {
        timestampSec: 211,
        quote: 'the payment just went through',
        rationale: 'Emotional tone transitions from stress to relief after success.',
      },
      outcome: {
        timestampSec: 211,
        quote: 'payment just went through',
        rationale: 'Customer confirms issue was fixed during call.',
      },
      attention: {
        timestampSec: 17,
        quote: 'need it for hotel check-in tonight',
        rationale: 'Time-sensitive but fully resolved with clear confirmation.',
      },
    },
    metadata: {
      agent: {
        arrivalTimeMs: 1798215942000,
        hangupTimeMs: 1798216307000,
        metadata: {
          agent_name: 'Liam Fox',
        },
        responses: [{ submitTimeMs: 1798216289000 }],
        speakerId: 31,
        surveyResponse: {
          submitTimeMs: 1798216312000,
          data: {
            ease_of_connection: '10',
            partner_rating: '9',
          },
        },
      },
      caller: {
        arrivalTimeMs: 1798215931000,
        hangupTimeMs: 1798216329000,
        metadata: {
          'first and last name': 'Arjun Mehta',
        },
        responses: [{ submitTimeMs: 1798216298000 }],
        speakerId: 42,
        surveyResponse: {
          submitTimeMs: 1798216331000,
          data: {
            nps: '9',
          },
        },
      },
      endTimeMs: 1798216305000,
      sid: '2f91bc7a43d84e6c',
      startTimeMs: 1798215943000,
      labels: {
        lhvbScript: 4.7,
        callerMos: 4.1,
        agentMos: 4.3,
      },
      session: 'Travel Card Desk',
    },
  },
  {
    id: '9ac4e12d77b34a0f',
    customerId: '3',
    customerName: 'Elena Ruiz',
    agentId: '1',
    agentName: 'Rina Das',
    startedAt: '2026-08-22T08:05:00Z',
    durationSec: 641,
    audioUrl: 'assets/audio/call-1003.mp3',
    summary: 'Mortgage payment posted late fee after autopay date confusion; waiver requested but not approved during call.',
    intent: 'Waive unfair late fee linked to autopay mismatch.',
    resolved: false,
    needsAttention: 81,
    moodShiftSec: 268,
    moodBefore: 'calm',
    moodAfter: 'upset',
    issueTag: 'late-fee-waiver',
    transcript: [
      {
        speaker: 'customer',
        startSec: 31,
        endSec: 53,
        text: 'Autopay was set for the fifteenth, but I still got charged a late fee.',
      },
      {
        speaker: 'agent',
        startSec: 245,
        endSec: 267,
        text: 'I can submit a waiver request, but approval is handled by another team.',
      },
      {
        speaker: 'customer',
        startSec: 268,
        endSec: 286,
        text: 'So I have to wait again and keep paying interest for your system error?',
      },
    ],
    moodTimeline: [
      { minute: 0, mood: 57, label: 'calm' },
      { minute: 2, mood: 55, label: 'concerned' },
      { minute: 4, mood: 37, label: 'upset' },
      { minute: 7, mood: 34, label: 'frustrated' },
      { minute: 10, mood: 36, label: 'frustrated' },
    ],
    evidence: {
      intent: {
        timestampSec: 34,
        quote: 'I still got charged a late fee',
        rationale: 'Requests fee removal due to autopay discrepancy.',
      },
      moodShift: {
        timestampSec: 268,
        quote: 'I have to wait again',
        rationale: 'Customer reacts strongly after learning no immediate waiver.',
      },
      outcome: {
        timestampSec: 250,
        quote: 'approval is handled by another team',
        rationale: 'No final resolution reached during call.',
      },
      attention: {
        timestampSec: 268,
        quote: 'your system error',
        rationale: 'Potential systemic billing issue and repeat complaint risk.',
      },
    },
    metadata: {
      agent: {
        arrivalTimeMs: 1798272292000,
        hangupTimeMs: 1798272936000,
        metadata: {
          agent_name: 'Rina Das',
        },
        responses: [{ submitTimeMs: 1798272891000 }],
        speakerId: 17,
        surveyResponse: {
          submitTimeMs: 1798272941000,
          data: {
            ease_of_connection: '7',
            partner_rating: '7',
          },
        },
      },
      caller: {
        arrivalTimeMs: 1798272283000,
        hangupTimeMs: 1798272961000,
        metadata: {
          'first and last name': 'Elena Ruiz',
        },
        responses: [{ submitTimeMs: 1798272919000 }],
        speakerId: 29,
        surveyResponse: {
          submitTimeMs: 1798272966000,
          data: {
            nps: '4',
          },
        },
      },
      endTimeMs: 1798272933000,
      sid: '9ac4e12d77b34a0f',
      startTimeMs: 1798272292000,
      labels: {
        lhvbScript: 3.6,
        callerMos: 2.9,
        agentMos: 3.1,
      },
      session: 'Mortgage Billing',
    },
  },
  {
    id: '71be5f3c08d14a92',
    customerId: '4',
    customerName: 'Noah Carter',
    agentId: '3',
    agentName: 'Priya Jain',
    startedAt: '2026-08-22T10:19:00Z',
    durationSec: 455,
    audioUrl: 'assets/audio/call-1004.mp3',
    summary: 'Customer requested joint-account card replacement after theft; expedited replacement arranged and temporary freeze confirmed.',
    intent: 'Replace stolen card and secure account immediately.',
    resolved: true,
    needsAttention: 43,
    moodShiftSec: 176,
    moodBefore: 'worried',
    moodAfter: 'reassured',
    issueTag: 'card-replacement-theft',
    transcript: [
      {
        speaker: 'customer',
        startSec: 12,
        endSec: 28,
        text: 'My wallet was stolen and I need both cards frozen right now.',
      },
      {
        speaker: 'agent',
        startSec: 176,
        endSec: 196,
        text: 'Both cards are frozen and I can ship a replacement for tomorrow delivery.',
      },
      {
        speaker: 'customer',
        startSec: 330,
        endSec: 342,
        text: 'Thank you, that helps a lot. I feel much better now.',
      },
    ],
    moodTimeline: [
      { minute: 0, mood: 46, label: 'worried' },
      { minute: 2, mood: 63, label: 'reassured' },
      { minute: 5, mood: 75, label: 'relieved' },
      { minute: 7, mood: 81, label: 'grateful' },
    ],
    evidence: {
      intent: {
        timestampSec: 15,
        quote: 'I need both cards frozen right now',
        rationale: 'Urgent fraud-prevention request.',
      },
      moodShift: {
        timestampSec: 176,
        quote: 'Both cards are frozen',
        rationale: 'Anxiety decreases immediately after security action.',
      },
      outcome: {
        timestampSec: 176,
        quote: 'ship a replacement for tomorrow delivery',
        rationale: 'Customer objective satisfied with clear next step.',
      },
      attention: {
        timestampSec: 12,
        quote: 'wallet was stolen',
        rationale: 'Security-sensitive event but successfully managed.',
      },
    },
    metadata: {
      agent: {
        arrivalTimeMs: 1798280260000,
        hangupTimeMs: 1798280715000,
        metadata: {
          agent_name: 'Priya Jain',
        },
        responses: [{ submitTimeMs: 1798280679000 }],
        speakerId: 22,
        surveyResponse: {
          submitTimeMs: 1798280719000,
          data: {
            ease_of_connection: '9',
            partner_rating: '9',
          },
        },
      },
      caller: {
        arrivalTimeMs: 1798280252000,
        hangupTimeMs: 1798280738000,
        metadata: {
          'first and last name': 'Noah Carter',
        },
        responses: [{ submitTimeMs: 1798280698000 }],
        speakerId: 35,
        surveyResponse: {
          submitTimeMs: 1798280741000,
          data: {
            nps: '10',
          },
        },
      },
      endTimeMs: 1798280712000,
      sid: '71be5f3c08d14a92',
      startTimeMs: 1798280257000,
      labels: {
        lhvbScript: 4.8,
        callerMos: 4.4,
        agentMos: 4.5,
      },
      session: 'Fraud Response',
    },
  },
  {
    id: 'c3d0a89f61e24b7d',
    customerId: '1',
    customerName: 'Maya Thompson',
    agentId: '2',
    agentName: 'Liam Fox',
    startedAt: '2026-08-19T14:40:00Z',
    durationSec: 301,
    audioUrl: 'assets/audio/call-1005.mp3',
    summary: 'Customer asked about duplicate charges from pending transactions; agent advised wait period, no dispute opened.',
    intent: 'Understand pending duplicate card charges.',
    resolved: false,
    needsAttention: 62,
    moodShiftSec: 190,
    moodBefore: 'neutral',
    moodAfter: 'frustrated',
    issueTag: 'duplicate-charge-dispute',
    transcript: [
      {
        speaker: 'customer',
        startSec: 39,
        endSec: 57,
        text: 'I see two pending amounts for one purchase, can you remove one now?',
      },
      {
        speaker: 'agent',
        startSec: 163,
        endSec: 188,
        text: 'Pending holds usually clear in three to five days, so we cannot dispute yet.',
      },
      {
        speaker: 'customer',
        startSec: 190,
        endSec: 205,
        text: 'That is what I heard last time, and it keeps happening.',
      },
    ],
    moodTimeline: [
      { minute: 0, mood: 58, label: 'neutral' },
      { minute: 2, mood: 56, label: 'concerned' },
      { minute: 3, mood: 41, label: 'frustrated' },
      { minute: 5, mood: 39, label: 'frustrated' },
    ],
    evidence: {
      intent: {
        timestampSec: 42,
        quote: 'can you remove one now?',
        rationale: 'Wants immediate correction of duplicate pending amount.',
      },
      moodShift: {
        timestampSec: 190,
        quote: 'That is what I heard last time',
        rationale: 'Signals repeat friction and rising dissatisfaction.',
      },
      outcome: {
        timestampSec: 177,
        quote: 'cannot dispute yet',
        rationale: 'No corrective action completed in this call.',
      },
      attention: {
        timestampSec: 190,
        quote: 'it keeps happening',
        rationale: 'Repeat complaint indicates possible trend and churn risk.',
      },
    },
    metadata: {
      agent: {
        arrivalTimeMs: 1798046373000,
        hangupTimeMs: 1798046681000,
        metadata: {
          agent_name: 'Liam Fox',
        },
        responses: [{ submitTimeMs: 1798046659000 }],
        speakerId: 31,
        surveyResponse: {
          submitTimeMs: 1798046685000,
          data: {
            ease_of_connection: '8',
            partner_rating: '7',
          },
        },
      },
      caller: {
        arrivalTimeMs: 1798046366000,
        hangupTimeMs: 1798046705000,
        metadata: {
          'first and last name': 'Maya Thompson',
        },
        responses: [{ submitTimeMs: 1798046668000 }],
        speakerId: 29,
        surveyResponse: {
          submitTimeMs: 1798046709000,
          data: {
            nps: '5',
          },
        },
      },
      endTimeMs: 1798046679000,
      sid: 'c3d0a89f61e24b7d',
      startTimeMs: 1798046378000,
      labels: {
        lhvbScript: 3.8,
        callerMos: 3.0,
        agentMos: 3.4,
      },
      session: 'Card Dispute Follow-up',
    },
  },
];
