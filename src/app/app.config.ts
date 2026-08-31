import { ApplicationConfig, APP_INITIALIZER, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { CallRadarService } from './services/call-radar-service';

export function initializeCallRadarData(callRadarService: CallRadarService): () => Promise<void> {
  return () => callRadarService.load();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [CallRadarService],
      useFactory: initializeCallRadarData,
    },
  ]
};
