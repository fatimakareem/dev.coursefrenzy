import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatInputModule} from '@angular/material';
import { MatDialogModule } from '@angular/material';
import {RecentlyViewedCoursesComponent} from "./recently-viewed-courses.component";
import {LoaderModule} from "../../loader/loader.module";
import {RatingModule} from "ng2-rating";
import { SlickModule } from 'ngx-slick';

const recentlyViewedCoursesRoutes: Routes = [{ path: '', component: RecentlyViewedCoursesComponent }
];


@NgModule({
  declarations: [
    RecentlyViewedCoursesComponent
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
  exports: [RecentlyViewedCoursesComponent],
  entryComponents: [
  ]

})

export class RecentlyViewedCoursesModule {

}

