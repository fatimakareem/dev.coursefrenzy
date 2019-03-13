import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InstructorComponent} from './instructor.component';
import {LoaderModule} from '../loader/loader.module';
import {BidHistoryComponent} from '../bid-history/bid-history.component';
import {Routes, RouterModule} from '@angular/router';
import { MatTabsModule } from '@angular/material';
import {InstructorService} from './instructor.service';


const InstructorRoutes: Routes = [
  { path: '', component: InstructorComponent },
];


@NgModule({
  imports: [
    CommonModule,
    LoaderModule,
    RouterModule.forChild(InstructorRoutes),
    MatTabsModule
  ],
  declarations: [InstructorComponent],
  providers: [InstructorService]
})
export class InstructorModule { }
