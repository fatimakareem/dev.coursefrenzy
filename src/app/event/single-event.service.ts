import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Config} from '../Config';
import {Headers, Http, Response} from '@angular/http';
import {Router} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';
import {HttpService} from "../serv/http-service";

@Injectable()
export class SingleEventService {

  constructor(private http: Http, private _http2: HttpService, private _nav: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  get_event(id) {
    return this._http2.get(Config.api + 'events/'+id+'/' ).map((response: Response) => response.json());
  }
}
