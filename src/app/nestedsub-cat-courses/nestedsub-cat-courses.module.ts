import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoursesOnBidModule} from '../courses-all/courses-on-bid/courses-on-bid.module';
import {TrendingNowCoursesModule} from '../courses-all/trending-now-courses/trending-now-courses.module';
import {TopRatedCoursesModule} from '../courses-all/top-rated-courses/top-rated-courses.module';
import {NestedsubCatCoursesComponent} from './nestedsub-cat-courses.component';
import {NestedsubcatTrendingNowCoursesComponent} from './nestedsubcat-trending-now-courses/nestedsubcat-trending-now-courses.component';
import {NestedsubcatTopRatedCoursesComponent} from './nestedsubcat-top-rated-courses/nestedsubcat-top-rated-courses.component';
// import {NestedSubcatRecommendedCoursesComponent} from './nestedsubcat-recommended-courses/nestedsubcat-recommended-courses.component';
import {NestedsubcatBidCourseComponent} from './nestedsubcat-bid-course/nestedsubcat-bid-course.component';
import { SlickModule } from 'ngx-slick';
import {RatingModule} from "ng2-rating";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

const nestedsubcategoryCoursesRoutes: Routes = [
  { path: '', component: NestedsubCatCoursesComponent }
];


@NgModule({
  declarations: [
    NestedsubCatCoursesComponent,
    NestedsubcatBidCourseComponent,
    NestedsubcatTrendingNowCoursesComponent,
    NestedsubcatTopRatedCoursesComponent,
    // NestedSubcatRecommendedCoursesComponent

  ],

  imports: [
    CommonModule,SlickModule,RatingModule,FormsModule, ReactiveFormsModule,
    RouterModule.forChild(nestedsubcategoryCoursesRoutes),
    // CoursesOnBidModule,
    // TrendingNowCoursesModule,
    // TopRatedCoursesModule
  ],

  providers: [],
  exports: [],
  entryComponents: [
  ]

})

export class NestedSubCategoryCoursesModule {

}

