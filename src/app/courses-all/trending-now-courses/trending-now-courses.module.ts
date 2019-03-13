import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatInputModule} from '@angular/material';
import { MatDialogModule } from '@angular/material';
import {TrendingNowCoursesComponent} from "./trending-now-courses.component";
import {LoaderModule} from "../../loader/loader.module";
import {RatingModule} from "ng2-rating";
import {SlickModule} from 'ngx-slick';

const recentlyViewedCoursesRoutes: Routes = [  { path: '', component: TrendingNowCoursesComponent }];


@NgModule({
  declarations: [
    TrendingNowCoursesComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
   
    RouterModule.forChild(recentlyViewedCoursesRoutes),
    LoaderModule,
    RatingModule,
    SlickModule
   
  ],

  providers: [],
  exports: [TrendingNowCoursesComponent],
  entryComponents: [
  ]

})

export class TrendingNowCoursesModule {

}

