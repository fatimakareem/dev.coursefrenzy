import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatIconModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {IntellectualPropertyComponent} from "./intellectual-property.component";
import {LoaderModule} from "../loader/loader.module";

const intellectualPropertyRoutes: Routes = [
  { path: '', component: IntellectualPropertyComponent }
];


@NgModule({
  declarations: [
    IntellectualPropertyComponent
  ],


  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    RouterModule.forChild(intellectualPropertyRoutes),
    LoaderModule
  ],

  providers: [],
  exports: []

})

export class IntellectualPropertyModule {

}

