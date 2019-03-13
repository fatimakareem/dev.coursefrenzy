import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedsubcatTopRatedCoursesComponent } from './nestedsubcat-top-rated-courses.component';

describe('NestedsubcatTopRatedCoursesComponent', () => {
  let component: NestedsubcatTopRatedCoursesComponent;
  let fixture: ComponentFixture<NestedsubcatTopRatedCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NestedsubcatTopRatedCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedsubcatTopRatedCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
