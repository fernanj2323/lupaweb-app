import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolConfigListComponent } from './rol-config-list.component';

describe('RolConfigListComponent', () => {
  let component: RolConfigListComponent;
  let fixture: ComponentFixture<RolConfigListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolConfigListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolConfigListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
