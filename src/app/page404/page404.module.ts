import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Page404Component} from "./page404.component";


const page404Routes: Routes = [
  { path: '', component: Page404Component }
];


@NgModule({
  declarations: [
    Page404Component,
  ],

  imports: [
    CommonModule,
    RouterModule.forChild(page404Routes),
  ],

  providers: [],
  exports: []

})

export class Page404Module {

}

