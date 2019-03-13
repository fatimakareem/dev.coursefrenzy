import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import { SearchResultsComponent } from './search-results.component';
import {RatingModule} from "ng2-rating";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';


const searchresultsRoutes: Routes = [
  { path: '', component: SearchResultsComponent }
];


@NgModule({
  declarations: [
    SearchResultsComponent,
  ],

  imports: [
    CommonModule,RatingModule,FormsModule, ReactiveFormsModule,
    RouterModule.forChild(searchresultsRoutes),
  ],

  providers: [],
  exports: []

})

export class SearchresultsModule {

}

