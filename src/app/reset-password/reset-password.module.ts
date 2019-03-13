import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ResetPasswordComponent} from "./reset-password.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule, MatInputModule} from "@angular/material";
import {HttpClientModule} from "@angular/common/http";


const resetpasswordRoutes: Routes = [
  { path: '', component: ResetPasswordComponent }
];


@NgModule({
  declarations: [
    ResetPasswordComponent
  ],

  imports: [
    CommonModule,
    RouterModule.forChild(resetpasswordRoutes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    HttpClientModule,
  ],

  providers: [],
  exports: []

})

export class ResetPasswordModule {

}

