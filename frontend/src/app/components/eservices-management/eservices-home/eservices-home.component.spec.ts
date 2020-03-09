import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EservicesHomeComponent } from './eservices-home.component';

describe('EservicesHomeComponent', () => {
  let component: EservicesHomeComponent;
  let fixture: ComponentFixture<EservicesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EservicesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EservicesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
