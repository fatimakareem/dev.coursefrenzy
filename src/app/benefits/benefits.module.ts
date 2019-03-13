import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {BenefitsComponent} from './benefits.component';
import {EditBenefitsComponent} from './benefits.component';
import {MatInputModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import {LoaderModule} from "../loader/loader.module";

const benefitsRoutes: Routes = [

];


@NgModule({
  declarations: [
    BenefitsComponent,
    EditBenefitsComponent
  ],

  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    RouterModule.forChild(benefitsRoutes),
    LoaderModule
  ],

  providers: [],
  exports: [BenefitsComponent],
  entryComponents: [
    EditBenefitsComponent,
  ],

})

export class BenefitsModule {

}

