import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatButtonModule, MatPaginatorModule} from '@angular/material';
import { MatTabsModule } from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {
  AddCategoryComponent, AddSubCategoryComponent, AdminCategoriesComponent,
  EditCategoryComponent, EditSubCategoryComponent
} from "./admin-categories.component";
import { MatDialogModule } from '@angular/material';
import {MatCheckboxModule} from '@angular/material';
import {LoaderModule} from "../loader/loader.module";

const adminCategoriesRoutes: Routes = [
  {path: '', component: AdminCategoriesComponent}
];


@NgModule({
  declarations: [
    AdminCategoriesComponent,
    EditCategoryComponent,
    AddCategoryComponent,
    AddSubCategoryComponent,
    EditSubCategoryComponent
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
    MatDialogModule,
    MatCheckboxModule,
    MatInputModule,
    RouterModule.forChild(adminCategoriesRoutes),
    LoaderModule
  ],

  providers: [],
  exports: [],
  entryComponents: [
    EditCategoryComponent,
    AddCategoryComponent,
    AddSubCategoryComponent,
    EditSubCategoryComponent
  ]

})

export class AdminCategoriesModule {

}

