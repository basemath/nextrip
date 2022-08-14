import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ErrorService } from '../error.service';
import { Direction, NexTripService, Route, Stop, Trip } from '../nex-trip.service';

export interface TripCriteria {
  routeId: string,
  directionId: string,
  stopId: string,
}

@Component({
  selector: 'app-route-selector',
  templateUrl: './route-selector.component.html',
  styleUrls: ['./route-selector.component.scss']
})
export class RouteSelectorComponent implements OnInit {

  routes: Route[] = [];
  selectedRouteId: string = '';

  directions: Direction[] = [];
  selectedDirectionId: string = "";

  stops: Stop[] = [];
  selectedStopId: string = "";

  @Output() criteriaChanged = new EventEmitter<TripCriteria>();
  @Output() stopSelected = new EventEmitter<Stop>();
  @Output() tripLoaded = new EventEmitter<Trip>();

  constructor(
    private nexTripService: NexTripService,
    private errorService: ErrorService,
  ) {
  }

  get selectedStop() {
    return this.stops.find(stop => stop.stopId + '' === this.selectedStopId);
  }

  ngOnInit(): void {
    this.nexTripService.getRoutes()
      .then(routes => this.routes = routes)
      .catch(err => this.errorService.handle(err));
  }

  onRouteSelectionChange(): void {
    this.selectedDirectionId = '';
    this.selectedStopId = '';
    this.directions = [];
    this.stops = [];

    this.nexTripService.getDirections(this.selectedRouteId)
      .then(directions => this.directions = directions)
      .catch(err => this.errorService.handle(err));
  }

  onDirectionSelectionChange(): void {
    this.selectedStopId = '';
    this.stops = [];

    this.nexTripService.getStops(this.selectedRouteId, this.selectedDirectionId)
      .then(stops => this.stops = stops)
      .catch(err => this.errorService.handle(err));
  }

  onStopSelectionChange(): void {
    this.nexTripService.getTrip(this.selectedRouteId, this.selectedDirectionId, this.selectedStopId)
      .then(trip => this.tripLoaded.emit(trip))
      .catch(err => this.errorService.handle(err));
  }
}
