import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {WebsocketService} from "../websocket.service";
import {Subscription} from "rxjs/Subscription";
import {GlobalService} from "../global.service";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public socketSubscription: Subscription;
  public messsage1: any=[];
  public model: any={};
  public user_id;
  public otherId;
  public chatroom;
  public username;

  constructor(public socket: WebsocketService,
              private global: GlobalService,
  @Inject(PLATFORM_ID) private platformId: Object
              // public dialogRef: MatDialogRef<ChatComponent>
  ) {

    // this.global.otherChatId$.subscribe(
    //   data => {
    //     this.otherId = data;
    //   });

    // this.global.chatroom$.subscribe(
    //   data => {
    //     this.chatroom = data;
    //   });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.user_id = localStorage.getItem('id');
      this.username = localStorage.getItem('username');
      this.chatroom = localStorage.getItem('room');
    }
    // alert('going to call Web Socket');
    // alert(this.user_id);
    // alert(this.username);
    // // alert(this.chatroom);
    // const stream = this.socket.connect(this.user_id, this.username, this.chatroom);
    // this.socketSubscription = stream.subscribe(message =>{
    //   // console.log('Messasge : ' + message.text);
    //   this.messsage1.push(message);
    //   this.model.messagez = '';
    //   // console.log(this.messsage1);
    // });
     // this.user_id = this.global.user_id;
     // alert(this.user_id);
  }

  click(f){
    // this.socket.send(this.model.messagez);
    // this.model.messagez = '';
  }


  onNoClick(): void {
    // this.dialogRef.close();
  }

}
