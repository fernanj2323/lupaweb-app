import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPhase3Component } from './work-phase3.component';

describe('WorkPhase3Component', () => {
  let component: WorkPhase3Component;
  let fixture: ComponentFixture<WorkPhase3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkPhase3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPhase3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
