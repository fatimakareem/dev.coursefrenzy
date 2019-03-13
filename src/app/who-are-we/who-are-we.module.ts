import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatIconModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {HttpClientModule} from "@angular/common/http";
import {AuthServiceConfig} from "angular4-social-login";
import {provideConfig} from "../app.module";
import {AuthGuard} from "../auth-guard/auth-guard.service";
// import {ReCaptchaModule} from "angular2-recaptcha";
import {WhoAreWeComponent} from "./who-are-we.component";
import {LoaderModule} from "../loader/loader.module";

const whoAreWeRoutes: Routes = [
  { path: '', component: WhoAreWeComponent }
];

@NgModule({
  declarations: [
    WhoAreWeComponent
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
    RouterModule.forChild(whoAreWeRoutes),
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

export class WhoAreWeModule {

}

