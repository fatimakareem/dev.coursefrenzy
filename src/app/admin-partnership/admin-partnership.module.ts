import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTabsModule} from '@angular/material';
import {AdminPartnershipComponent} from "./admin-partnership.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material';
import {LoaderModule} from "../loader/loader.module";
const adminPartnershipRoutes: Routes = [
  {path: '', component: AdminPartnershipComponent}
];


@NgModule({
  declarations: [
    AdminPartnershipComponent,
  ],

  imports: [
    CommonModule,
    HttpClientModule,
    MatTabsModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    // FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpModule,
    // MatSpinnerModule,
    RouterModule.forChild(adminPartnershipRoutes),
    LoaderModule
  ],

  providers: [],
  exports: []

})

export class AdminPartnershipModule {

}

