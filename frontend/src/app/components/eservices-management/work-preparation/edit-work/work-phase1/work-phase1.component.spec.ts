import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPhase1Component } from './work-phase1.component';

describe('WorkPhase1Component', () => {
  let component: WorkPhase1Component;
  let fixture: ComponentFixture<WorkPhase1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkPhase1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPhase1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
