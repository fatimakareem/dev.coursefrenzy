import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TermsComponent} from "./terms.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatIconModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {LoaderModule} from "../loader/loader.module";

const loginRoutes: Routes = [
  { path: '', component: TermsComponent }
];


@NgModule({
  declarations: [
    TermsComponent
  ],


  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    RouterModule.forChild(loginRoutes),
    LoaderModule
  ],

  providers: [],
  exports: []

})

export class TermsModule {

}

