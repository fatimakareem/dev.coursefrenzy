import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedsubcatBidCourseComponent } from './nestedsubcat-bid-course.component';

describe('NestedsubcatBidCourseComponent', () => {
  let component: NestedsubcatBidCourseComponent;
  let fixture: ComponentFixture<NestedsubcatBidCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NestedsubcatBidCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedsubcatBidCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
