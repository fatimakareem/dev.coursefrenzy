import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// import {TeachesByTeacherComponent} from "./teaches-by-teacher.component";
import {LoaderModule} from "../../loader/loader.module";

const teaches_by_teacher_eRoutes: Routes = [
  // { path: '', component: TeachesByTeacherComponent }
];


@NgModule({
  declarations: [

  ],

  imports: [
    CommonModule,
    RouterModule.forChild(teaches_by_teacher_eRoutes),
    LoaderModule
  ],

  providers: [],
  exports: [],
  entryComponents: [
  ]

})

export class TeachesByTeacherModule {

}

