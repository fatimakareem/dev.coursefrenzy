import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {PrivacyComponent} from "../privacy/privacy.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatIconModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {PrivacyPolicyComponent} from "./privacy-policy.component";
import {LoaderModule} from "../loader/loader.module";

const privacyRoutes: Routes = [
  { path: '', component: PrivacyPolicyComponent }
];

@NgModule({
  declarations: [
    PrivacyPolicyComponent
  ],

  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatInputModule,
    RouterModule.forChild(privacyRoutes),
    LoaderModule
  ],

  providers: [],
  exports: []

})

export class PrivacyPolicyModule {

}

