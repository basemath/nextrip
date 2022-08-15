import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ErrorService } from '../error.service';
import { NexTripService, Trip } from '../nex-trip.service';

@Component({
  selector: 'app-stop-selector',
  templateUrl: './stop-selector.component.html',
  styleUrls: ['./stop-selector.component.scss'],
})
export class StopSelectorComponent implements OnInit {
  stopNumberForm: FormGroup = new FormGroup({
    stopNumber: new FormControl(this.inputStopNumber, [
      Validators.required,
      Validators.pattern('^\\d+$'),
    ]),
  });

  loadedTrip: Trip | undefined;

  constructor(
    private nexTripService: NexTripService,
    private errorService: ErrorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const stopNumber = params.get('stopId') || '';

      if (stopNumber) {
        this.inputStopNumber?.setValue(stopNumber);

        this.loadedTrip = undefined;
        this.nexTripService
          .getTripByStopId(stopNumber)
          .then((trip) => {
            this.loadedTrip = trip;
          })
          .catch((err) => this.errorService.handle(err));
      }
    });
  }

  get inputStopNumber() {
    return this.stopNumberForm?.get('stopNumber');
  }

  submitStopNumber(): void {
    if (this.inputStopNumber?.valid && this.inputStopNumber?.value) {
      this.router.navigate(['byStopNumber', this.inputStopNumber.value]);
    }
  }
}
