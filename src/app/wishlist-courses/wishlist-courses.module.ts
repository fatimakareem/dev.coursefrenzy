import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatIconModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {WishlistCoursesComponent} from "./wishlist-courses.component";
import {LoaderModule} from "../loader/loader.module";

const wishlistRoutes: Routes = [
  { path: '', component: WishlistCoursesComponent }
];


@NgModule({
  declarations: [
    WishlistCoursesComponent
  ],


  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    RouterModule.forChild(wishlistRoutes),
    LoaderModule
  ],

  providers: [],
  exports: []

})

export class WishlistCoursesModule {

}

