import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule, CurrencyPipe} from "@angular/common";
import {CourseComponent} from "./course.component";
import {MatDialogModule} from '@angular/material';
// import {BiddingDialogModule} from '../bidding-dialog/bidding-dialog.module';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatInputModule} from '@angular/material';
import { MatSelectModule } from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material';
import {LoaderModule} from "../loader/loader.module";

import { SlickModule } from 'ngx-slick';
import {RatingModule} from "ng2-rating";

const coursesRoutes: Routes = [
  { path: '', component: CourseComponent },
 
];


@NgModule({
  declarations: [
    CourseComponent
  ],

  imports: [
    CommonModule,RatingModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    
    MatButtonModule,
    RouterModule.forChild(coursesRoutes),
    LoaderModule,
    
    SlickModule.forRoot()
  ],

  providers: [CurrencyPipe],
  exports: []
})
export class CoursesModule {

}

