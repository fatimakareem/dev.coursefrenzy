import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Config} from '../Config';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {HttpService} from "../serv/http-service";

@Injectable()
export class FooterService {
   users_id;

  constructor(private _http2: HttpService, private _nav: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  subscribe_us(email) {
    return this._http2.post(Config.api + 'users/subscribe_post/',
      {
        'email': email
      }).map((res: Response) => {
      if (res) {
        if (res.status === 201 || res.status === 200) {
          const responce_data = res.json();
          return [{status: res.status, json: res}];
        } else if (res.status === 5300) {
          return [{status: res.status, json: res}];
        } else {
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

}
