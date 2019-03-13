import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Config} from '../Config';
import {Router} from '@angular/router';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {isPlatformBrowser} from '@angular/common';
import {HttpService} from "../serv/http-service";

@Injectable()
export class ContactUsService {
   users_id;

  constructor(private http: Http, private _http2: HttpService, private _nav: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  add_contact(name, email, phone, subject, message) {
    // console.log('Event Name is ' + eventname);
    return this._http2.post(Config.api + 'users/Contact_post/',
      {

        'name': name,
        'email': email,
        'phone': phone,
        'subject': subject,
        'message': message,

      }).map((res: Response) => {
      if (res) {
        // console.log('1');
        if (res.status === 201 || res.status === 200) {
          const responce_data = res.json();
          // localStorage.setItem('user_id', responce_data.id);
          // this.users_id = localStorage.getItem('user_id');
          return [{status: res.status, json: res}];
        } else if (res.status === 5300) {
          // this._nav.navigate(['/login']);

          // localStorage.setItem('conformation', '1');
          // console.log('ok submited 200');
          return [{status: res.status, json: res}];
        } else {
          // console.log('ok');
        }
      }
    }).catch((error: any) => {
      // alert(error);
      if (error.status === 404) {
        // console.log('ok not submited submit 404');
        // localStorage.setItem('error', '1');
        return Observable.throw(new Error(error.status));
      } else if (error.status === 400) {
        //    this._nav.navigate(['/pages/accident']);
        // console.log('ok not submited submit 400');
        // localStorage.setItem('error', '1');
        return Observable.throw(new Error(error.status));
      } else {
        //  this._nav.navigate(['/pages/accident']);
        // console.log('ok not submited submit error');

        return Observable.throw(new Error(error.status));
      }
    });
  }

}
