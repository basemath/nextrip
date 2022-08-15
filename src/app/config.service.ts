import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

export interface ApplicationConfig {
  nexTripApiBaseUrl: string;
  pollIntervalInMs: number;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private http: HttpClient) {}

  private config: ApplicationConfig = {
    nexTripApiBaseUrl: '',
    pollIntervalInMs: -1,
  };

  public getConfig(): ApplicationConfig {
    return this.config;
  }

  private async load(): Promise<ApplicationConfig> {
    const data = await lastValueFrom(this.http.get('./assets/config.json'));
    return data as ApplicationConfig;
  }

  public async init(): Promise<void> {
    this.config = await this.load();
  }
}
