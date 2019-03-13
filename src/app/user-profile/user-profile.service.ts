import 'rxjs/add/operator/map';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Http , Headers , Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Config} from '../Config';
import {isPlatformBrowser} from '@angular/common';
import {HttpService} from "../serv/http-service";
import {HeadersService} from "../headers.service";


@Injectable()

export class UserProfileService {
  constructor(private http: Http,
              private _http2: HttpService,
              private _nav: Router,
              @Inject(PLATFORM_ID) private platformId: Object,
              private headers: HeadersService) {
  }

  users_id;

  user_profile(firstName, lasttName, profilePhoto, headLine, biography, language,
               website, Git, twitter, facebook, linkedIn, youtube) {
    return this._http2.put(Config.api + 'users/',
      {
        'firstName': firstName,
        'lasttName': lasttName,
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
      }, {headers: this.headers.getHeaders()}).map((res: Response) => {
      if (res) {
        if (res.status === 201 || res.status === 200) {
          const responce_data = res.json();
          return [{status: res.status, json: res}];
        } else if (res.status === 5300) {
          return [{status: res.status, json: res}];
        } else {
          // console.log('ok');
        }
      }
    }).catch((error: any) => {
      // alert(error);
      if (error.status === 404) {
        return Observable.throw(new Error(error.status));
      } else if (error.status === 400) {
        return Observable.throw(new Error(error.status));
      } else {
        return Observable.throw(new Error(error.status));
      }
    });
  }

  addCard(cardno, ccv, expiryDate, cardnickname, defaultCheck) {
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }
    headers.append('Content-Type', 'application/json');
    return this.http.post(Config.api + 'purchase/addcard/',{

        "cardNumber": cardno,
        "ccv": ccv,
        "expiryDate": expiryDate,
        "nickname": cardnickname,
        "default": defaultCheck

      },
      {headers: headers}).map((response: Response) => response.json());
  }


  showCards() {
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'purchase/getcards/', {headers: headers}).map((response: Response) => response.json());
  }

  singleCard(id) {
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'purchase/editdeletecard/' + id, { headers: headers }).map((response: Response) => response.json());
  }

  updateCard(ccv, expiryDate, cardnickname, defaultCheck, id) {
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }
    headers.append('Content-Type', 'application/json');
    return this.http.put(Config.api + 'purchase/editdeletecard/' + id,
      JSON.stringify({
        // "cardNumber": cardno,
        "ccv": ccv,
        "expiryDate": expiryDate,
        "nickname": cardnickname,
        "default": defaultCheck
      }),
      { headers: headers }).map((response: Response) => response.json());
  }

  deleteCard(id) {
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }
    headers.append('Content-Type', 'application/json');
    return this.http.delete(Config.api + 'purchase/editdeletecard/' + id, { headers: headers }).map((response: Response) => response.json());
  }
}
