import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ProfileComponent} from "./profile.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatInputModule} from '@angular/material';
import {LoaderModule} from "../loader/loader.module";


const modelRoutes: Routes = [
  { path: '', component: ProfileComponent }
];


@NgModule({
  declarations: [
    ProfileComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterModule.forChild(modelRoutes),
    LoaderModule
  ],

  providers: [],
  exports: []

})

export class ProfileModule {

}

