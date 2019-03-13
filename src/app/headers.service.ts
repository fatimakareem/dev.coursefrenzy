import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import { Headers } from '@angular/http';

@Injectable()
export class HeadersService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object){

  }
  public getHeaders(){
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }
    headers.append('Content-Type', 'application/json');
    return headers;
  }

}


