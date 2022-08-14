import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ErrorService } from '../error.service';
import { Direction, NexTripService, Route, Stop, Trip } from '../nex-trip.service';

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
    console.log('route changed');

    this.selectedDirectionId = '';
    this.selectedStopId = '';

    console.log(this.selectedRouteId);

    this.nexTripService.getDirections(this.selectedRouteId)
      .then(directions => this.directions = directions)
      .catch(err => this.errorService.handle(err));
  }

  onDirectionSelectionChange(): void {
    this.selectedStopId = '';

    this.nexTripService.getStops(this.selectedRouteId, this.selectedDirectionId)
      .then(stops => this.stops = stops)
      .catch(err => this.errorService.handle(err));
  }

  onStopSelectionChange(): void {
    console.log('stop selected');
    this.stopSelected.emit(this.selectedStop);

    this.nexTripService.getTrip(this.selectedRouteId, this.selectedDirectionId, this.selectedStopId)
      .then(trip => {
        console.log('trip loaded, emitting');
        this.tripLoaded.emit(trip)
      })
      .catch(err => this.errorService.handle(err));
  }

}
