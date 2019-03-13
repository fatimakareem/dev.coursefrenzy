import 'rxjs/add/operator/map';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Http , Headers , Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
// import {getDate} from 'ngx-bootstrap/bs-moment/utils/date-getters';
// import {log} from "util";
import { Config} from '../Config';
import {isPlatformBrowser} from "@angular/common";

@Injectable()

export class HeaderService {
  constructor(private http: Http, private _http2: Http, private _nav: Router, @Inject(PLATFORM_ID) private platformId: Object) {
  }
  get_categories() {
    return this._http2.get( Config.api + 'courses/allcat/').map((response: Response) => response.json());
  }
  get_nestedcategories(subcat_id) {
    return this._http2.get( Config.api + 'courses/nestedsubcat/'+ subcat_id + '/').map((response: Response) => response.json());
  }
  get_single_category(cat_id) {
    return this._http2.get( Config.api + 'courses/get_single_cat/'+cat_id+'').map((response: Response) => response.json());
  }
  get_toprated(cat_id) {
    return this._http2.get( Config.api + 'courses/topratedcoursesviacat/cat/'+cat_id+'').map((response: Response) => response.json());
  }

  get_single_sub_category(subcat_id) {
    return this._http2.get( Config.api + 'courses/get_single_subcat/' + subcat_id + '').map((response: Response) => response.json());
  }
  get_sub_categories(cat_id) {
    return this._http2.get( Config.api + 'courses/subcat/' + cat_id + '/').map((response: Response) => response.json());
  }
  search(query) {
    return this._http2.post(Config.api + 'courses/searchKeyword/',
      {
        'query': query,
      }).map((res: Response) => {
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
  searchresults(query) {
    return this._http2.post(Config.api + 'courses/main_search_results/',
      {
        'query': query,
      }).map((res: Response) => {
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

  logout() {
    const headers = new Headers();

    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.get( Config.api + 'courses/search/', {headers : headers}).map((response: Response) => response.json());
  }
  accept_offer(){

    const headers = new Headers();

    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.get( Config.api + 'courses/offer_accepted_UserCourses/', {headers : headers}).map((response: Response) => response.json());
  }
  Biduser(){

    const headers = new Headers();

    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.get( Config.api + 'courses/bid_Result_User/', {headers : headers}).map((response: Response) => response.json());
  }
  Notifications(){

    const headers = new Headers();

    // if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
    // }
    headers.append('Content-Type', 'application/json');
    return this._http2.get(  Config.api + 'courses/user_notifications/', {headers : headers}).map((response: Response) => response.json());
  }
  // winbidpayment1(id,bid_id,status) {
  //   //  console.log('Chapter Name is ' + amount);
  //     const headers = new Headers();
  //     if (isPlatformBrowser(this.platformId)) {
  //       headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
  //     }
  //     headers.append('Content-Type', 'application/json');
  //     if(status==true)
  //     {
  //       return this._http2.post(Config.api + 'courses/bidpayment/', 
  //       {
  //       "bid_id":bid_id,
  //           'id': id,
  //         }, {headers: headers}).map((res: Response) => {
  //         if (res) {
  //           // console.log('1');
  //           if (res.status === 201 || res.status === 200) {
  //             const responce_data = res.json();
  //             // localStorage.setItem('user_id', responce_data.id);
  //             // this.users_id = localStorage.getItem('user_id');
  //             return [{status: res.status, json: res}];
  //           } else if (res.status === 5300) {
  //             // this._nav.navigate(['/login']);
    
  //             // localStorage.setItem('conformation', '1');
  //             // console.log('ok submited 200');
  //             return [{status: res.status, json: res}];
  //           } else {
  //             // console.log('ok');
  //           }
  //         }
  //       }).catch((error: any) => {
  //         // alert(error);
  //         if (error.status === 404) {
  //           // console.log('ok not submited submit 404');
  //           // localStorage.setItem('error', '1');
  //           return Observable.throw(new Error(error.status));
  //         } else if (error.status === 400) {
  //           //    this._nav.navigate(['/pages/accident']);
  //           // console.log('ok not submited submit 400');
  //           // localStorage.setItem('error', '1');
  //           return Observable.throw(new Error(error.status));
  //         } else {
  //           //  this._nav.navigate(['/pages/accident']);
  //           // console.log('ok not submited submit error');
    
  //           return Observable.throw(new Error(error.status));
  //         }
  //       });
  //     }
     
     
  //   }
  // winbidpayment(cardNumber, expirationdate, cardcod,id,bid_id,status) {
  // //  console.log('Chapter Name is ' + amount);
  //   const headers = new Headers();
  //   if (isPlatformBrowser(this.platformId)) {
  //     headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
  //   }
  //   headers.append('Content-Type', 'application/json');
  //   if(cardNumber.slice(0,1)=='*')
  //   {
  //     return this._http2.post(Config.api + 'courses/bidpayment/', 
  //     {
  //     "bid_id":bid_id,
  //         'id': id,
  //       }, {headers: headers}).map((res: Response) => {
  //       if (res) {
  //         // console.log('1');
  //         if (res.status === 201 || res.status === 200) {
  //           const responce_data = res.json();
  //           // localStorage.setItem('user_id', responce_data.id);
  //           // this.users_id = localStorage.getItem('user_id');
  //           return [{status: res.status, json: res}];
  //         } else if (res.status === 5300) {
  //           // this._nav.navigate(['/login']);
  
  //           // localStorage.setItem('conformation', '1');
  //           // console.log('ok submited 200');
  //           return [{status: res.status, json: res}];
  //         } else {
  //           // console.log('ok');
  //         }
  //       }
  //     }).catch((error: any) => {
  //       // alert(error);
  //       if (error.status === 404) {
  //         // console.log('ok not submited submit 404');
  //         // localStorage.setItem('error', '1');
  //         return Observable.throw(new Error(error.status));
  //       } else if (error.status === 400) {
  //         //    this._nav.navigate(['/pages/accident']);
  //         // console.log('ok not submited submit 400');
  //         // localStorage.setItem('error', '1');
  //         return Observable.throw(new Error(error.status));
  //       } else {
  //         //  this._nav.navigate(['/pages/accident']);
  //         // console.log('ok not submited submit error');
  
  //         return Observable.throw(new Error(error.status));
  //       }
  //     });
  //   }
  //   else{
  //     return this._http2.post(Config.api + 'courses/bidpayment/', 
  //     {
  //       'bid_id': bid_id,
  //         'ccv': cardcod,
  //          'exp': expirationdate,
  //         'creditno': cardNumber,
  //         // 'amount': amount
  //       }, {headers: headers}).map((res: Response) => {
  //       if (res) {
  //         // console.log('1');
  //         if (res.status === 201 || res.status === 200) {
  //           const responce_data = res.json();
  //           // localStorage.setItem('user_id', responce_data.id);
  //           // this.users_id = localStorage.getItem('user_id');
  //           return [{status: res.status, json: res}];
  //         } else if (res.status === 5300) {
  //           // this._nav.navigate(['/login']);
  
  //           // localStorage.setItem('conformation', '1');
  //           // console.log('ok submited 200');
  //           return [{status: res.status, json: res}];
  //         } else {
  //           // console.log('ok');
  //         }
  //       }
  //     }).catch((error: any) => {
  //       // alert(error);
  //       if (error.status === 404) {
  //         // console.log('ok not submited submit 404');
  //         // localStorage.setItem('error', '1');
  //         return Observable.throw(new Error(error.status));
  //       } else if (error.status === 400) {
  //         //    this._nav.navigate(['/pages/accident']);
  //         // console.log('ok not submited submit 400');
  //         // localStorage.setItem('error', '1');
  //         return Observable.throw(new Error(error.status));
  //       } else {
  //         //  this._nav.navigate(['/pages/accident']);
  //         // console.log('ok not submited submit error');
  
  //         return Observable.throw(new Error(error.status));
  //       }
  //     });
  //   }
   
  // }
 
  winbidpayment(isright,cardNumber, expirationdate, cardcod,id,course_id,type,holder) {
   
    //  console.log('Chapter Name is ' + amount);
      const headers = new Headers();
      if (isPlatformBrowser(this.platformId)) {
        headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
      }
      headers.append('Content-Type', 'application/json');
      if(isright==false)
      {
        return this._http2.post(Config.api + 'courses/bidpayment/', 
        {
        "bid_id":course_id,
            'id': cardNumber,
           
          }, {headers: headers}).map((res: Response) => {
          if (res) {
            // console.log('1');
            if (res.status === 201 || res.status === 200 || res.status===202) {
              const responce_data = res.json();
              // localStorage.setItem('user_id', responce_data.id);
              // this.users_id = localStorage.getItem('user_id');
              return responce_data;
            } else if (res.status === 5300) {
              // this._nav.navigate(['/login']);
    
              // localStorage.setItem('conformation', '1');
              // console.log('ok submited 200');
              // return [{status: res.status, json: res}];
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
          

          'bid_id': course_id,
            'ccv': cardcod,
             'exp': expirationdate,
            'creditno': cardNumber,
            'card_type':type,
            'card_holder':holder
            // 'amount': amount
          }, {headers: headers}).map((res: Response) => {
          if (res) {
            // console.log('1');
            if (res.status === 201 || res.status === 200 || res.status===202) {
              const responce_data = res.json();
              // localStorage.setItem('user_id', responce_data.id);
              // this.users_id = localStorage.getItem('user_id');
              return responce_data;
            } else if (res.status === 5300) {
              // this._nav.navigate(['/login']);
    
              // localStorage.setItem('conformation', '1');
              // console.log('ok submited 200');
              // return responce_data;
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
    offerpayment(isright,cardNumber, expirationdate, cardcod,id,course_id,type,holder) {
   
      //  console.log('Chapter Name is ' + amount);
        const headers = new Headers();
        if (isPlatformBrowser(this.platformId)) {
          headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
        }
        headers.append('Content-Type', 'application/json');
        if(isright==false)
        {
          return this._http2.post(Config.api + 'courses/bidpayment/', 
          {
          "accept_id":course_id,
              'id': cardNumber,
             
            }, {headers: headers}).map((res: Response) => {
            if (res) {
              // console.log('1');
              if (res.status === 201 || res.status === 200 || res.status===202) {
                const responce_data = res.json();
                // localStorage.setItem('user_id', responce_data.id);
                // this.users_id = localStorage.getItem('user_id');
                return responce_data;
              } else if (res.status === 5300) {
                // this._nav.navigate(['/login']);
      
                // localStorage.setItem('conformation', '1');
                // console.log('ok submited 200');
                // return [{status: res.status, json: res}];
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
            
  
            'accept_id': course_id,
              'ccv': cardcod,
               'exp': expirationdate,
              'creditno': cardNumber,
              'card_type':type,
              'card_holder':holder
            }, {headers: headers}).map((res: Response) => {
            if (res) {
              if (res.status === 201 || res.status === 200 || res.status===202) {
                const responce_data = res.json();
                
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
  coursepayment(isright,cardNumber, expirationdate, cardcod,id,course_id,type,holder) {
   
    //  console.log('Chapter Name is ' + amount);
      const headers = new Headers();
      if (isPlatformBrowser(this.platformId)) {
        headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization').toString());
      }
      headers.append('Content-Type', 'application/json');
      if(isright==false)
      {
        return this._http2.post(Config.api + 'courses/payamount/', 
        {
        "course_id":course_id,
            'id': cardNumber,
          }, {headers: headers}).map((res: Response) => {
          if (res) {
            // console.log('1');
            if (res.status === 201 || res.status === 200 || res.status===202) {
              const responce_data = res.json();
              // localStorage.setItem('user_id', responce_data.id);
              // this.users_id = localStorage.getItem('user_id');
              return responce_data;
            } else if (res.status === 5300) {
              // this._nav.navigate(['/login']);
    
              // localStorage.setItem('conformation', '1');
              // console.log('ok submited 200');
              // return [{status: res.status, json: res}];
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
          'course_id': course_id,
            'ccv': cardcod,
             'exp': expirationdate,
            'creditno': cardNumber,
            'card_type':type,
            'card_holder':holder
            // 'amount': amount
          }, {headers: headers}).map((res: Response) => {
          if (res) {
            // console.log('1');
            if (res.status === 201 || res.status === 200 || res.status===202) {
              const responce_data = res.json();
              // localStorage.setItem('user_id', responce_data.id);
              // this.users_id = localStorage.getItem('user_id');
              return responce_data;
            } else if (res.status === 5300) {
              // this._nav.navigate(['/login']);
    
              // localStorage.setItem('conformation', '1');
              // console.log('ok submited 200');
              // return responce_data;
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




