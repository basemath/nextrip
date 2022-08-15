import { Component, OnInit, ViewChild } from '@angular/core';
import { Trip } from '../nex-trip.service';
import { RouteSelectorComponent } from '../route-selector/route-selector.component';

@Component({
  selector: 'app-nex-trip-page',
  templateUrl: './nex-trip-page.component.html',
  styleUrls: ['./nex-trip-page.component.scss'],
})
export class NexTripPageComponent {
  loadedTrip: Trip | undefined = undefined;

  @ViewChild('routeSelector') routeSelector!: RouteSelectorComponent;

  onTripLoaded(trip: Trip) {
    this.loadedTrip = trip;
  }
}
