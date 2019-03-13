import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedService {

  constructor() { }

  // private caseNumber: any;

  // Observable string sources
  private caseNumber = new Subject<number>();

  // Observable string streams
  caseNumber$ = this.caseNumber.asObservable();

  // Service message commands
  publishData(data: number) {
    this.caseNumber.next(data);
  }

}
