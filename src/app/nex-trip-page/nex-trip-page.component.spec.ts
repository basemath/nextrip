import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NexTripPageComponent } from './nex-trip-page.component';

describe('NexTripPageComponent', () => {
  let component: NexTripPageComponent;
  let fixture: ComponentFixture<NexTripPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NexTripPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NexTripPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
