import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  AddChapterComponent, AddVideoComponent, EditChapterComponent, PublishCourseComponent,
  SingleCourseComponent,EditdemoComponent,
  IntroVideoComponent
} from './single-course.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatInputModule} from '@angular/material';
import { MatDialogModule } from '@angular/material';
import {MatCheckboxModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import { MatTabsModule } from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';

import { MatSelectModule } from '@angular/material';
// import {VgBufferingModule} from 'videogular2/buffering';
// import {VgCoreModule} from 'videogular2/core';
// import {VgOverlayPlayModule} from 'videogular2/overlay-play';
// import {VgControlsModule} from 'videogular2/controls';
import {LoaderModule} from "../loader/loader.module";
import {TeachesByTeacherComponent} from "./teaches-by-teacher/teaches-by-teacher.component";
import {VideoShowDialogComponent} from "./video-show-dialog/video-show-dialog.component";
import {AddReviewDialogComponent} from "./add-review-dialog/add-review-dialog.component";
import {RatingModule} from "ng2-rating";
import { CKEditorModule } from 'ng2-ckeditor';


const singleCourseRoutes: Routes = [
  { path: '', component: SingleCourseComponent }
];


@NgModule({
  declarations: [
    EditdemoComponent,
    SingleCourseComponent,
    AddChapterComponent,
    AddVideoComponent,
    IntroVideoComponent,
    PublishCourseComponent,
    EditChapterComponent,
    TeachesByTeacherComponent,
    VideoShowDialogComponent,
    AddReviewDialogComponent,
  ],

  imports: [
    CommonModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatStepperModule,
    
    MatSelectModule,
    VgBufferingModule,
    VgCoreModule,
    VgOverlayPlayModule,
    VgControlsModule,
    RouterModule.forChild(singleCourseRoutes),
    LoaderModule,
    RatingModule,CKEditorModule

  ],

  providers: [],
  exports: [],
  entryComponents: [
    EditdemoComponent,
    AddChapterComponent,
    AddVideoComponent,
    PublishCourseComponent,
    EditChapterComponent,
    VideoShowDialogComponent,
    AddReviewDialogComponent,
    IntroVideoComponent
  ]

})

export class SingleCourseModule {

}

