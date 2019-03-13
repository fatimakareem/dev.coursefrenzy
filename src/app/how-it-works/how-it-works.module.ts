import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {HowItWorksComponent} from "./how-it-works.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatIconModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {HttpClientModule} from "@angular/common/http";
import {AuthServiceConfig} from "angular4-social-login";
import {provideConfig} from "../app.module";
import {AuthGuard} from "../auth-guard/auth-guard.service";
// import {ReCaptchaModule} from "angular2-recaptcha";
import {LoaderModule} from "../loader/loader.module";

const signupRoutes: Routes = [
  { path: '', component: HowItWorksComponent }
];

@NgModule({
  declarations: [
    HowItWorksComponent
  ],

  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatInputModule,
    // AuthGuard,
    HttpClientModule,
    // ReCaptchaModule,
    RouterModule.forChild(signupRoutes),
    LoaderModule
  ],

  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    AuthGuard
  ],
  exports: []

})

export class HowItWorksModule {

}

