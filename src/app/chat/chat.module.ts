import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {ChatComponent} from "./chat.component";
import {CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatInputModule} from '@angular/material';

const chatRoutes: Routes = [
  // {path: '', component: BiddingDialogComponent}
];


@NgModule({
  declarations: [
    ChatComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterModule.forChild(chatRoutes),
  ],

  providers: [],
  exports: [ChatComponent],
  entryComponents: [
    ChatComponent
  ]

})

export class ChatModule {

}

