import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  Direction,
  NexTripService,
  Place,
  Route,
  Stop,
  Trip,
} from '../nex-trip.service';
import { ErrorService } from '../error.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

export interface TripCriteria {
  routeId: string;
  directionId: string;
  stopId: string;
}

@Component({
  selector: 'app-route-selector',
  templateUrl: './route-selector.component.html',
  styleUrls: ['./route-selector.component.scss'],
})
export class RouteSelectorComponent implements OnInit {
  routes: Route[] = [];
  selectedRouteId: string = '';

  directions: Direction[] = [];
  selectedDirectionId: string = '';

  // TODO: explain wording mismatch here
  places: Place[] = [];
  selectedPlaceCode: string = '';

  @Output() criteriaChanged = new EventEmitter<TripCriteria>();
  @Output() stopSelected = new EventEmitter<Stop>();
  @Output() tripLoaded = new EventEmitter<Trip>();

  constructor(
    private nexTripService: NexTripService,
    private errorService: ErrorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  get selectedStop() {
    return this.places.find(
      (place) => place.placeCode === this.selectedPlaceCode
    );
  }

  ngOnInit(): void {
    this.nexTripService
      .getRoutes()
      .then((routes) => {
        this.routes = routes;
      })
      .catch((err) => this.errorService.handle(err));

    console.log(this.route.snapshot);

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.selectedRouteId = params.get('routeId') || '';
      this.selectedDirectionId = '';
      this.selectedPlaceCode = '';
      this.directions = [];
      this.places = [];

      if (!this.selectedRouteId) {
        return;
      }

      this.loadDirections()
        .then(() => {
          this.selectedDirectionId = params.get('directionId') || '';
          return this.selectedDirectionId ? this.loadStops() : undefined;
        })
        .then(() => {
          this.selectedPlaceCode = params.get('placeCode') || '';
          return this.selectedPlaceCode ? this.loadTrip() : undefined;
        });
    });
  }

  private loadDirections(): Promise<void> {
    this.selectedDirectionId = '';
    this.selectedPlaceCode = '';
    this.directions = [];
    this.places = [];

    return this.nexTripService
      .getDirections(this.selectedRouteId)
      .then((directions) => (this.directions = directions))
      .catch((err) => this.errorService.handle(err))
      .then();
  }

  onRouteSelectionChange(): void {
    this.router.navigate(['byRoute', this.selectedRouteId]);
  }

  private loadStops(): Promise<void> {
    this.selectedPlaceCode = '';
    this.places = [];

    return this.nexTripService
      .getPlaces(this.selectedRouteId, this.selectedDirectionId)
      .then((stops) => (this.places = stops))
      .catch((err) => this.errorService.handle(err))
      .then();
  }

  onDirectionSelectionChange(): void {
    this.router.navigate([
      'byRoute',
      this.selectedRouteId,
      this.selectedDirectionId,
    ]);
  }

  private loadTrip(): Promise<void> {
    return this.nexTripService
      .getTrip(
        this.selectedRouteId,
        this.selectedDirectionId,
        this.selectedPlaceCode
      )
      .then((trip) => this.tripLoaded.emit(trip))
      .catch((err) => this.errorService.handle(err));
  }

  onStopSelectionChange(): void {
    this.router.navigate([
      'byRoute',
      this.selectedRouteId,
      this.selectedDirectionId,
      this.selectedPlaceCode,
    ]);
  }
}
