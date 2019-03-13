import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubCategoriesComponent} from "./sub-categories/sub-categories.component";
import {CategoryCoursesComponent} from "./category-courses.component";
import {CoursesOnBidModule} from "../courses-all/courses-on-bid/courses-on-bid.module";
import {TrendingNowCoursesModule} from "../courses-all/trending-now-courses/trending-now-courses.module";
import {TopRatedCoursesModule} from "../courses-all/top-rated-courses/top-rated-courses.module";
import {CatBidCoursesComponent} from "./cat-bid-courses/cat-bid-courses.component";
import {CatTopRatedCoursesComponent} from "./cat-top-rated-courses/cat-top-rated-courses.component";
import {CatTrendingNowCoursesComponent} from "./cat-trending-now-courses/cat-trending-now-courses.component";
import { SlickModule } from 'ngx-slick';
import {RatingModule} from "ng2-rating";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

const categoryCoursesRoutes: Routes = [
  { path: '', component: CategoryCoursesComponent }
];


@NgModule({
  declarations: [
    CategoryCoursesComponent,
    SubCategoriesComponent,
    CatBidCoursesComponent,
    CatTopRatedCoursesComponent,
    CatTrendingNowCoursesComponent,
  ],

  imports: [
    CommonModule,SlickModule,RatingModule,FormsModule,ReactiveFormsModule,
    RouterModule.forChild(categoryCoursesRoutes),
    // CoursesOnBidModule,
    // TrendingNowCoursesModule,
    // TopRatedCoursesModule
  ],
  providers: [],
  exports: [SlickModule,RatingModule],
  entryComponents: [
  ]

})

export class CategoryCoursesModule {

}

