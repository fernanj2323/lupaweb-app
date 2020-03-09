import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Phase2ObjectivesComponent } from './phase2-objectives.component';

describe('Phase2ObjectivesComponent', () => {
  let component: Phase2ObjectivesComponent;
  let fixture: ComponentFixture<Phase2ObjectivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Phase2ObjectivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Phase2ObjectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
