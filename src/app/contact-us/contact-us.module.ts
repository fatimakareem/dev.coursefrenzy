import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ContactUsComponent} from "./contact-us.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatIconModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import { AgmCoreModule } from '@agm/core';
// import {RecaptchaModule} from "ng-recaptcha";
import {LoaderModule} from "../loader/loader.module";

const contactRoutes: Routes = [
  { path: '', component: ContactUsComponent },
];


@NgModule({
  declarations: [
    ContactUsComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    AgmCoreModule,
    // RecaptchaModule.forRoot(),
    RouterModule.forChild(contactRoutes),
    LoaderModule
  ],

  providers: [],
  exports: []

})

export class ContactUsModule {

}

