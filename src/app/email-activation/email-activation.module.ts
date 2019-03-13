import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {EmailActivationComponent} from "./email-activation.component";
import {LoaderModule} from "../loader/loader.module";


const topRatedCoursesRoutes: Routes = [
  {path: '', component: EmailActivationComponent}
];


@NgModule({
  declarations: [
    EmailActivationComponent
  ],

  imports: [
    CommonModule,
    RouterModule.forChild(topRatedCoursesRoutes),
    LoaderModule
  ],

  providers: [],
  exports: [EmailActivationComponent],
  entryComponents: [
  ]

})

export class EmailActivationModule {

}

