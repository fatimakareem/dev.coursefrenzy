import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatInputModule} from '@angular/material';
import {CategoriesComponent} from "./categories.component";
import {LoaderModule} from "../loader/loader.module";

const chatRoutes: Routes = [
  {path: '', component: CategoriesComponent}
];


@NgModule({
  declarations: [
    CategoriesComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterModule.forChild(chatRoutes),
    LoaderModule
  ],

  providers: [
  ],
  exports: [
    CategoriesComponent

  ],
  entryComponents: [
  ]

})

export class CategoriesModule {

}

