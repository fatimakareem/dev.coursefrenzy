import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Http , Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

// import {DataTableModule} from "angular2-datatable";
// import { AuthHttp, AuthConfig , JwtHelper } from 'angular2-jwt';
// import {AlertService} from './_services/index';
import 'rxjs/add/operator/map';
import { Config} from '../Config';
import {HttpService} from "../serv/http-service";



@Injectable()
export class SignUpservice {
  constructor(private _http: Http, private _http2: HttpService, private _nav: Router) {
  }

  users_id;
  register_customer(username, email, Password) {
    return this._http2.post( Config.api + 'users/register/',
      {
        'username': username,
        'email': email,
        'password': Password,

      }).map((res: Response) => {
      if (res) {
        // console.log('1');
        if (res.status === 201 || res.status === 200) {
          const responce_data = res.json();
          this._nav.navigate(['/login']);
          return [{status: res.status, json: res}];
        } else if (res.status === 5300) {
          this._nav.navigate(['/login']);
          return [{status: res.status, json: res}];
        } else {
          // console.log('ok');
        }
      }
    }).catch((error: any) => {
      if (error.status === 404) {
        return Observable.throw(new Error(error.status));
      } else if (error.status === 400) {
        return Observable.throw(new Error(error.status));
      } else {
        return Observable.throw(new Error(error.status));
      }
    });
  }

  check_email_unique(email) {
    return this._http.get(Config.api + 'users/email_verify/' + email ).map((response: Response ) => response.json());
  }
  username_verify(username) {
    return this._http.get(Config.api + 'users/username_verify/' + username ).map((response: Response ) => response.json());
  }
}
