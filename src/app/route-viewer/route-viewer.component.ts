import { Component, Input, OnInit } from '@angular/core';
import { Stop, Trip } from '../nex-trip.service';

@Component({
  selector: 'app-route-viewer',
  templateUrl: './route-viewer.component.html',
  styleUrls: ['./route-viewer.component.scss']
})
export class RouteViewerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() trip: Trip | undefined = undefined;
  @Input() selectedStop: Stop | undefined = undefined;

}
