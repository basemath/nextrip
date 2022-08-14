import { TestBed } from '@angular/core/testing';

import { NexTripService } from './nex-trip.service';

describe('NexTripService', () => {
  let service: NexTripService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NexTripService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

function getMockRoutes() {
  return [{
      "route_id": "901",
      "agency_id": 0,
      "route_label": "METRO Blue Line"
  }, {
      "route_id": "991",
      "agency_id": 0,
      "route_label": "Blue Line Bus"
  }, {
      "route_id": "921",
      "agency_id": 0,
      "route_label": "METRO A Line"
  }, {
      "route_id": "923",
      "agency_id": 0,
      "route_label": "METRO C Line"
  }, {
      "route_id": "906",
      "agency_id": 10,
      "route_label": "Airport Shuttle"
  }, {
      "route_id": "2",
      "agency_id": 0,
      "route_label": "Route 2"
  }, {
      "route_id": "3",
      "agency_id": 0,
      "route_label": "Route 3"
  }];
}

function getMockDirections() {
  return [{
      "direction_id": 0,
      "direction_name": "Northbound"
  }, {
      "direction_id": 1,
      "direction_name": "Southbound"
  }];
}

function getMockStops() {
  return [{
      "place_code": "HHTE",
      "description": "MSP Airport Terminal 2 - Humphrey Station"
  }, {
      "place_code": "LIND",
      "description": "MSP Airport Terminal 1 - Lindbergh Station"
  }, {
      "place_code": "FTSN",
      "description": "Fort Snelling Station"
  }, {
      "place_code": "VAMC",
      "description": "VA Medical Center Station"
  }, {
      "place_code": "50HI",
      "description": "50th St/ Minnehaha Park Station"
  }, {
      "place_code": "46HI",
      "description": "46th St Station"
  }, {
      "place_code": "38HI",
      "description": "38th St Station"
  }, {
      "place_code": "LAHI",
      "description": "Lake St/ Midtown Station"
  }, {
      "place_code": "FRHI",
      "description": "Franklin Ave Station"
  }, {
      "place_code": "CDRV",
      "description": "Cedar-Riverside Station"
  }, {
      "place_code": "USBA",
      "description": "U.S. Bank Stadium Station"
  }, {
      "place_code": "GOVT",
      "description": "Government Plaza Station"
  }, {
      "place_code": "5SNI",
      "description": "Nicollet Mall Station"
  }, {
      "place_code": "WARE",
      "description": "Warehouse District/ Hennepin Ave Station"
  }, {
      "place_code": "TF1",
      "description": "Target Field Station Platform 1"
  }, {
      "place_code": "TF2",
      "description": "Target Field Station Platform 2"
  }];
}