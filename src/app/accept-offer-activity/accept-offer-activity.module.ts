import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AcceptOfferActivityComponent} from './accept-offer-activity.component';


const acceptoffer: Routes = [
  {path: '', component: AcceptOfferActivityComponent},
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(acceptoffer),
    
  ],
  declarations: [AcceptOfferActivityComponent],

})
export class AcceptOfferActivityModule { }
