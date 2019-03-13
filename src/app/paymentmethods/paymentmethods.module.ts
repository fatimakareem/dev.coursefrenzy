import { PaymentmethodsService } from './paymentmethods.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentmethodsComponent } from './paymentmethods.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import {MatRadioModule} from '@angular/material';
import { MatTabsModule } from '@angular/material';
import { MomentModule } from 'ngx-moment';
import { TextMaskModule } from 'angular2-text-mask';
const route: Routes = [
  { path: '', component: PaymentmethodsComponent }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(route),
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MomentModule,
    TextMaskModule

  ],
  declarations: [PaymentmethodsComponent],
  providers:[PaymentmethodsService]
})
export class PaymentmethodsModule { }
