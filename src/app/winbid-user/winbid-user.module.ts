import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {WinbidUserComponent} from './winbid-user.component';
import { MatTabsModule } from '@angular/material';


const winuser: Routes = [
  {path: '', component: WinbidUserComponent},
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(winuser),
    MatTabsModule
  ],
  declarations: [WinbidUserComponent],
  // exports:[WinbidUserComponent]

})
export class WinbidUserModule { }
