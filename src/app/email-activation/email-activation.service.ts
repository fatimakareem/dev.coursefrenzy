import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Config} from '../Config';
import {Router} from '@angular/router';
import {HttpService} from "../serv/http-service";
import {HeadersService} from "../headers.service";

@Injectable()
export class EmailActivationService {
   users_id;

  constructor(private _http2: HttpService, private _nav: Router, @Inject(PLATFORM_ID) private platformId: Object,private headers: HeadersService) { }

  email_activate(link){
    return this._http2.get(Config.api + 'users/activate/' + link).map((response: Response) => response.json());
  }

}


//{headers: this.headers.getHeaders()}
