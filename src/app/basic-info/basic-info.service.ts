import 'rxjs/add/operator/map';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Http , Headers , Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';
// import {DataTableModule} from "angular2-datatable";
// import { AuthHttp, AuthConfig , JwtHelper } from 'angular2-jwt';
// import {AlertService} from './_services/index';
import 'rxjs/add/operator/map';
// import {log} from "util";
import { Config} from '../Config';
import {isPlatformBrowser} from '@angular/common';
import {HttpService} from "../serv/http-service";
import {HeadersService} from "../headers.service";

@Injectable()

export class BasicInfoService {
  constructor(private http: Http,
              private _http2: HttpService,
              private _nav: Router,
              @Inject(PLATFORM_ID) private platformId: Object,
              private headers:HeadersService) {
  }
  users_id;
  get_profile() {
    return this._http2.get( Config.api + 'users/', {headers : this.headers.getHeaders()}).map((response: Response) => response.json());
  }

  user_profile(firstName, lasttName, profilePhoto, headLine, biography, language,
               website, Git, twitter, facebook, linkedIn, youtube) {
    return this._http2.put( Config.api + 'users/',
      {
        'first_name': firstName,
        'last_name': lasttName,
        'profilePhoto': profilePhoto,
        'headLine': headLine,
        'biography': biography,
        'language': language,
        'website': website,
        'Git': Git,
        'twitter': twitter,
        'facebook': facebook,
        'linkedIn': linkedIn,
        'youtube': youtube,
      }, {headers : this.headers.getHeaders()}).map((res: Response) => {
      if (res) {
        // console.log('1');
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
