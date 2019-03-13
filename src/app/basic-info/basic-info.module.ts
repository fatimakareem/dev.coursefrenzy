import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {BasicInfoComponent} from "./basic-info.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatInputModule} from '@angular/material';
import {MatCardModule} from '@angular/material';
import {LoaderModule} from "../loader/loader.module";

const basicInfoRoutes: Routes = [
  {path: '', component: BasicInfoComponent}
];


@NgModule({
  declarations: [
    BasicInfoComponent,
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    RouterModule.forChild(basicInfoRoutes),
    LoaderModule
  ],

  providers: [],
  exports: []

})

export class BasicInfoModule {

}

