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
import { User } from './../admin-partnership/user.model';
import {HttpService} from "../serv/http-service";
import {HeadersService} from "../headers.service";

@Injectable()

export class AdminPanelService {
  private serviceUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private _http: HttpClient,
              private http: Http,
              private _http2: HttpService,
              private _nav: Router,
              @Inject(PLATFORM_ID) private platformId: Object,
              private headers: HeadersService) {
  }
  getUser(): Observable<User[]> {
    return this._http.get<User[]>(this.serviceUrl);
  }
  users_id;

  approveCourse(course_id) {
    // console.log('Chapter Name is ' + Name);
    const headers = new Headers();

    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    }
    headers.append('Content-Type', 'application/json');

    return this._http2.put( Config.api + 'courses/approvecourse/' + course_id + '/',
      {

        'course': course_id,
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
        console.log('ok not submited submit error');

        return Observable.throw(new Error(error.status));
      }
    });
  }


  rejectCourse(course_id, reason) {
    // console.log('Chapter Name is ' + Name);
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    }
    headers.append('Content-Type', 'application/json');

    return this._http2.put(  Config.api + 'courses/rejectcourse/' + course_id + '/',
      {
        'reason': reason,
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

  delete_single_contact(course_id) {
    // console.log('Chapter Name is ' + Name);
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    }
    headers.append('Content-Type', 'application/json');

    return this._http2.put(Config.api + 'users/Contact_PutDelete/1/',
      {
        'course': course_id,
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

  get_rejected_courses(page) {
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.get( Config.api + 'courses/rejected/' + '?page=' + page + '', {headers : headers}).map((response: Response) => response.json());
  }

  get_courses_for_approval(page) {
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.get( Config.api + 'courses/forapproval/' + '?page=' + page + '', {headers : headers}).map((response: Response) => response.json());
  }
  get_contact_request() {
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.get( Config.api + 'users/Contact_getAll/', {headers : headers}).map((response: Response) => response.json());
  }

  get_partnership_request() {
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.get(Config.api + 'users/Partner_getAll/', {headers : headers}).map((response: Response) => response.json());
  }

  get_single_contact() {
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.get(Config.api + 'users/ContactGet/1/', {headers : headers}).map((response: Response) => response.json());
  }

  search_pending_course(query) {
    return this._http2.put(Config.api + 'courses/searchpendingcourses/',
      {
        'query': query,
      }, {headers : this.headers.getHeaders()}).map((res: Response) => {
      if (res) {
        if (res.status === 201 || res.status === 200) {
          const responce_data = res.json();
          return res.json();
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


  getWinning() {
    const headers = new Headers();
    // if (isPlatformBrowser(this.platformId)) {
    //   headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    // }
    headers.append('Content-Type', 'application/json');
    return this._http2.get( Config.api + 'courses/bid_Result_admin/', {headers : headers}).map((response: Response) => response.json());
  }
}
