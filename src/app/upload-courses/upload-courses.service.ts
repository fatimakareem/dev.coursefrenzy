import 'rxjs/add/operator/map';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Http , Headers , Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';
import {HttpService} from "../serv/http-service";
// import {DataTableModule} from "angular2-datatable";
// import { AuthHttp, AuthConfig , JwtHelper } from 'angular2-jwt';
// import {AlertService} from './_services/index';
import 'rxjs/add/operator/map';
// import {getDate} from 'ngx-bootstrap/bs-moment/utils/date-getters';
// import {log} from "util";
import { Config} from '../Config';
import {isPlatformBrowser} from '@angular/common';
import swal from 'sweetalert2';

@Injectable()
export class UploadCoursesService {
  constructor(private http: Http, private _http2: HttpService, private _nav: Router, @Inject(PLATFORM_ID) private platformId: Object) {
  }
  users_id;
  // this.model.Name, this.model.Price, this.course_image, this.model.skill, this.model.category, this.model.sub_category, this.model.nestedsub_category,sale_date,this.model.Minimum, this.model.Maximum, this.isActive, this.isActives, this.isBidPrice, this.model.SalePrice, this.Date, new_date, this.Check, this.model.ReservedPrice, this.Days,this.Sales,this.end_time
  upload_course( Name, Price, course_image, skill, category, sub_category,nestedsub_category,sale_date, Minimum,Maximum, SaleStatus, accept, BidStatus1, initial_amount, start_time , end_time , IsReserved , ReservedPrice,Auction,auction,sale) {
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }
    headers.append('Content-Type', 'application/json');
    if(BidStatus1 == true){
      // alert('with bidding')
    return this._http2.post(  Config.api + 'courses/postcourse/',
      {
          
        'name': Name,
        'actual_price': Price,
        'course_image': course_image,
        'skill': skill,
        'Categories': category,
        'SubCategory': sub_category,
        'nestedSubCategory':nestedsub_category,
        'min_amount':Minimum,
        'max_amount':Maximum,
        'date_durationforsale': sale_date,
        'sale_status': SaleStatus,
        'accept_offer': accept,
        'bidstatus': BidStatus1,
        'daysforsale':auction,
        'bidcourse':
          {
            'InitAmount': initial_amount,
            'StartTime': start_time,
            'EndTime': end_time ,
            'isReserved': IsReserved,
            'reservedPrice': ReservedPrice,
            'auctionlater' : Auction,
            'daysforauction':sale
          }
      }, {headers : headers}).map((res: Response) => {
      if (res) {
        // console.log('1');
        if (res.status === 201 || res.status === 200 || res.status ===202) {
          const responce_data = res.json();
          if(responce_data.status===false){
            // alert('Response Message' + responce_data.message);
            return responce_data.message;

          }else {
          }
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
  else if (BidStatus1 == false) {
    // alert('without bid')
    return this._http2.post(  Config.api + 'courses/postcourse/',
    {
        
      'name': Name,
      'actual_price': Price,
      'course_image': course_image,
      'skill': skill,
      'Categories': category,
      'SubCategory': sub_category,
      'nestedSubCategory':nestedsub_category,
      'min_amount':Minimum,
      'max_amount':Maximum,
      'date_durationforsale': sale_date,
      'sale_status': SaleStatus,
      'accept_offer': accept,
      'bidstatus': BidStatus1,
      'daysforsale':auction,
      'bidcourse':
        {
          
        }
    }, {headers : headers}).map((res: Response) => {
    if (res) {
      // console.log('1');
      if (res.status === 201 || res.status === 200 || res.status ===202) {
        const responce_data = res.json();
        if(responce_data.status===false){
          // alert('Response Message' + responce_data.message);
          return responce_data.message;

        }else {
        }
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
}

  edit_course( id,Name, Price, course_image, skill, category, sub_category, nested,Sales,edit_Minimum,edit_Maximum, SaleStatus, accept, BidStatus1, initial_amount ,start_time,end_time, IsReserved , ReservedPrice,Auction,ids,auction,sale) {
   alert(start_time);alert(end_time)

    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }
    headers.append('Content-Type', 'application/json');
    if(BidStatus1==true)

    {
      return this._http2.put(Config.api + 'courses/edit_delete/'+ id,
      {

      
        'name': Name,
        'actual_price': Price,
        'course_image': course_image,
        'skill': skill,
        'Categories': category,
        'SubCategory': sub_category,
        'nestedSubCategory':nested,
        'date_durationforsale': Sales,
        'sale_status': SaleStatus,
        'min_amount':edit_Minimum,
        'max_amount':edit_Maximum,
        'accept_offer': accept,
        'bidstatus': BidStatus1,
        'daysforsale':auction,
        'bidcourse':
          {
            'InitAmount': initial_amount,
            'StartTime': start_time,
            'EndTime': end_time ,
            'isReserved': IsReserved,
            'reservedPrice': ReservedPrice,
            'auctionlater' : Auction,
            'id': ids,
            'daysforauction':sale
          }
      }, {headers : headers}).map((res: Response) => {
      if (res) {
        if (res.status === 201 || res.status === 200 || res.status ===202) {
          const responce_data = res.json();
          if(responce_data.status===false){
            return responce_data.message;
          }else {
          }
          return [{status: res.status, json: res}];
        } else if (res.status === 5300) {
          return [{status: res.status, json: res}];
        } else {
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
    else
    {
      return this._http2.put(Config.api + 'courses/edit_delete/'+ id,
      {

        'name': Name,
        'actual_price': Price,
        'course_image': course_image,
        'skill': skill,
        'Categories': category,
        'SubCategory': sub_category,
        'nestedSubCategory':nested,
        'date_durationforsale': Sales,
        'sale_status': SaleStatus,
        'min_amount':edit_Minimum,
        'max_amount':edit_Maximum,
        'accept_offer': accept,
        'bidstatus': BidStatus1,
        'daysforsale':auction,
        'bidcourse':
          {
            'id': ids
          }
      }, {headers : headers}).map((res: Response) => {
      if (res) {
        if (res.status === 201 || res.status === 200 || res.status ===202) {
          const responce_data = res.json();
          if(responce_data.status===false){
            return responce_data.message;
          }else {
          }
          return [{status: res.status, json: res}];
        } else if (res.status === 5300) {
          return [{status: res.status, json: res}];
        } else {
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

  add_bid_on_course(bidamount, startTime, endTime, reserved, reservedbid, BidCourse_id) {

    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.post( Config.api + 'courses/bids_post/',
      {
        'InitAmount': bidamount,
        'StartTime': startTime,
        'EndTime': endTime,
        'isReserved': reserved,
        'reservedPrice': reservedbid,
        'course': BidCourse_id,

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
        this.BidCourseFailure();
        return Observable.throw(new Error(error.status));
      } else if (error.status === 400) {
        //    this._nav.navigate(['/pages/accident']);
        // console.log('ok not submited submit 400');
        // localStorage.setItem('error', '1');
        return Observable.throw(new Error(error.status));
      }
      else if(error.status === 302)
      {
        this.BidCourseFailure2();
        return Observable.throw(new Error(error.status));
      }
      else {
        //  this._nav.navigate(['/pages/accident']);
        // console.log('ok not submited submit error');
        return Observable.throw(new Error(error.status));
      }
    });


  }

  BidCourseFailure() {
     swal.fire({
      type: 'error',
      title: 'Oops! <br> Course not Approved by Admin  !',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    });
  }
  BidCourseFailure2() {
     swal.fire({
      type: 'error',
      title: 'Oops! <br> Course is already posted !',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    });
  }
  // InvalidInformation() {
  //    swal.fire({
  //     type: 'error',
  //     title: 'Oops! <br> Invalid Information!',
  //     showConfirmButton: false,
  //     width: '512px',
  //     timer: 2500
  //   })
  // }
  // BidCourseSuccess() {
  //    swal.fire({
  //     type: 'success',
  //     title: 'Success! <br> Bid Allowed on Course!',
  //     showConfirmButton: false,
  //     width: '512px',
  //     timer: 2500
  //   })
  // }
  get_my_enrolled_courses() {
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.get(  Config.api + 'courses/mycourses/', {headers : headers}).map((response: Response) => response.json());
  }
  get_my_posted_courses(page) {
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.get(  Config.api + 'courses/mypostedcourses'+'/'+'?page='+page+'', {headers : headers}).map((response: Response) => response.json());
  }
  my_posted_courses() {
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.get(Config.api +'courses/mypostedcourses'+'/', {headers : headers}).map((response: Response) => response.json());
  }
  delete_my_posted_course(id) {
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.delete( Config.api + 'courses/edit_delete/'+id, {headers : headers}).map((response: Response) => response.json());
  }



  search_my_posted_course(query) {
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.post(Config.api + 'courses/mypostedcourses/',
      {
        'query': query,
      }, {headers : headers}).map((res: Response) => {
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

}
