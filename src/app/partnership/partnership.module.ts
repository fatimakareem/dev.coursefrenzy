import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {PartnershipComponent} from "./partnership.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatIconModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
// import {RecaptchaModule} from "ng-recaptcha";
import {LoaderModule} from "../loader/loader.module";


const partnershipRoutes: Routes = [
  { path: '', component: PartnershipComponent }
];


@NgModule({
  declarations: [
    PartnershipComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    // RecaptchaModule.forRoot(),
    RouterModule.forChild(partnershipRoutes),
    LoaderModule
  ],

  providers: [],
  exports: []

})

export class PartnershipModule {

}

