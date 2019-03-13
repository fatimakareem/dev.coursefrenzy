import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Router} from '@angular/router';
import {Headers, Http, Response} from '@angular/http';
import {Config} from '../Config';
import {Observable} from 'rxjs/Observable';
import {isPlatformBrowser} from '@angular/common';
import {HttpService} from "../serv/http-service";
import swal from 'sweetalert2';


@Injectable()
export class BiddingService {

  constructor(private http: Http, private _http2: HttpService, private _nav: Router, @Inject(PLATFORM_ID) private platformId: Object) {
  }
  users_id;
  add_bid(bid_amount, bid_id) {
    // console.log(bid_amount);
    // console.log(bid_id);

    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.post(  Config.api + 'courses/bidhistory/',
      {
        'BidAmount': bid_amount,
        'bid': bid_id,
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
      if (error.status === 403) {
        // console.log('ok not submited submit 404');
        // localStorage.setItem('error', '1');
        return Observable.throw(error);
      } else if (error.status === 400) {
        //    this._nav.navigate(['/pages/accident']);
        // console.log('ok not submited submit 400');
        // localStorage.setItem('error', '1');
        return Observable.throw(new Error(error.status));
      } 
      else if (error.status === 404) {
         swal.fire({
          type: 'error',
          title: 'Bid is Closed',
          showConfirmButton: false,
          width: '512px',
          timer: 2500
        });
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
  offernow(amount, id) {
    // console.log(bid_amount);
    // console.log(bid_id);

    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.post(Config.api +'courses/sendingOfferonCourse/',
      {
        'offer_price': amount,
        'course_id': id,
      }, {headers : headers}).map((res: Response) => {
      if (res) {
        // console.log('1');
        if (res.status === 201 || res.status === 200 || res.status === 203) {
          const responce_data = res.json();
         
          return responce_data;
        } 
      }
    }).catch((error: any) => {
      // alert(error);
      if (error.status === 403) {
        // console.log('ok not submited submit 404');
        // localStorage.setItem('error', '1');
        return Observable.throw(error);
      } else if (error.status === 400) {
        //    this._nav.navigate(['/pages/accident']);
        // console.log('ok not submited submit 400');
        // localStorage.setItem('error', '1');
        return Observable.throw(new Error(error.status));
      } 
      else if (error.status === 404) {
       
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

  get_bids(BidId) {
    return this._http2.get(Config.api + 'courses/bidhistory/' + BidId + '/').map((response: Response) => response.json());
  }

}
