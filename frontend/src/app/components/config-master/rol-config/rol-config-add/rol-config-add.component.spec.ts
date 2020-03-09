import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolConfigAddComponent } from './rol-config-add.component';

describe('RolConfigAddComponent', () => {
  let component: RolConfigAddComponent;
  let fixture: ComponentFixture<RolConfigAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolConfigAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolConfigAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
