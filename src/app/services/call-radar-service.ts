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
	private readonly endpoint = '/api/call-radar';
	private readonly uploadEndpoint = '/api/call-radar/upload';

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

	uploadCallPackage(audioFile: File, metadata: Record<string, unknown>): Observable<CallRecord> {
		const formData = new FormData();
		formData.append('audio', audioFile, audioFile.name);
		formData.append('metadata', JSON.stringify(metadata));

		return this.http.post<UploadCallResponse | CallRecord>(this.uploadEndpoint, formData).pipe(
			map((response) => ('call' in response ? response.call : response)),
		);
	}
}
