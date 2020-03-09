import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartManagementComponent } from './start-management.component';

describe('StartManagementComponent', () => {
  let component: StartManagementComponent;
  let fixture: ComponentFixture<StartManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
