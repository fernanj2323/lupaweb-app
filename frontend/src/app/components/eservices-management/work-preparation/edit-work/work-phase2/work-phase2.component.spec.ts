import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPhase2Component } from './work-phase2.component';

describe('WorkPhase2Component', () => {
  let component: WorkPhase2Component;
  let fixture: ComponentFixture<WorkPhase2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkPhase2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPhase2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
