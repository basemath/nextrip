import { Injectable } from '@angular/core';

export interface ApplicationConfig {
  nexTripApiBaseUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  public getConfig() {
    return {
      // TODO break it out
      nexTripApiBaseUrl: 'https://svc.metrotransit.org',
    };
  }
}
