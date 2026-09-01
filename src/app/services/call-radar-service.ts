import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, firstValueFrom, map, Observable, of, tap } from 'rxjs';
import { AGENTS, CALLS, CUSTOMERS } from '../data/mock-call-radar.data';
import { Agent, CallRecord, Customer } from '../models/call-radar.models';

export interface CallRadarDataResponse {
	agents: Agent[];
	customers: Customer[];
	calls: CallRecord[];
}

export interface UploadCallResponse {
	call: CallRecord;
}

@Injectable({
	providedIn: 'root',
})
export class CallRadarService {
	private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = 'http://127.0.0.1:8000/api';
  private readonly endpoint = 'http://127.0.0.1:8000/api/bundle';
  private readonly uploadEndpoint = 'http://127.0.0.1:8000/api/process';

	private snapshot: CallRadarDataResponse = {
		agents: AGENTS,
		customers: CUSTOMERS,
		calls: CALLS,
	};

	load(): Promise<void> {
		return firstValueFrom(
			this.http.get<CallRadarDataResponse>(this.endpoint).pipe(
				tap((response) => {
					this.snapshot = response;
				}),
				catchError(() => {
					return of(this.snapshot);
				}),
			),
		).then(() => undefined);
	}

	getSnapshot(): CallRadarDataResponse {
		return this.snapshot;
	}

  getCallAudioUrl(callId: string): string {
    return `${this.apiBaseUrl}/calls/${encodeURIComponent(callId)}/audio`;
  }

  getCallAudioData(callId: string): Observable<ArrayBuffer> {
    return this.http.get(this.getCallAudioUrl(callId), { responseType: 'arraybuffer' });
  }

	uploadCallPackage(audioFile: File, metadata: Record<string, unknown>): Observable<CallRecord> {
		const formData = new FormData();
		formData.append('audio', audioFile, audioFile.name);
		formData.append('metadata', JSON.stringify(metadata));

		return this.http.post<UploadCallResponse | CallRecord>(this.uploadEndpoint, formData).pipe(
			map((response) => ('call' in response ? response.call : response)),
		);
	}
}
