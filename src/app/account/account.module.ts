import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import { AccountComponent } from "./account.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatInputModule} from '@angular/material';
import {MatCardModule,MatIconModule} from '@angular/material';
import {LoaderModule} from "../loader/loader.module";

const accountRoutes: Routes = [
  {path: '', component: AccountComponent}
];


@NgModule({
  declarations: [
    AccountComponent,
  ],

  imports: [
    CommonModule,MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    RouterModule.forChild(accountRoutes),
    LoaderModule
  ],

  providers: [],
  exports: []

})

export class AccountModule {

}

