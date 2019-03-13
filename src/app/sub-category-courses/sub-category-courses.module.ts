import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoursesOnBidModule} from '../courses-all/courses-on-bid/courses-on-bid.module';
import {TrendingNowCoursesModule} from '../courses-all/trending-now-courses/trending-now-courses.module';
import {TopRatedCoursesModule} from '../courses-all/top-rated-courses/top-rated-courses.module';
import {SubCategoryCoursesComponent} from './sub-category-courses.component';
import {SubcatTrendingNowCoursesComponent} from './subcat-trending-now-courses/subcat-trending-now-courses.component';
import {SubcatTopRatedCoursesComponent} from './subcat-top-rated-courses/subcat-top-rated-courses.component';
import {SubcatBidCoursesComponent} from './subcat-bid-courses/subcat-bid-courses.component';
import { SlickModule } from 'ngx-slick';
import {RatingModule} from "ng2-rating";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

const subcategoryCoursesRoutes: Routes = [
  { path: '', component: SubCategoryCoursesComponent }
];


@NgModule({
  declarations: [
    SubCategoryCoursesComponent,
    SubcatBidCoursesComponent,
    SubcatTrendingNowCoursesComponent,
    SubcatTopRatedCoursesComponent

  ],

  imports: [
    CommonModule,SlickModule,RatingModule,FormsModule, ReactiveFormsModule,
    RouterModule.forChild(subcategoryCoursesRoutes),
    // CoursesOnBidModule,
    // TrendingNowCoursesModule,
    // TopRatedCoursesModule
  ],

  providers: [],
  exports: [],
  entryComponents: [
  ]

})

export class SubCategoryCoursesModule {

}

