import 'rxjs/add/operator/map';
import {Injectable, Inject, PLATFORM_ID} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {Config} from '../Config';
import { isPlatformBrowser } from '@angular/common';
import {JwtHelper} from 'angular2-jwt';
import {GlobalService} from '../global.service';
import {HttpService} from '../serv/http-service';

// import { isBrowser } from 'angular2-universal';


@Injectable()
export class LoginService {
  private token: string | any;
  constructor(private http: Http, private _http2: HttpService, private _nav: Router, @Inject(PLATFORM_ID) private platformId: Object,
              private global: GlobalService
  ) {
  }
  users_id;
  id;
  jwtHelper: JwtHelper = new JwtHelper();
  login_authenticate(username) {
    return this._http2.post(Config.api +'users/isactivate/', {
        'username': username
    }).map((res: Response) => res.json())
}

  loged_in(username: any, pass: any, returnUrl: any) {
    return this._http2.post(Config.api + 'login', {'username': username, 'password': pass})
      .map((res: Response) => {
        if (res) {
          if (res.status === 201 || res.status === 200) {

            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem('username', this.jwtHelper.decodeToken(res.json().token).username);
              localStorage.setItem('loged_in', '1');
              localStorage.setItem('Authorization', res.json().token);
              localStorage.setItem('id', this.jwtHelper.decodeToken(res.json().token).user_id);
              // console.log("Ussama",this.jwtHelper.decodeToken(res.json().token));

            }

            this.global.setGlobalToken(true);

            this._nav.navigate([returnUrl]);
          }
          else if (res.status === 7373) {
            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem('loged_in', '1');
            }
            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem('Authorization', res.json().token);
            }
            this._nav.navigate(['/']);
          }
        }
      }).catch((error: any) => {
        if (error.status === 404) {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('loged_in', '0');
          }
          return Observable.throw(new Error(error.status));
        } else if (error.status === 400) {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('loged_in', '0');
          }
          return Observable.throw(new Error(error.status));
        } else if (error.status === 401) {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('loged_in', '0');
          }
        } else {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('loged_in', '0');
          }
          return Observable.throw(new Error(error.status));
        }
      });
  }

  reset_password(email ) {
    // console.log('Event Name is ' + eventname);
    return this._http2.post(Config.api + 'users/forget_password/',
      {

        'email': email,

      }).map((res: Response) => {
      if (res) {
        // console.log('1');
        if (res.status === 201 || res.status === 200) {
          const responce_data = res.json();
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('user_id', responce_data.id);
            this.users_id = localStorage.getItem('user_id');
          }
          return [{status: res.status, json: res}];
        } else if (res.status === 5300) {
          // this._nav.navigate(['/login']);
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('conformation', '1');
          }
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
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('error', '1');
        }
        return Observable.throw(new Error(error.status));
      } else if (error.status === 400) {
        //    this._nav.navigate(['/pages/accident']);
        // console.log('ok not submited submit 400');
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('error', '1');
        }
        return Observable.throw(new Error(error.status));
      } else {
        //  this._nav.navigate(['/pages/accident']);
        // console.log('ok not submited submit error');

        return Observable.throw(new Error(error.status));
      }
    });
  }

}
