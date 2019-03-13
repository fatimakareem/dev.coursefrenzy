import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedsubCatCoursesComponent } from './nestedsub-cat-courses.component';

describe('NestedsubCatCoursesComponent', () => {
  let component: NestedsubCatCoursesComponent;
  let fixture: ComponentFixture<NestedsubCatCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NestedsubCatCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedsubCatCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
