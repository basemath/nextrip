import { Injectable } from '@angular/core';
import { Api, NexTripResult } from './nexTripApi';
import { ConfigService } from './config.service';
import { ErrorService } from './error.service';

export interface Route {
  routeId: string;
  routeLabel: string;
}

export interface Direction {
  directionId: number;
  directionName: string;
}

export interface Place {
  placeCode: string;
  placeDescription: string;
}

export interface Stop {
  stopId: number;
  stopDescription: string | null;

  /** @format double */
  latitude?: number;

  /** @format double */
  longitude?: number;
}

export interface AlertMessage {
  stopClosed: boolean;
  alertText: string | null;
}

export interface Departure {
  actual: boolean;
  tripId: string | null;

  /** @format int32 */
  stopId: number;
  departureText: string | null;

  /** @format int64 */
  departureTime: number;
  description: string | null;
  gate: string | null;
  routeId: string | null;
  routeShortName: string | null;

  /** @format int32 */
  directionId: number;
  directionText: string | null;
  terminal: string | null;
  scheduleRelationship: string | null;
}

export interface Trip {
  stops?: Stop[] | null;
  alerts?: AlertMessage[] | null;
  departures?: Departure[] | null;
}

@Injectable({
  providedIn: 'root',
})
export class NexTripService {
  private api: Api<unknown>;

  constructor(
    configService: ConfigService,
    private errorService: ErrorService
  ) {
    const config = configService.getConfig();
    this.api = new Api({
      baseUrl: config.nexTripApiBaseUrl,
    });
  }

  // TODO handle error response object
  public async getRoutes(): Promise<Route[]> {
    const apiRoutes = (await this.api?.nextripv2.routesList()).data;

    return apiRoutes.map((apiRoute) => {
      return this.translateApiResponse(apiRoute, {
        route_id: 'routeId',
        route_label: 'routeLabel',
      }) as Route;
    });
  }

  public async getDirections(routeId: string): Promise<Direction[]> {
    const apiDirections = (await this.api.nextripv2.directionsDetail(routeId))
      .data;

    return apiDirections.map((apiDirection) => {
      return this.translateApiResponse(apiDirection, {
        direction_id: 'directionId',
        direction_name: 'directionName',
      }) as Direction;
    });
  }

  public async getPlaces(
    routeId: string,
    directionId: string
  ): Promise<Place[]> {
    // TODO explain
    const directionAsNumber = Number.parseInt(directionId);

    const apiPlaces = (
      await this.api.nextripv2.stopsDetail(routeId, directionAsNumber)
    ).data;

    return apiPlaces.map((apiPlace) => {
      return this.translateApiResponse(apiPlace, {
        place_code: 'placeCode',
        description: 'placeDescription',
      }) as Place;
    });
  }

  public async getTrip(
    routeId: string,
    directionId: string,
    stopId: string
  ): Promise<Trip> {
    // TODO explain
    const directionAsNumber = Number.parseInt(directionId);

    const apiTrip = (
      await this.api.nextripv2.nextripv2Detail2(
        routeId,
        directionAsNumber,
        stopId
      )
    ).data;

    return this.tripObjectFromApiResponse(apiTrip);
  }

  public async getTripByStopId(stopId: string): Promise<Trip> {
    // TODO explain
    const stopIdAsNumber = Number.parseInt(stopId);

    const apiTrip = (await this.api.nextripv2.nextripv2Detail(stopIdAsNumber))
      .data;

    return this.tripObjectFromApiResponse(apiTrip);
  }

  private tripObjectFromApiResponse(apiTrip: NexTripResult): Trip {
    return {
      stops: apiTrip.stops?.map((apiStop) => {
        return this.translateApiResponse(apiStop, {
          // place_code: "stopId",
          stop_id: 'stopId',
          description: 'stopDescription',
        }) as Stop;
      }),
      alerts: apiTrip.alerts?.map((apiAlert) => {
        return this.translateApiResponse(apiAlert, {
          stop_closed: 'stopClosed',
          alert_text: 'alertText',
        }) as AlertMessage;
      }),
      departures: apiTrip.departures?.map((apiDeparture) => {
        return this.translateApiResponse(apiDeparture, {
          trip_id: 'tripId',
          stop_id: 'stopId',
          departure_text: 'departureText',
          departure_time: 'departureTime',
          description: 'description',
          route_id: 'routeId',
          route_short_name: 'routeShortName',
          direction_id: 'directionId',
          direction_text: 'directionText',
        }) as Departure;
      }),
    };
  }

  /**
   * TODO: explain
   * @param apiObject
   * @param propertyTranslations
   * @returns
   */
  private translateApiResponse(
    apiObject: any,
    propertyTranslations: { [apiProperty: string]: string }
  ): { [k: string]: any } {
    const appObject: { [k: string]: any } = {};

    for (const [apiProperty, appProperty] of Object.entries(
      propertyTranslations
    )) {
      if (!(apiProperty in apiObject)) {
        throw new Error(
          `Expected to find property "${apiProperty}" in API response object ${JSON.stringify(
            apiObject
          )}`
        );
      }

      const apiVal = apiObject[apiProperty];
      if (apiVal === undefined || apiVal === null) {
        throw new Error(
          `Expected property "${apiProperty}" in API response to be defined, but was ${apiVal}`
        );
      }

      appObject[appProperty] = apiObject[apiProperty];
    }

    return appObject;
  }
}
