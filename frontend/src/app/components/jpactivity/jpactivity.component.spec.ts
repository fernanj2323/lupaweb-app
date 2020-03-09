import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JpactivityComponent } from './jpactivity.component';

describe('JpactivityComponent', () => {
  let component: JpactivityComponent;
  let fixture: ComponentFixture<JpactivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JpactivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JpactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
