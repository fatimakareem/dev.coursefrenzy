import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {PayoutSettingsComponent} from "./payout-settings.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatInputModule} from '@angular/material';
import {MatStepperModule} from '@angular/material';
import {MatButtonModule} from "@angular/material";
import {MatCardModule} from "@angular/material";
import {MatCheckboxModule} from "@angular/material";
import {LoaderModule} from "../loader/loader.module";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


const singleCourseRoutes: Routes = [
  { path: '', component: PayoutSettingsComponent }
];


@NgModule({
  declarations: [
    PayoutSettingsComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatStepperModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    RouterModule.forChild(singleCourseRoutes),
    LoaderModule,
    MatSlideToggleModule
  ],

  providers: [],
  exports: []

})

export class PayoutSettingsModule {

}

