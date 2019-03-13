import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatInputModule} from '@angular/material';
import { MatDialogModule } from '@angular/material';
import {TopRatedCoursesAllComponent} from "./top-rated-courses-all.component";
import {LoaderModule} from "../../loader/loader.module";

const topRatedCoursesRoutes: Routes = [
  {path: '', component: TopRatedCoursesAllComponent}
];


@NgModule({
  declarations: [
    TopRatedCoursesAllComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
   
    RouterModule.forChild(topRatedCoursesRoutes),
    LoaderModule
  ],

  providers: [],
  exports: [TopRatedCoursesAllComponent],
  entryComponents: [
  ]

})

export class TopRatedCoursesAllModule {

}

