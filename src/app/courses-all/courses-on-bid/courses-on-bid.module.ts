import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatIconModule} from '@angular/material';
import {CoursesOnBidComponent} from './courses-on-bid.component'
// import {BiddingDialogModule} from "../../bidding-dialog/bidding-dialog.module";
import {LoaderModule} from "../../loader/loader.module";
// import {NgbModule, NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import {RatingModule} from "ng2-rating";
import { SlickModule } from 'ngx-slick';

const bidCoursesRoutes: Routes = [
  { path: '', component: CoursesOnBidComponent }
];


@NgModule({
  declarations: [
    CoursesOnBidComponent
  ],


  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    // BiddingDialogModule,
    RouterModule.forChild(bidCoursesRoutes),
    LoaderModule,
    RatingModule,
    SlickModule

    // NgbModule
  ],

  providers: [],
  exports: [CoursesOnBidComponent],
  entryComponents: [
  ]
})

export class CoursesOnBidModule {

}

