import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {isPlatformBrowser} from '@angular/common';
import {Config} from './Config';
import {Http, Headers , Response} from '@angular/http';
import {any} from 'codelyzer/util/function';
import {Subject} from "rxjs/Subject";
import {SimpleGlobal} from "ng2-simple-global";

@Injectable()
export class SingleCourseGlobalService {

  // private chaptersGet: any = {};
  //
  // private chapters = new Subject<any>();
  // Categories$ = this.chapters.asObservable();
  //
  // private Courses = new Subject<any>();
  // Courses$ = this.Courses.asObservable();
  //
  //
  // constructor(@Inject(PLATFORM_ID) private platformId: Object,
  //             private _http2: Http,
  //             private glb_ser: SimpleGlobal
  // ) {}
  //
  // getChapters(data: any) {
  //   this.chapters.next(data);
  // }
  // get_chapters(CourseId) {
  //    this._http2.get( Config.api + 'courses/ChaptersWithVideosList/' + CourseId)
  //      .map((response: Response) => response.json().subscribe( response => this.chaptersGet = response ));
  //    return this.chaptersGet;
  // }
  // chp: string = this.get_chapters()
}
