import 'rxjs/add/operator/map';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Http , Headers , Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Config} from '../Config';
import {isPlatformBrowser} from '@angular/common';
import {HttpService} from "../serv/http-service";
import {GlobalService} from "../global.service";
import {HeadersService} from "../headers.service";


@Injectable()
export class ProfileService {
  private token: Boolean;
  constructor(private http: Http,
              private _http2: HttpService,
              private _nav: Router,
              @Inject(PLATFORM_ID) private platformId: Object,
              private global: GlobalService,
              private headers:HeadersService

  ) {

    this.global.tokenGlobal$.subscribe(
      data => {
        this.token = data;
      });
  }
  get_instructor_profile(user_id) {
    if(this.token===true){
      return this._http2.get( Config.api + 'users/get/' + user_id + '/',{ headers: this.headers.getHeaders()} ).map((response: Response) => response.json());
    }else {
      return this._http2.get( Config.api + 'users/get/' + user_id + '/', ).map((response: Response) => response.json());
    }
  }

  get_instructor_courses(page, user_id) {
    return this._http2.get( Config.api + 'courses/teachercourses/'+user_id+'/?page='+page+'/').map((response: Response) => response.json());
  }
}
