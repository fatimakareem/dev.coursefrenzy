import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {BecomeInstructorQuestionsComponent} from "./become-instructor-questions.component";
import {MatStepperModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatInputModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {LoaderModule} from "../loader/loader.module";

const questionsRoutes: Routes = [
  {path: '', component: BecomeInstructorQuestionsComponent}
];

@NgModule({
  declarations: [
    BecomeInstructorQuestionsComponent,
  ],

  imports: [
    CommonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    RouterModule.forChild(questionsRoutes),
    LoaderModule
  ],

  providers: [],
  exports: [BecomeInstructorQuestionsComponent]

})

export class BecomeInstructorQuestionsModule {

}

