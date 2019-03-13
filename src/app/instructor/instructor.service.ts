import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpService} from '../serv/http-service';
import {Response} from '@angular/http';
import {Config} from '../Config';
import {isPlatformBrowser} from '@angular/common';

@Injectable()
export class InstructorService {

  constructor(private http: HttpService, @Inject(PLATFORM_ID) private platformId: Object) { }

  get_instructor(page) {
    // alert('hello');
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    }
    headers.append('Content-Type', 'application/json');
    return this.http.get( Config.api + 'courses/all_instructors/?page=' + page).map((response: Response) => response.json());


  }
}
