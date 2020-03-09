import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPhase4Component } from './work-phase4.component';

describe('WorkPhase4Component', () => {
  let component: WorkPhase4Component;
  let fixture: ComponentFixture<WorkPhase4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkPhase4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPhase4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
