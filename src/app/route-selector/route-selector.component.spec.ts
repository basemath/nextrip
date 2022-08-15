import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import {
  Direction,
  NexTripService,
  Place,
  Route,
  Trip,
} from '../nex-trip.service';
import { RouteSelectorComponent } from './route-selector.component';
import { RouterModule } from '@angular/router';

describe('RouteSelectorComponent', () => {
  let component: RouteSelectorComponent;
  let fixture: ComponentFixture<RouteSelectorComponent>;

  let nexTripService: NexTripService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RouteSelectorComponent],
      imports: [RouterModule.forRoot([])],
    }).compileComponents();

    nexTripService = TestBed.inject(NexTripService);

    spyOn(nexTripService, 'getRoutes').and.returnValue(
      Promise.resolve(getMockRoutes())
    );
    spyOn(nexTripService, 'getDirections').and.returnValue(
      Promise.resolve(getMockDirections())
    );
    spyOn(nexTripService, 'getPlaces').and.returnValue(
      Promise.resolve(getMockPlaces())
    );
    spyOn(nexTripService, 'getTrip').and.returnValue(
      Promise.resolve(getMockTrip())
    );

    fixture = TestBed.createComponent(RouteSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the available routes from the NexTrip API', () => {
    expect(nexTripService.getRoutes).toHaveBeenCalled();

    fixture.detectChanges();

    const select = getRouteSelect(fixture);

    expect(select.options.length).toEqual(4);
    expect(select.options[0].text).toEqual('Select a route');
    expect(select.options[1].text).toEqual('METRO Blue Line');
    expect(select.options[2].text).toEqual('Airport Shuttle');
    expect(select.options[3].text).toEqual('Route 3');
  });

  it('should not have a specific route selected by default', () => {
    const select = getRouteSelect(fixture);
    fixture.detectChanges();
    expect(select.value).toEqual('');
    expect(select.options[select.selectedIndex].text).toEqual('Select a route');
  });

  it(
    'should not display the direction selector until a route is selected',
    <any>fakeAsync((): void => {
      let directionSelect = getDirectionSelect(fixture);
      fixture.detectChanges();
      expect(directionSelect).toBeFalsy();

      selectFirstRoute(fixture);

      directionSelect = getDirectionSelect(fixture);

      expect(nexTripService.getDirections).toHaveBeenCalled();
      expect(directionSelect).toBeTruthy();
    })
  );

  it(
    'should display the available directions for a given route from the NexTrip API',
    <any>fakeAsync((): void => {
      selectFirstRoute(fixture);
      const directionSelect = getDirectionSelect(fixture);

      expect(directionSelect.options.length).toEqual(3);
      expect(directionSelect.options[0].text).toEqual('Select a direction');
      expect(directionSelect.options[1].text).toEqual('Northbound');
      expect(directionSelect.options[2].text).toEqual('Southbound');
    })
  );

  it(
    'should not have a specific direction selected by default',
    <any>fakeAsync((): void => {
      selectFirstRoute(fixture);
      const select = getDirectionSelect(fixture);
      expect(select.value).toEqual('');
      expect(select.options[select.selectedIndex].text).toEqual(
        'Select a direction'
      );
    })
  );

  it(
    'should not display the stop selector until a direction is selected',
    <any>fakeAsync((): void => {
      selectFirstRoute(fixture);

      let stopSelect = getStopSelect(fixture);
      tick();
      fixture.detectChanges();
      expect(stopSelect).toBeFalsy();

      selectFirstDirection(fixture);

      stopSelect = getStopSelect(fixture);
      expect(stopSelect).toBeTruthy();
    })
  );

  it(
    'should diplay the available stops for a given route and direction from the NexTrip API',
    <any>fakeAsync((): void => {
      selectFirstRoute(fixture);
      selectFirstDirection(fixture);
      const select = getStopSelect(fixture);
      expect(select.options.length).toEqual(4);
      expect(select.options[0].text).toEqual('Select a stop');
      expect(select.options[1].text).toEqual(
        'MSP Airport Terminal 2 - Humphrey Station'
      );
      expect(select.options[2].text).toEqual(
        'MSP Airport Terminal 1 - Lindbergh Station'
      );
      expect(select.options[3].text).toEqual('Fort Snelling Station');
    })
  );

  it(
    'should not have a specific stop selected by default',
    <any>fakeAsync((): void => {
      selectFirstRoute(fixture);
      selectFirstDirection(fixture);
      const select = getStopSelect(fixture);
      expect(select.value).toEqual('');
      expect(select.options[select.selectedIndex].text).toEqual(
        'Select a stop'
      );
    })
  );
});

