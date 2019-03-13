import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatInputModule} from '@angular/material';
import { MatDialogModule } from '@angular/material';
import {TopRatedCoursesComponent} from "./top-rated-courses.component";
import {LoaderModule} from "../../loader/loader.module";
import {RatingModule} from "ng2-rating";
import {SlickModule} from 'ngx-slick';

const recentlyViewedCoursesRoutes: Routes = [ ];

@NgModule({
  declarations: [
    TopRatedCoursesComponent
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
  exports: [TopRatedCoursesComponent],
  entryComponents: [
  ]

})

export class TopRatedCoursesModule {

}

