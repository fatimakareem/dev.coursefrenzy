import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatButtonModule, MatPaginatorModule} from '@angular/material';
import { MatTabsModule } from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {AdminSubadminComponent} from "./admin-subadmin.component";
import {LoaderModule} from "../loader/loader.module";

const subAdminRoutes: Routes = [
  {path: '', component: AdminSubadminComponent}
];


@NgModule({
  declarations: [
    AdminSubadminComponent,
    // MatTableModule
  ],

  imports: [
    CommonModule,
    MatButtonModule,
    MatTabsModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forChild(subAdminRoutes),
    LoaderModule
  ],

  providers: [],
  exports: []

})

export class AdminSubadminModule {

}

