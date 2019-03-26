import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsWidgetComponent } from './flights-widget.component';

describe('FlightsWidgetComponent', () => {
  let component: FlightsWidgetComponent;
  let fixture: ComponentFixture<FlightsWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightsWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
