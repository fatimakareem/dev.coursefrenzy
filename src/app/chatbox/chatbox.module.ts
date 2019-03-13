import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ChatboxComponent} from "./chatbox.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { WebSocketService } from 'angular2-websocket-service'


const chatboxRoutes: Routes = [
  { path: '', component: ChatboxComponent }
];


@NgModule({
  declarations: [
    ChatboxComponent,
  ],

  imports: [
    CommonModule,
    RouterModule.forChild(chatboxRoutes),
    FormsModule,
    ReactiveFormsModule
  ],

  providers: [WebSocketService],
  exports: []

})

export class ChatboxModule {

}

