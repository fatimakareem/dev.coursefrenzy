import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CourseCheckoutComponent} from "./course-checkout.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatInputModule, MatSlideToggleModule} from '@angular/material';
import {LoaderModule} from "../loader/loader.module";
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { PaymentmethodsService } from '../paymentmethods/paymentmethods.service';
import { TextMaskModule } from 'angular2-text-mask';

const checkoutRoutes: Routes = [
  { path: '', component: CourseCheckoutComponent }
];


@NgModule({
  declarations: [
    CourseCheckoutComponent,

  ],

  imports: [
    CommonModule,TextMaskModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    RouterModule.forChild(checkoutRoutes),
    LoaderModule,
    MatDatepickerModule,
  ],

  providers: [PaymentmethodsService],
  exports: [],
  entryComponents: []

})

export class CourseCheckoutModule {

}

