import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {BusinessComponent} from "./business.component";


const businessRoutes: Routes = [
  { path: '', component: BusinessComponent }
];


@NgModule({
  declarations: [
    BusinessComponent
  ],

  imports: [
    CommonModule,
    RouterModule.forChild(businessRoutes),
  ],

  providers: [],
  exports: []

})

export class BusinessModule {

}

