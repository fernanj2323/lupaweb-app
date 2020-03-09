import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobBriefComponent } from './job-brief.component';

describe('JobBriefComponent', () => {
  let component: JobBriefComponent;
  let fixture: ComponentFixture<JobBriefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobBriefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobBriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
