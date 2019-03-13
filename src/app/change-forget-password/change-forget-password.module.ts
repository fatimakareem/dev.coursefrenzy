import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatCheckboxModule, MatDialogModule, MatIconModule, MatInputModule} from '@angular/material';
import {LoaderModule} from "../loader/loader.module";
import {ChangeForgetPasswordComponent} from "./change-forget-password.component";
import {HttpClientModule} from "@angular/common/http";
// import {RecaptchaModule} from "ng-recaptcha";

const changeForgetPasswordRoutes: Routes = [
  { path: '', component: ChangeForgetPasswordComponent },
];


@NgModule({
  declarations: [
    ChangeForgetPasswordComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    HttpClientModule,
    MatCheckboxModule,
    // RecaptchaModule.forRoot(),
    RouterModule.forChild(changeForgetPasswordRoutes),
    LoaderModule
  ],

  providers: [],
  exports: []
})

export class ChangeForgetPasswordModule  {

}

