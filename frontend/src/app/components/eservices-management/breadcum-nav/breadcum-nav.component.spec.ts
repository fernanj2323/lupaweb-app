import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcumNavComponent } from './breadcum-nav.component';

describe('BreadcumNavComponent', () => {
  let component: BreadcumNavComponent;
  let fixture: ComponentFixture<BreadcumNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadcumNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcumNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
