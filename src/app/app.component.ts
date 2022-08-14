import { Component, ViewChild } from '@angular/core';
import { Stop, Trip } from './nex-trip.service';
import { RouteSelectorComponent } from './route-selector/route-selector.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Minneapolis Metro';

  loadedTrip: Trip | undefined = undefined;
  selectedStop: Stop | undefined = undefined;

  @ViewChild('routeSelector') routeSelector!: RouteSelectorComponent;

  onCriteriaChanged() {
    this.selectedStop = undefined;
    this.loadedTrip = undefined;
  }

  onStopSelected(stop: Stop) {
    this.selectedStop = stop;
  }

  onTripLoaded(trip: Trip) {
    this.loadedTrip = trip;
  }
}
