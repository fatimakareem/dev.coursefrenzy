import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {AdminPanelComponent} from "./admin-panel.component";
import {MatButtonModule} from '@angular/material';
import { MatTabsModule } from '@angular/material';
import {RejectReasonDialog} from './admin-panel.component';
import { MatDialogModule } from '@angular/material';
import {MatInputModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {LoaderModule} from "../loader/loader.module";


const adminpanelRoutes: Routes = [
  {path: '', component: AdminPanelComponent}
];


@NgModule({
  declarations: [
    AdminPanelComponent,
    RejectReasonDialog
  ],

  imports: [
    CommonModule,
    MatButtonModule,
    MatTabsModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(adminpanelRoutes),
    LoaderModule
  ],

  providers: [],
  exports: [],
  entryComponents: [
    RejectReasonDialog
  ]

})

export class AdminPanelModule {

}

