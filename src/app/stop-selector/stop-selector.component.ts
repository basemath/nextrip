import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { interval } from 'rxjs';
import { ConfigService } from '../config.service';
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
  errorMessage: string = '';

  constructor(
    private nexTripService: NexTripService,
    private errorService: ErrorService,
    private route: ActivatedRoute,
    private router: Router,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.handleRouteParams();

    const pollIntervalInMs = this.configService.getConfig().pollIntervalInMs;
    interval(pollIntervalInMs).subscribe(() => {
      if (this.stopNumberForm.valid) {
        this.loadTrip();
      }
    });
  }

  private handleRouteParams(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const stopNumber = params.get('stopId') || '';

      if (stopNumber) {
        this.inputStopNumber?.setValue(stopNumber);

        if (this.stopNumberForm.valid) {
          this.loadTrip();
        }
      }
    });
  }

  private loadTrip(): void {
    this.nexTripService
      .getTripByStopId(this.inputStopNumber?.value)
      .then((trip) => {
        this.loadedTrip = trip;
      })
      .catch((err) => {
        if (err.status == 400) {
          this.errorMessage = `"${this.inputStopNumber?.value}" is not a known stop number`;
        } else {
          this.errorService.handle(err);
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
