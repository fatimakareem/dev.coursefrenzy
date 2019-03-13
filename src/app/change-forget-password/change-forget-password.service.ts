import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import { Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Config} from '../Config';
import {HttpService} from "../serv/http-service";

@Injectable()
export class ChangeForgetPasswordService {
  constructor(private _http2: HttpService) {
  }
  change_password(pass1, pass2, code) {
    return this._http2.post( Config.api + 'users/change_password/',
      {
        'pass1': pass1,
        'pass2': pass2,
        'code': code,
      }).map((res: Response) => {
      if (res) {
        if (res.status === 201 || res.status === 200 || res.status === 202) {
          return [{status: res.status, json: res.json()}];
        } else if (res.status === 5300) {
          return [{status: res.status, json: res.json()}];
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
