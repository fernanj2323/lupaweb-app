import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolConfigEditComponent } from './rol-config-edit.component';

describe('RolConfigEditComponent', () => {
  let component: RolConfigEditComponent;
  let fixture: ComponentFixture<RolConfigEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolConfigEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolConfigEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
