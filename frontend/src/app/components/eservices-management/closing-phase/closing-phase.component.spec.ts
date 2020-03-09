import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosingPhaseComponent } from './closing-phase.component';

describe('ClosingPhaseComponent', () => {
  let component: ClosingPhaseComponent;
  let fixture: ComponentFixture<ClosingPhaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosingPhaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosingPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
