import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {LoaderModule} from "../loader/loader.module";
import {SubscriptionConfirmationComponent} from "./subscription-confirmation.component";


const subscriptionConformationRoutes: Routes = [
  {path: '', component: SubscriptionConfirmationComponent }
];


@NgModule({
  declarations: [
    SubscriptionConfirmationComponent
  ],

  imports: [
    CommonModule,
    RouterModule.forChild(subscriptionConformationRoutes),
    LoaderModule
  ],

  providers: [],
  exports: [SubscriptionConfirmationComponent],
  entryComponents: [
  ]

})

export class SubscriptionConfirmationModule {

}