function selectFirstStop(fixture: ComponentFixture<any>): void {
  const stopSelect = getStopSelect(fixture);
  fixture.detectChanges();
  stopSelect.value = stopSelect.options[1].value;
  stopSelect.dispatchEvent(new Event('change'));
  tick();
  fixture.detectChanges();
}

function selectFirstDirection(fixture: ComponentFixture<any>): void {
  const directionSelect = getDirectionSelect(fixture);
  fixture.detectChanges();
  directionSelect.value = directionSelect.options[1].value;
  directionSelect.dispatchEvent(new Event('change'));
  tick();
  fixture.detectChanges();
}

function selectFirstRoute(fixture: ComponentFixture<any>): void {
  const routeSelect = getRouteSelect(fixture);
  fixture.detectChanges();
  routeSelect.value = routeSelect.options[1].value;
  routeSelect.dispatchEvent(new Event('change'));
  tick();
  fixture.detectChanges();
}

function getDirectionSelect(
  fixture: ComponentFixture<RouteSelectorComponent>
): HTMLSelectElement {
  return fixture.nativeElement.querySelector(
    '#direction-select'
  ) as HTMLSelectElement;
}

function getRouteSelect(
  fixture: ComponentFixture<RouteSelectorComponent>
): HTMLSelectElement {
  return fixture.nativeElement.querySelector(
    '#route-select'
  ) as HTMLSelectElement;
}

function getStopSelect(
  fixture: ComponentFixture<RouteSelectorComponent>
): HTMLSelectElement {
  return fixture.nativeElement.querySelector(
    '#stop-select'
  ) as HTMLSelectElement;
}

function getMockRoutes(): Route[] {
  return [
    {
      routeId: '901',
      routeLabel: 'METRO Blue Line',
    },
    {
      routeId: '906',
      routeLabel: 'Airport Shuttle',
    },
    {
      routeId: '3',
      routeLabel: 'Route 3',
    },
  ];
}

function getMockDirections(): Direction[] {
  return [
    {
      directionId: 0,
      directionName: 'Northbound',
    },
    {
      directionId: 1,
      directionName: 'Southbound',
    },
  ];
}

function getMockPlaces(): Place[] {
  return [
    {
      placeCode: 'HHTE',
      placeDescription: 'MSP Airport Terminal 2 - Humphrey Station',
    },
    {
      placeCode: 'LIND',
      placeDescription: 'MSP Airport Terminal 1 - Lindbergh Station',
    },
    {
      placeCode: 'FTSN',
      placeDescription: 'Fort Snelling Station',
    },
  ];
}

function getMockTrip(): Trip {
  return {
    stops: [
      {
        stopId: 51435,
        latitude: 44.874119,
        longitude: -93.224068,
        stopDescription: 'Terminal 2 Humphrey Station',
      },
    ],
    alerts: [],
    departures: [
      {
        actual: false,
        tripId: '21229056-JUN22-RAIL-Sunday-02',
        stopId: 51435,
        departureText: '6:40',
        departureTime: 1660520400,
        description: 'to Mpls-Target Field',
        gate: null,
        routeId: '901',
        routeShortName: 'Blue',
        directionId: 0,
        directionText: 'NB',
        terminal: null,
        scheduleRelationship: null,
      },
      {
        actual: false,
        tripId: '21229057-JUN22-RAIL-Sunday-02',
        stopId: 51435,
        departureText: '6:56',
        departureTime: 1660521360,
        description: 'to Mpls-Target Field',
        gate: null,
        routeId: '901',
        routeShortName: 'Blue',
        directionId: 0,
        directionText: 'NB',
        terminal: null,
        scheduleRelationship: null,
      },
      {
        actual: false,
        tripId: '21229149-JUN22-RAIL-Sunday-02',
        stopId: 51435,
        departureText: '7:11',
        departureTime: 1660522260,
        description: 'to Mpls-Target Field',
        gate: null,
        routeId: '901',
        routeShortName: 'Blue',
        directionId: 0,
        directionText: 'NB',
        terminal: null,
        scheduleRelationship: null,
      },
    ],
  };
}
