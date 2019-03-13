import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatButtonModule, MatPaginatorModule} from '@angular/material';
import { MatTabsModule } from '@angular/material';
import {AdminContactsComponent} from "./admin-contacts.component";
import {MatTableModule} from '@angular/material/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {LoaderModule} from "../loader/loader.module";

const adminContactsRoutes: Routes = [
  {path: '', component: AdminContactsComponent}
];


@NgModule({
  declarations: [
    AdminContactsComponent,
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
    RouterModule.forChild(adminContactsRoutes),
    LoaderModule
  ],

  providers: [],
  exports: []

})

export class AdminContactsModule {

}

