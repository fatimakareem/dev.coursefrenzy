import 'rxjs/add/operator/map';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Http , Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Config} from '../Config';
import { isPlatformBrowser } from '@angular/common';


@Injectable()
export class LogoutService {
  _http: any;

  constructor(private http: Http, private _http2: Http, private _nav: Router, @Inject(PLATFORM_ID) private platformId: Object) {
  }

  logout() {
      // localStorage.setItem('UserID', null);
    if (isPlatformBrowser(this.platformId)) {
      return this._http.post(Config.api + 'api-token-refresh/', {'token': localStorage.getItem('Authorization')}).subscribe(
        data => {
          sessionStorage.clear();
          localStorage.clear();
          this._nav.navigate(['/']);
        },
        error => {
          // console.log(error);
        });
    }
  }
}
