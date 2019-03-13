import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SignUpComponent} from "./signup.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatIconModule,MatCardModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {HttpClientModule} from "@angular/common/http";
import {AuthServiceConfig} from "angular4-social-login";
import {provideConfig} from "../app.module";
import {AuthGuard} from "../auth-guard/auth-guard.service";
// import {RecaptchaModule} from "ng-recaptcha";
import {LoaderModule} from "../loader/loader.module";
// import { BlackgeeksRecaptchaModule } from 'recaptcha-blackgeeks';
import { RecapchaModule } from '../recapcha/recapcha.module';

const signupRoutes: Routes = [
  { path: '', component: SignUpComponent }
];

@NgModule({
  declarations: [
    SignUpComponent,
  ],

  imports: [
    FormsModule,RecapchaModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,MatCardModule,
    MatInputModule,
    // AuthGuard,
    HttpClientModule,
    // RecaptchaModule.forRoot(),
    RouterModule.forChild(signupRoutes),
    LoaderModule,
    // BlackgeeksRecaptchaModule
  ],

  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    AuthGuard
  ],
  exports: [],entryComponents: [
    
  ],

})

export class SignupModule {

}

