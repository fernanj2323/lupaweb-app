import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPreparationComponent } from './work-preparation.component';

describe('WorkPreparationComponent', () => {
  let component: WorkPreparationComponent;
  let fixture: ComponentFixture<WorkPreparationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkPreparationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPreparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
