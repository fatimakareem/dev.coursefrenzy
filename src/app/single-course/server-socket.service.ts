import { Injectable } from '@angular/core';
import { QueueingSubject } from 'queueing-subject';
import { Observable } from 'rxjs/Observable';
import { WebSocketService } from 'angular2-websocket-service';
import {Config} from '../Config';

@Injectable()
export class ServerSocket {
  private inputStream: QueueingSubject<any>;
  public outputStream: Observable<any>;
  constructor(private socketFactory: WebSocketService) {}
  objGlobalvariables = Config.api;
  public connect(username, roomno) {
    // console.log('Connecting Now.................');

    // Using share() causes a single websocket to be created when the first
    // observer subscribes. This socket is shared with subsequent observers
    // and closed when the observer count falls to zero.
    // return this.outputStream = this.socketFactory.connect(
    //   'ws://' + this.objGlobalvariables + roomno + '/' + username + '/' + '1?username=' + username,
    //   this.inputStream = new QueueingSubject<any>()
    // ).share();
  }
  public send(message: any): void {
    // console.log('sending : ' + message);
    // If the websocket is not connected then the QueueingSubject will ensure
    // that messages are queued and delivered when the websocket reconnects.
    // A regular Subject can be used to discard messages sent when the websocket
    // is disconnected.
    this.inputStream.next(message);
  }
}
