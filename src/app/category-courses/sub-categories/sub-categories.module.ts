import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoaderModule} from "../../loader/loader.module";

const sub_categories_Routes: Routes = [
];


@NgModule({
  declarations: [

  ],

  imports: [
    CommonModule,
    RouterModule.forChild(sub_categories_Routes),
    LoaderModule
  ],

  providers: [],
  exports: [],
  entryComponents: [
  ]

})

export class SubCategoriesModule {

}

