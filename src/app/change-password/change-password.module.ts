import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ChangePasswordComponent} from "./change-password.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatInputModule,MatCardModule} from '@angular/material';
import {LoaderModule} from "../loader/loader.module";
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


const ChangePasswordRoutes: Routes = [
  { path: '', component: ChangePasswordComponent }
];


@NgModule({
  declarations: [
    ChangePasswordComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    RouterModule.forChild(ChangePasswordRoutes),
    LoaderModule
  ],

  providers: [],
  exports: [],
 

})

export class ChangePasswordModule {

}

