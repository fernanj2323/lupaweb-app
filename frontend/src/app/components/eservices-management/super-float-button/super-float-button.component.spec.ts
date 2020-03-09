import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperFloatButtonComponent } from './super-float-button.component';

describe('SuperFloatButtonComponent', () => {
  let component: SuperFloatButtonComponent;
  let fixture: ComponentFixture<SuperFloatButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperFloatButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperFloatButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
