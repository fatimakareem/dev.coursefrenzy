// import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
// import {Http, Response} from '@angular/http';
// import {Observable} from 'rxjs/Observable';
// import {HttpService} from '../serv/http-service';
// import {HeadersService} from '../headers.service';
// import {Config} from '../Config';
//
// @Injectable()
// export class FilterSearchService {
//
//   constructor(private http: Http, private _http2: HttpService,
//               @Inject(PLATFORM_ID) private platformId: Object) { }
//
//   filterd(coursename, range1, range2, category, subcat) {
//     return this.http.post(  'http://192.168.30.86:8000/courses/NewFilter/',
//       {
//         'startRange': range1,
//         'endRange': range2,
//         'coursename': coursename,
//         'category': category,
//         'subCategory': subcat
//       }).map((res: Response) => {
//       if (res) {
//         if (res.status === 201 || res.status === 200) {
//           return res.json();
//         } else if (res.status === 5300) {
//           return [{status: res.status, json: res}];
//         } else {
//         }
//       }
//     }).catch((error: any) => {
//       if (error.status === 404) {
//         return Observable.throw(new Error(error.status));
//       } else if (error.status === 400) {
//         return Observable.throw(new Error(error.status));
//       } else if (error.status === 202) {
//         return Observable.throw(new Error(error.status));
//       } else {
//         return Observable.throw(new Error(error.status));
//       }
//     });
//   }
// }
//
