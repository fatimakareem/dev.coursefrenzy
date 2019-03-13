import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WinbidComponent} from './winbid.component';
import {RouterModule, Routes} from '@angular/router';

const winner: Routes = [
  {path: '', component: WinbidComponent},
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(winner)
  ],
  declarations: [WinbidComponent]
})
export class WinbidModule { }
