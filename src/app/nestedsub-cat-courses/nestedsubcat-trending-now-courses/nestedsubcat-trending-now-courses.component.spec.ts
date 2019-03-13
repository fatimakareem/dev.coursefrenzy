import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedsubcatTrendingNowCoursesComponent } from './nestedsubcat-trending-now-courses.component';

describe('NestedsubcatTrendingNowCoursesComponent', () => {
  let component: NestedsubcatTrendingNowCoursesComponent;
  let fixture: ComponentFixture<NestedsubcatTrendingNowCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NestedsubcatTrendingNowCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedsubcatTrendingNowCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
