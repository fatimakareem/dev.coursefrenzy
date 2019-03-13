import { Component, OnInit } from '@angular/core';
import {ChatboxService} from "./chatbox.service";
import {Config} from "../Config";
import {WebsocketService} from "../websocket.service";
import {FormControl, Validators} from '@angular/forms';import {Observable} from 'rxjs'; 

declare const $: any;
@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']

})
export class ChatboxComponent implements OnInit {
  public chat_user_load: boolean = false;
  item;
  public Messages: any = [];
  public Teachers: any = [];
  public loaded: boolean= false;
  public catImageUrl = Config.staticStorageImages;
  public room_Number: any;
  public chat_user: number;
  public chat_username: string;
  public chat_profilephoto: string;
  public logedin_user: string | any;
  public query: any;counter:number;
  public  model: any = {};
 name = new FormControl('', [
    Validators.required
  ]);
  constructor(private obj: ChatboxService, private websocket: WebsocketService) { this.counter=10;}

  ngOnInit() {
    this.obj.getTeacher().subscribe(response => {
      this.Teachers = response.instructors;
      console.log(this.Teachers);
      this.loaded = true;
    });
  
  }

  filter_teachers(query) {
    if (query !== '') {
      this.obj.searchTeacher(query).subscribe(response => {
        this.Teachers = response.instructors;
        console.log(this.Teachers);
        this.loaded = true;
      });
    }
  }
  getData(){
    this.counter+=5;
    $('#chat-scroll').animate({
      scrollTop: $('#chat-scroll').get(0).scrollHeight}, 0);    
    // $('#Div').prop("scrollHeight")
    this.obj.get_messages(this.room_Number,this.counter).subscribe(response => {
      this.Messages = response;
      this.item=response['Total Result'];
      console.log(this.Messages);
      this.chat_user_load = true;
      // this.obj.messages.next(this.Messages);
    });
  }
  mess(){
    this.obj.get_messages(this.room_Number,this.counter).subscribe(response => {
      this.Messages = response;
      this.item=response['Total Result'];
      console.log(this.Messages);
      this.chat_user_load = true;
      
      // this.obj.messages.next(this.Messages);
    });
  }
  selected_teacher(user_id,username,profilephoto){

    this.logedin_user = localStorage.getItem('username');
    // Get Room Number

    this.obj.getRoom(username,this.logedin_user).subscribe(response => {
      this.room_Number = response.room;
      // this.Messages = response.messages;
      
      this.chat_user_load = true;

      console.log(this.room_Number);

      // this.websocket.connect(this.room_Number);
      // alert(this.room_Number)
    this.obj.get_messages(this.room_Number,this.counter).subscribe(response => {
      this.Messages = response;
      this.item=response['Total Result'];
      console.log(this.Messages);
      this.chat_user_load = true;

      // this.obj.messages.next(this.Messages);
    });
    });

    this.chat_user_load = true;

    this.chat_user = user_id;
    this.chat_username = username;
    this.chat_profilephoto = profilephoto;


  }



PostMessage(){

  this.obj.post_messages(this.room_Number, this.model.Testing).subscribe(response => {
    this.Messages = response;
    console.log('Room', this.Messages);
    this.chat_user_load = true;
   this.mess();
   Observable.interval(50000).subscribe(x => {
    this.mess();
    // console.log(this.conversation)
  });
    // this.websocket.connect(this.room_Number);
  });
}

  }
