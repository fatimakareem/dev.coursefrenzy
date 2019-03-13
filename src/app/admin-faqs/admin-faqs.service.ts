import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Router} from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import {Config} from '../Config';
import {Observable} from 'rxjs/Rx';
import { HttpClient }   from '@angular/common/http';
import 'rxjs/add/operator/map';
import {HttpService} from "../serv/http-service";
@Injectable()

export class AdminFaqsService {
  private serviceUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private _http: HttpClient,private http: Http, private _http2: HttpService, private _nav: Router, @Inject(PLATFORM_ID) private platformId: Object) {
  }
  users_id;

  addFaq(question, answer) {
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    }
    headers.append('Content-Type', 'application/json');

    return this._http2.post(Config.api + 'pages/faq_post/',
      {
        'question': question,
        'answer': answer,
      }, {headers: headers}).map((res: Response) => {
      if (res) {
        // console.log('1');
        if (res.status === 201 || res.status === 200) {
          const responce_data = res.json();
          // localStorage.setItem('user_id', responce_data.id);
          // this.users_id = localStorage.getItem('user_id');
          return [{status: res.status, json: res}];
        } else if (res.status === 5300) {
          // this._nav.navigate(['/login']);

          // localStorage.setItem('conformation', '1');
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
        // localStorage.setItem('error', '1');
        return Observable.throw(new Error(error.status));
      } else if (error.status === 400) {
        //    this._nav.navigate(['/pages/accident']);
        // console.log('ok not submited submit 400');
        // localStorage.setItem('error', '1');
        return Observable.throw(new Error(error.status));
      } else {
        //  this._nav.navigate(['/pages/accident']);
        // console.log('ok not submited submit error');

        return Observable.throw(new Error(error.status));
      }
    });
  }


  editFaq(id, question, answer) {
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    }
    headers.append('Content-Type', 'application/json');

    return this._http2.put(Config.api + 'pages/faq_put_delete/'+id+'/',
      {
        'question': question,
        'answer': answer,
      }, {headers: headers}).map((res: Response) => {
      if (res) {
        // console.log('1');
        if (res.status === 201 || res.status === 200) {
          const responce_data = res.json();
          // localStorage.setItem('user_id', responce_data.id);
          // this.users_id = localStorage.getItem('user_id');
          return [{status: res.status, json: res}];
        } else if (res.status === 5300) {
          // this._nav.navigate(['/login']);

          // localStorage.setItem('conformation', '1');
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
        // localStorage.setItem('error', '1');
        return Observable.throw(new Error(error.status));
      } else if (error.status === 400) {
        //    this._nav.navigate(['/pages/accident']);
        // console.log('ok not submited submit 400');
        // localStorage.setItem('error', '1');
        return Observable.throw(new Error(error.status));
      } else {
        //  this._nav.navigate(['/pages/accident']);
        // console.log('ok not submited submit error');

        return Observable.throw(new Error(error.status));
      }
    });
  }



  deleteFaq(faqId) {
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.delete(Config.api + 'pages/faq_put_delete/'+faqId+'/', {headers : headers}).map((response: Response) => response.json());
  }


  get_all_faqs() {
    // const headers = new Headers();
    // if (isPlatformBrowser(this.platformId)) {
    //   headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    // }
    // headers.append('Content-Type', 'application/json');
    return this._http2.get(Config.api + 'pages/faq_getall/').map((response: Response) => response.json());
  }

}
