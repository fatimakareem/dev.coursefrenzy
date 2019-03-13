import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {BecomeInstructorComponent} from "./become-instructor.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {LoaderModule} from "../loader/loader.module";

const becomeInstructorRoutes: Routes = [
  {path: '', component: BecomeInstructorComponent}
];


@NgModule({
  declarations: [
    BecomeInstructorComponent,
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(becomeInstructorRoutes),
    LoaderModule
  ],

  providers: [],
  exports: []

})

export class BecomeInstructorModule {

}

