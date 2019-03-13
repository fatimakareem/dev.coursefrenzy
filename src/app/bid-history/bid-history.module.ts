import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {BidHistoryComponent} from "./bid-history.component";
import {MatDialogModule} from '@angular/material';
// import {BiddingDialogModule} from '../bidding-dialog/bidding-dialog.module';
import {LoaderModule} from "../loader/loader.module";
import { CountdownModule } from "ng2-countdown-timer";
// import {MomentTimezoneModule} from 'angular-moment-timezone';
// import {MomentModule} from 'angular2-moment';
import { MomentModule } from 'angular2-moment';

const bidHistoryRoutes: Routes = [
  { path: '', component: BidHistoryComponent },
];


@NgModule({
  declarations: [
    BidHistoryComponent,
  ],

  imports: [
    CommonModule,
    MatDialogModule,
    // BiddingDialogModule,
    RouterModule.forChild(bidHistoryRoutes),
    LoaderModule,
    CountdownModule,
    MomentModule

  ],

  providers: [],
  exports: []

})

export class BidHistoryModule {

}

