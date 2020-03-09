import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IroCTComponent } from './iro-ct.component';

describe('IroCTComponent', () => {
  let component: IroCTComponent;
  let fixture: ComponentFixture<IroCTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IroCTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IroCTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
