import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EservicesDashBoardComponent } from './eservices-dash-board.component';

describe('EservicesDashBoardComponent', () => {
  let component: EservicesDashBoardComponent;
  let fixture: ComponentFixture<EservicesDashBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EservicesDashBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EservicesDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
