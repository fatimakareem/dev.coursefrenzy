import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Config} from '../Config';
import {Router} from '@angular/router';
import {Http , Headers , Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {isPlatformBrowser} from '@angular/common';
import {HttpService} from '../serv/http-service';


@Injectable()
export class HomeService {
  users_id;
  constructor(private http: HttpService, private _http2: Http, private _http3: HttpService , private _nav: Router, @Inject(PLATFORM_ID) private platformId: Object) { }


  update_home_slider(id, heading, searchPlaceHolder, SliderImage ) {
    // console.log('Event Name is ' + eventname);
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.put(Config.api + 'pages/Slider_PutDelete/3/',
      {

         'id': id,
         'heading': heading,
         'searchPlaceHolder': searchPlaceHolder,
         'SliderImage': SliderImage,

      }, {headers : headers}).map((res: Response) => {
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

  update_benefits(id, heading, description, icon ) {
    // console.log('Event Name is ' + eventname);
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.put(Config.api + 'pages/SixHeading_PutDelete/' + id + '/',
      {

         // 'id': id,
         'heading': heading,
         'description': description,
         'icon': icon,

      }, {headers : headers}).map((res: Response) => {
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

  update_upperhome_content(id, heading, description, BackImage) {
    // console.log('Event Name is ' + eventname);
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.put(Config.api + 'pages/AfterSixHeading_PutDelete/' + id + '/',
      {
         'id': id,
         'heading': heading,
         'description': description,
         'BackImage': BackImage,

      }, {headers : headers}).map((res: Response) => {
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

  update_home_events_content(id, heading, description) {
    // console.log('Event Name is ' + eventname);
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.put(Config.api + 'pages/CourseNewsEvents_PutDelete/' + id + '/',
      {

         'heading': heading,
         'description': description,

      }, {headers : headers}).map((res: Response) => {
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

  update_content_below_slider(content_id, heading, description, designation, writer, signature) {
    // console.log('Event Name is ' + eventname);
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.put(Config.api + 'pages/AfterSliderHeading2_PutDelete/' + content_id + '/',
      {
         // 'id': content_id,
         'heading': heading,
         'description': description,
         'designation': designation,
         'writer': writer,
         'signature': signature,

      }, {headers : headers}).map((res: Response) => {
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

  get_role() {
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }

    headers.append('Content-Type', 'application/json');
    return this._http2.get( Config.api + 'users/role/', {headers : headers}).map((response: Response) => response.json());
  }

  get_slider_content() {
    return this._http3.get( Config.api + 'pages/SliderGet/1/').map((response: Response) => response.json());
  }

  // get_content_below_slider() {
  //   return this._http2.get( Config.api + 'pages/AfterSliderHeading2Get/1/').map((response: Response) => response.json());
  // }

  get_specialities() {
    return this._http2.get( Config.api + 'pages/SixHeading_getAll/').map((response: Response) => response.json());
  }

  get_single_benefit(id) {
    return this._http2.get( Config.api + 'pages/SixHeadingGet/' + id + '/').map((response: Response) => response.json());
  }

  get_upperhome_content() {
    return this._http2.get( Config.api + 'pages/AfterSixHeading_getAll/').map((response: Response) => response.json());
  }

  get_courses_content() {
    return this._http2.get( Config.api + 'pages/CourseNewsEventsGet/1/').map((response: Response) => response.json());
  }

  get_newsANDevents_content() {
    return this._http2.get( Config.api + 'pages/CourseNewsEventsGet/2/').map((response: Response) => response.json());
  }
  get_categories() {
    return this._http2.get( Config.api + 'courses/categories/').map((response: Response) => response.json());
  }

}
