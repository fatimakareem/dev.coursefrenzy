import 'rxjs/add/operator/map';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
import {Config} from '../Config';
import {isPlatformBrowser} from '@angular/common';

@Injectable()
export class ChangePasswordService {
  constructor(private http: Http, private _http2: Http, private _nav: Router, @Inject(PLATFORM_ID) private platformId: Object) {
  }

  change_password(username: any, pass: any) {
    return this._http2.post(Config.api + 'login', {'username': username, 'password': pass})
      .map((res: Response) => {
        if (res) {
          if (res.status === 201 || res.status === 200) {

            // localStorage.setItem('loged_in', '1');
            // console.log('ok 201');
            // localStorage.setItem('Authorization', res.json().token);
            // console.log(res);
            // asddasjasdn
            const user = {username: username, token: res.json().token};
            if (isPlatformBrowser(this.platformId)) {
              sessionStorage.setItem('currentUser', user.username);
              sessionStorage.setItem('UserToke', user.token);
            }

            this._nav.navigate(['/']);

          } else if (res.status === 7373) {
            // this.login=true;

            //    this.iid= localStorage.getItem('id');
            // console.log(this.iid);
            // localStorage.setItem('loged_in', '1');
            // console.log('ok 200');
            // console.log('responecechecker', res.json());

            // console.log(res.json().token);
            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem('Authorization', res.json().token);
            }
            this._nav.navigate(['/']);

          }
        }
      }).catch((error: any) => {
        if (error.status === 404) {
          // localStorage.setItem('loged_in', '0');
          // console.log(' not 1');
          return Observable.throw(new Error(error.status));
        } else if (error.status === 400) {
          // localStorage.setItem('loged_in', '0');
          // console.log(' not 2');
          return Observable.throw(new Error(error.status));
        } else if (error.status === 401) {
          // localStorage.setItem('loged_in', '0');
          // console.log(' not 3');
          // console.log('ok not submited submite');
        } else {
          // console.log(' not 4');
          // localStorage.setItem('loged_in', '0');
          return Observable.throw(new Error(error.status));
        }
      });
  }
}
