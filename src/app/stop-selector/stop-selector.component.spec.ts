import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { StopSelectorComponent } from './stop-selector.component';

describe('StopSelectorComponent', () => {
  let component: StopSelectorComponent;
  let fixture: ComponentFixture<StopSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StopSelectorComponent],
      imports: [RouterModule.forRoot([]), HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(StopSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
