import 'rxjs/add/operator/map';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Http,Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
import {Config} from '../Config';
import {isPlatformBrowser} from '@angular/common';
import {HttpService} from "../serv/http-service";

@Injectable()
export class AccountService {
  constructor(private http: Http, private _http2: HttpService, private _nav: Router, @Inject(PLATFORM_ID) private platformId: Object) {
  }


  change_password(password, newpassword1, newpassword2) {
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.post(Config.api + 'rest-auth/password/change/',
      {

        'old_password': password,
        'new_password1': newpassword1,
        'new_password2': newpassword2,

      }, {headers : headers}).map((res: Response) => {
      if (res) {
        if (res.status === 201 || res.status === 200 || res.status ===202) {
          const responce_data = res.json();
          if(responce_data.status===false){
            // alert('Response Message' + responce_data.message);
            return responce_data.message;

          }
          else {
          }
          return [{status: res.status, json: res}];
        }
        else if (res.status === 5300) {
          return [{status: res.status, json: res}];
        }
        else {
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
        console.log('ok not submited submit 400');
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
