import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticalReqComponent } from './critical-req.component';

describe('CriticalReqComponent', () => {
  let component: CriticalReqComponent;
  let fixture: ComponentFixture<CriticalReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriticalReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriticalReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
