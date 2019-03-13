import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Router} from '@angular/router';
// import {log} from "util";
import {Config} from '../Config';
import {Observable} from 'rxjs/Observable';
import {isPlatformBrowser} from '@angular/common';
import {HttpService} from "../serv/http-service";

@Injectable()
export class CourseCheckoutService {
  users_id;
  constructor(private http: Http, private _http2: HttpService, private _nav: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  get_checkout_courses() {
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.get(Config.api + 'courses/checkout/', {headers : headers}).map((response: Response) => response.json());
  }

  verify_promo_code(promoCode, courseId) {
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.get(Config.api + 'courses/validatepromocode/'+promoCode+'/'+courseId+'/', {headers : headers}).map((response: Response) => response.json());
  }


  removeFromCart(course_id) {
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.delete(Config.api + 'courses/checkoutdelete/'+course_id+'', {headers : headers}).map((response: Response) => response.json());
  }


  add_payment(isright,cardNumber, expirationdate, cardcod, amount,id,status,cardtype,holdername) {
   console.log('Chapter Name is ' + amount);
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    }
    headers.append('Content-Type', 'application/json');
    if(isright==false)
    {
      return this._http2.post(Config.api + 'courses/payamount/', 
      {
          'id': cardNumber,
        }, {headers: headers}).map((res: Response) => {
        if (res) {
          // console.log('1');
          if (res.status === 201 || res.status === 200 || res.status===202 ) {
            const responce_data = res.json();
          
            return responce_data;
          } else if (res.status === 5300) {
            // this._nav.navigate(['/login']);
  
            // localStorage.setItem('conformation', '1');
            // console.log('ok submited 200');
          
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
    else{
      return this._http2.post(Config.api + 'courses/payamount/', 
      {
          'ccv': cardcod,
          'exp': expirationdate,
          'creditno': cardNumber,
          // 'amount': amount
          "card_type":cardtype,
          "card_holder":holdername
        }, {headers: headers}).map((res: Response) => {
        if (res) {
          // console.log('1');
          if (res.status === 201 || res.status === 200 || res.status===202) {
            const responce_data = res.json();
            // localStorage.setItem('user_id', responce_data.id);
            // this.users_id = localStorage.getItem('user_id');
            return responce_data;
          } else if (res.status === 5300) {
            
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
   
  }
}


