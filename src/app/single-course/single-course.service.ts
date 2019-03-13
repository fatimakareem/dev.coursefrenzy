import 'rxjs/add/operator/map';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Router} from '@angular/router';
// import {log} from "util";
import {Config} from '../Config';
import {Observable} from 'rxjs/Rx';
import {isPlatformBrowser} from '@angular/common';
import {HttpService} from "../serv/http-service";
import {HttpClient} from "@angular/common/http";
import {GlobalService} from "../global.service";
import {HeadersService} from "../headers.service";
import swal from 'sweetalert2';

@Injectable()

export class SingleCourseService {
  private token: Boolean;
  constructor(private http: Http,
              private _http2: Http,
              private _nav: Router,
              @Inject(PLATFORM_ID) private platformId: Object,
              private global: GlobalService,
              private headers: HeadersService,

  ) {
    this.global.tokenGlobal$.subscribe(
      data => {
        this.token = data;
      });
  }

  users_id;
  get_Single_Course(id) {
    if(this.token===true){
      return this._http2.get(Config.api + 'courses/' + id + '/', { headers: this.headers.getHeaders()}).map((response: Response) => response.json());
    }else{
      return this._http2.get(Config.api + 'courses/' + id + '/').map((response: Response) => response.json());
    }
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
  check_course_buy_review(course_id) {
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.get(Config.api + 'courses/isinmycourses/' + course_id + '/',{headers : headers}).map((response: Response) => response.json());
  }
  get_reviews(courseId) {
    return this._http2.get(Config.api + 'courses/reviews_get/' + courseId + '/').map((response: Response) => response.json());
  }

  post_reviews(comment, rating, courseId) {
    // console.log('Chapter Name is ' + Name);
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.post(Config.api + 'courses/reviews_post/' + courseId + '/',
      {
        'comment': comment,
        'rating': rating,
      }, {headers : headers}).map((res: Response) => {
      if (res) {
        // console.log('1');
        if (res.status === 201 || res.status === 202 ) {
          const responce_data = res.json();
          if(res.status === 202){
             swal.fire({
              type: 'error',
              title: 'You Already Reviewed this Course.',
              showConfirmButton: false,
              width: '512px',
              timer: 2000,
             
            });
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
  req_for_publish(courseId) {
    // console.log('Chapter Name is ' + Name);
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.post(Config.api + 'courses/submitcourseforapprovel/',
      {
       "course":courseId
      }, {headers : headers}).map((res: Response) => {
      if (res) {
        // console.log('1');
        if (res.status === 202 || res.status === 201 ) {
          const responce_data = res.json();
          if(res.status === 201){
             swal.fire({
              type: 'error',
              title: 'Course is Already Submit for review.',
              showConfirmButton: false,
              width: '512px',
              timer: 2000,
             
            });
          }
          // localStorage.setItem('user_id', responce_data.id);
          // this.users_id = localStorage.getItem('user_id');
          return responce_data;
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
  upload_chapter(chapterName, courses_id) {
    // console.log('Chapter Name is ' + Name);
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.post(Config.api + 'courses/chapters_post/',
      {
        'chapter_name': chapterName,
        'course': courses_id,
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

  publish_course(course_id, about_course, language, description) {
    // console.log('Chapter Name is ' + Name);
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.post(Config.api + 'courses/overviewpost/',
      {
        'course': course_id,
        'about_course': about_course,
        'language': 'english',
        'lifetimeaccess': true,
        'description': description,
        // 'requirement': requirement,
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

  upload_introvideo(video_url, video_minutes, video_size,id) {
    // console.log('Chapter Name is ' + Name);
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.post(Config.api + 'courses/introvideo/'+id,
      {
        //  'video_title': video_title,
        'video_url': video_url,
        'video_minutes': video_minutes,
        // 'video_isPrivate': video_isPrivate,
        'video_size': video_size,
        // 'chapter': chapter,
      }, {headers : headers}).map((res: Response) => {
      if (res) {
        // console.log('1');
        if (res.status === 201 || res.status === 200 || res.status === 202) {
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

  upload_video(video_title, video_url, video_minutes, video_size, video_isPrivate, chapter) {
    // console.log('Chapter Name is ' + Name);
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.post(Config.api + 'courses/chapters/VideoPost/',
      {
         'video_title': video_title,
        'video_url': video_url,
        'video_minutes': video_minutes,
        'video_isPrivate': video_isPrivate,
        'video_size': video_size,
        'chapter': chapter,
        'allow_to_view':false
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
  upload_demovideo( video_url, video_minutes, video_size, id) {
    // console.log('Chapter Name is ' + Name);
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.put(Config.api + 'courses/introvideo/'+id,
      {
        //  'video_title': video_title,
        'video_url': video_url,
        'video_minutes': video_minutes,
        // 'video_isPrivate': video_isPrivate,
        'video_size': video_size,
        // 'chapter': chapter,
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
  delete_chapter(id) {
    return this._http2.delete( Config.api + 'courses/chapter_delete/'+id+'/', {headers : this.headers.getHeaders()}).map((response: Response) => response.json());
  }

  delete_video(id) {
    return this._http2.delete( Config.api + 'courses/chapters/videoss/'+id+'/', {headers : this.headers.getHeaders()}).map((response: Response) => response.json());
  }



  edit_chapter(chapter_id, chapter_name) {
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }
    headers.append('Content-Type', 'application/json');
    return this._http2.put(Config.api + 'courses/chapters/'+chapter_id+'/',
      {
        'chapter_name': chapter_name,
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



  Follow(user_id) {
    return this._http2.put(Config.api + 'users/following/' + user_id + '/',
      {
      }, {headers : this.headers.getHeaders()}).map((res: Response) => {
      if (res) {
        if (res.status === 201 || res.status === 200 || res.status === 202) {
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

  AddtoWatchedCourses(courseId) {
    return this._http2.put(Config.api + 'courses/watched_post/' + courseId + '/',
      {
      }, {headers : this.headers.getHeaders()}).map((res: Response) => {
      if (res) {
        if (res.status === 201 || res.status === 200 || res.status === 202) {
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

  WatchListDelete(courseId) {
    return this._http2.put (Config.api + 'courses/watchlistdelete/' + courseId + '',
      {
      }, {headers : this.headers.getHeaders()}).map((res: Response) => {
      if (res) {
        if (res.status === 201 || res.status === 200 || res.status === 202) {
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

  room(user_Id, other_id) {
    // console.log('Chapter Name is ' + Name);

    return this._http2.post( Config.api+ 'webchat/allrooms/',
      {
        'user1': user_Id,
        'user2': other_id
      }, {headers : this.headers.getHeaders()}).map((res: Response) => {
      if (res) {
        // console.log('1');
        if (res.status === 201 || res.status === 200) {
          const response_data = res.json();
          // localStorage.setItem('user_id', responce_data.id);
          // this.users_id = localStorage.getItem('user_id');
          // return [{status: res.status, json: res}];
          return res.json();
        }
        else if (res.status === 5300) {
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

  get_chapters(CourseId) {
    return this._http2.get(Config.api + 'courses/ChaptersWithVideosList/'+CourseId+'').map((response: Response) => response.json());
  }

  get_overview(CourseId) {
    return this._http2.get( Config.api + 'courses/overviewget/' + CourseId+'/').map((response: Response) => response.json());
  }

  get_followers(user_Id) {
    return this._http2.get( Config.api + 'users/following/' + user_Id + '/').map((response: Response) => response.json());
  }
  //
  // channels(user_Id, other_id) {
  //   return this._http2.get( Config.api + 'webchat/following/' + user_Id + '/').map((response: Response) => response.json());
  // }

}
