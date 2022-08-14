import { Component } from '@angular/core';
import { Stop, Trip } from './nex-trip.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Minneapolis Metro';

  loadedTrip: Trip | undefined = undefined;
  selectedStop: Stop | undefined = undefined;

  onStopSelected(stop: Stop) {
    this.selectedStop = stop;
  }

  onTripLoaded(trip: Trip) {
    this.loadedTrip = trip;
  }
}
