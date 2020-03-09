import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsManagementComponent } from './details-management.component';

describe('DetailsManagementComponent', () => {
  let component: DetailsManagementComponent;
  let fixture: ComponentFixture<DetailsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
