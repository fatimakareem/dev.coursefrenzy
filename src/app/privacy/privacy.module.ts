import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {PrivacyComponent} from "./privacy.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatInputModule} from '@angular/material';
import {MatCheckboxModule} from '@angular/material';
import {MatButtonModule, MatCardModule} from "@angular/material";

const privacyRoutes: Routes = [
  { path: '', component: PrivacyComponent }
];


@NgModule({
  declarations: [
    PrivacyComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    RouterModule.forChild(privacyRoutes)
  ],

  providers: [],
  exports: []

})

export class PrivacyModule {

}

