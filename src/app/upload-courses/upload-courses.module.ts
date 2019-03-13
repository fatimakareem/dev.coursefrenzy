import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {
  AddCourseDialogComponent, CourseBidComponent, EditCourseDialogComponent,
  UploadCoursesComponent
} from './upload-courses.component';
// import {WinbidUserComponent} from '../winbid-user/winbid-user.component';
// import {WinbidDialogComponent} from '../winbid-dialog/winbid-dialog.component'
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {TimeAgoPipe} from 'time-ago-pipe';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatInputModule} from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import {MatRadioModule} from '@angular/material';
import { MatTabsModule } from '@angular/material';
import { ImageCropperModule } from 'ngx-image-cropper';
import {MatCheckboxModule} from '@angular/material';
import {LoaderModule} from "../loader/loader.module";
import {MatDatepickerModule} from '@angular/material';
import { MomentModule } from 'ngx-moment';
// import {matInputModule} from '@angular/material';
import { DateTimePickerModule} from 'ngx-datetime-picker';

const myCoursesRoutes: Routes = [
  { path: '', component: UploadCoursesComponent }
];


@NgModule({
  declarations: [
    UploadCoursesComponent,
    AddCourseDialogComponent,
    EditCourseDialogComponent,
    CourseBidComponent,
    TimeAgoPipe
  ],

  imports: [
    CommonModule,DateTimePickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatRadioModule,
    ImageCropperModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    // OwlDateTimeModule,
    // OwlNativeDateTimeModule,
    MatTabsModule,
    MatCheckboxModule,
    RouterModule.forChild(myCoursesRoutes),
    LoaderModule,
    MomentModule
  ],

  providers: [],
  exports: [],
  entryComponents: [
    AddCourseDialogComponent,
    CourseBidComponent,
    EditCourseDialogComponent,
  ]

})

export class UploadCoursesModule {

}



