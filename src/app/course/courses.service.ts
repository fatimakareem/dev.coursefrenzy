import 'rxjs/add/operator/map';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
// import {getDate} from 'ngx-bootstrap/bs-moment/utils/date-getters';
import {Config} from '../Config';
import {isPlatformBrowser} from '@angular/common';
import {HttpService} from "../serv/http-service";
import {HeadersService} from "../headers.service";
import {GlobalService} from '../global.service';

@Injectable()

export class CoursesService {
  users_id;

  constructor(private http: Http, private _http2: HttpService, private _nav: Router,
              @Inject(PLATFORM_ID) private platformId: Object,
              private headers: HeadersService) {
  }

  buyNowcheck(index, course_id,Logedin) {
    return this._http2.post(Config.api +'courses/AlreadyBought/',
      {
        "course":course_id
      }, {headers: this.headers.getHeaders()}).map((res: Response) => {
      if (res) {
        if (res.status === 201 || res.status === 200 || res.status === 202) {
          const responce_data = res.json();
          return responce_data;
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


  enroll_free_course(course_id) {
    return this._http2.post(Config.api + 'courses/enrollfreecourse/' + course_id +'/',
      {

      }, {headers: this.headers.getHeaders()}).map((res: Response) => {
      if (res) {
        if (res.status === 201 || res.status === 200 || res.status === 202) {
          const responce_data = res.json();
          return [{status: res.status, json: res}];
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


  add_wishlist(course_id) {
    return this._http2.post(Config.api + 'courses/wishlist/',
      {
        'course': course_id,
      }, {headers: this.headers.getHeaders()}).map((res: Response) => {
      if (res) {
        if (res.status === 201 || res.status === 200 || res.status === 202) {
          const responce_data = res.json();
            console.log(res.json());
          return [{status: res.status, json: res}];
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

  add_to_cart(course_id, promo) {
    return this._http2.post(Config.api + 'courses/checkout/',
      {
        'course': course_id,
        'promocode': promo,
      }, {headers: this.headers.getHeaders()}).map((res: Response) => {
      if (res) {
        // console.log('1');
        if (res.status === 201 || res.status === 200  || res.status === 202 ) {
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
  get_checkout_courses() {
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.get(Config.api + 'courses/checkout/', {headers : headers}).map((response: Response) => response.json());
  }
  add_to_cart_no_promo(course_id) {
    return this._http2.post(Config.api + 'courses/checkout/',
      {
        'course': course_id,
      }, {headers: this.headers.getHeaders()}).map((res: Response) => {
      if (res) {
        // console.log('1');
        if (res.status === 201 || res.status === 200 || res.status ===202) {
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

  get_courses_category(id, page) {
    return this._http2.get(Config.api + 'courses/CoursesListbyCategory/' + id + '/?page=' + page+'/')
      .map((response: Response) => response.json());
  }
 get_recommendcourse(page) {
   const headers = new Headers();
   headers.append('Content-Type', 'application/json');
   if (localStorage.getItem('Authorization')) {
     headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
     return this._http2.get(Config.api + 'courses/recomended/?page=' + page,{headers: headers}).map((response: Response) => response.json());

   }
    else {

     return this._http2.get(Config.api + 'courses/recomended/?page=' + page).map((response: Response) => response.json());
     }
     // localStorage.getItem('loged_in');
     // console.log('dasda',localStorage.getItem('loged_in'));

   }

  get_courses_subcategory(id, page) {
    return this._http2.get(Config.api + 'courses/CoursesListbySubCategory/' + id + '/?page=' + page)
      .map((response: Response) => response.json());
  }

  get_courses(page) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (localStorage.getItem('Authorization')) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
      return this._http2.get(Config.api + 'courses/?page=' + page, {headers: headers}).map((response: Response) => response.json());
    }
else{

      return this._http2.get(Config.api + 'courses/?page=' + page).map((response: Response) => response.json());


    }
  }
  get_courses_by_category(page,cat_id) {
    return this._http2.get(Config.api + 'courses/trending_nowviaCat/cat/'+ cat_id).map((response: Response) => response.json());
  }
  get_courses_by_subcategory(page,subcat_id) {
    return this._http2.get(Config.api + 'courses/trending_nowviaCat/subcat/'+ subcat_id).map((response: Response) => response.json());
  }
  get_courses_by_nestedsubcategory(page,subcat_id) {
    return this._http2.get(Config.api + 'courses/trending_nowviaCat/nestsubcat/'+ subcat_id).map((response: Response) => response.json());
  }
  get_recent_cources(page) {
    // alert('calling Function');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (localStorage.getItem('Authorization')) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
      return this._http2.get(Config.api + 'courses/recent/?page=' + page, {headers: headers}).map((response: Response) => response.json());
    }
  else {

      return this._http2.get(Config.api + 'courses/recent/?page=' + page).map((response: Response) => response.json());


    }
  }
trending_now(page){
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  if (localStorage.getItem('Authorization')) {
    headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    return this._http2.get(Config.api + 'courses/trending_now/?page=' + page, {headers: headers}).map((response: Response) => response.json());
  }
else {

    return this._http2.get(Config.api + 'courses/trending_now/?page=' + page).map((response: Response) => response.json());


  }
}

  get_top_rated_courses(page) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (localStorage.getItem('Authorization'))
    {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
      return this._http2.get(Config.api + 'courses/topratedcourses/?page=' + page,{headers: headers}).map((response: Response) => response.json());
    }
    else {
      return this._http2.get(Config.api + 'courses/topratedcourses/?page=' + page).map((response: Response) => response.json());
    }
  }
  get_mywatched_courses() {
    return this._http2.get(Config.api + 'courses/watchlist/',{headers: this.headers.getHeaders()}).map((response: Response) => response.json());
  }

  get_top_rated_courses_via_category(page,cat_id) {
    return this._http2.get(Config.api + 'courses/topratedcoursesviacat/cat/'+ cat_id).map((response: Response) => response.json());
  }
  get_top_rated_courses_via_subcategory(page,subcat_id) {
    return this._http2.get(Config.api + 'courses/topratedcoursesviacat/subcat/'+ subcat_id).map((response: Response) => response.json());
  }
  get_top_rated_courses_via_nestedsubcategory(page,subcat_id) {
    return this._http2.get(Config.api + 'courses/topratedcoursesviacat/nestsubcat/'+ subcat_id).map((response: Response) => response.json());
  }
  
  get_teacher_courses(page,teacher_id) {
    return this._http2.get(Config.api + 'courses/teachercourses/'+teacher_id+'/').map((response: Response) => response.json());
  }
  get_top_rated_courses_via_cat(page,cat_id) {
    return this._http2.get(Config.api + 'courses/topratedcoursesviacat/' + cat_id +'?page=' +page).map((response: Response) => response.json());
  }
  
  get_all() {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // if (localStorage.getItem('Authorization')) {
      return this._http2.get(Config.api + 'courses/test/',{headers: headers}).map((response: Response) => response.json());
    // }
    
  }
  get_bid_courses(page) {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (localStorage.getItem('Authorization')) {
      return this._http2.get(Config.api + 'courses/bids_get/?page=' + page,{headers: headers}).map((response: Response) => response.json());
    }
    else {

      return this._http2.get(Config.api + 'courses/bids_get/?page=' + page).map((response: Response) => response.json());


    }
  }

  get_bid_courses_by_category(page,id) {
    return this._http2.get(Config.api + 'courses/BidList_Getviacat/cat/'+id+'').map((response: Response) => response.json());
  }
  get_bid_courses_by_subcategory(page,id) {
    return this._http2.get(Config.api + 'courses/BidList_Getviacat/subcat/'+ id).map((response: Response) => response.json());
  }
  get_bid_courses_by_nestedsubcat(page,id) {
    return this._http2.get(Config.api + 'courses/BidList_Getviacat/nestsubcat/'+ id).map((response: Response) => response.json());
  }
  get_wishlist_courses(page) {
    return this._http2.get(Config.api + 'courses/wishlist/', {headers: this.headers.getHeaders()}).map((response: Response) => response.json());
  }
  getcourses(page) {
    return this._http2.get(Config.api + 'courses/latestcourses/'+'?page=' +page, {headers: this.headers.getHeaders()}).map((response: Response) => response.json());
  }
  search(level,price,rate,page) {
    return this._http2.post(Config.api + 'courses/filterTest/'+'?page=' +page,
      {
        "level":level,
        "price":price,
        "rate":rate
      }).map((res: Response) => {
      if (res) {
        if (res.status === 201 || res.status === 200) {
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
      } else if (error.status === 202) {
        return Observable.throw(new Error(error.status));
      } else {
        return Observable.throw(new Error(error.status));
      }
    });
  }
  // All Filters APIs Calling
  filterd(coursename, range1, range2, category, subcat) {
    return this._http2.post( Config.api + 'courses/NewFilter/',
      {
        'startRange': range1,
        'endRange': range2,
        'coursename': coursename,
        'category': category,
        'subCategory': subcat
      }).map((res: Response) => {
      if (res) {
        if (res.status === 201 || res.status === 200) {
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
      } else if (error.status === 202) {
        return Observable.throw(new Error(error.status));
      } else {
        return Observable.throw(new Error(error.status));
      }
    });
  }

  // saerchTeacher(query) {
  //   return this._http2.put(Config.api + 'courses/searchteacher/',
  //     {
  //       'query': query,
  //     }, {headers: this.headers.getHeaders()}).map((res: Response) => {
  //     if (res) {
  //       if (res.status === 201 || res.status === 200) {
  //         return res.json();
  //       } else if (res.status === 5300) {
  //         return [{status: res.status, json: res}];
  //       } else {
  //       }
  //     }
  //   }).catch((error: any) => {
  //     if (error.status === 404) {
  //       return Observable.throw(new Error(error.status));
  //     } else if (error.status === 400) {
  //       return Observable.throw(new Error(error.status));
  //     } else {
  //       return Observable.throw(new Error(error.status));
  //     }
  //   });
  // }


  removeFromWishlist(course_id) {
    return this._http2.delete(Config.api + 'courses/wishlistdelete/'+course_id+'', {headers : this.headers.getHeaders()}).map((response: Response) => response.json());
  }

}
