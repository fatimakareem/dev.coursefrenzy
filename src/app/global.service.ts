import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {isPlatformBrowser} from '@angular/common';
import {Config} from './Config';
import {Http, Headers , Response} from '@angular/http';
import {any} from 'codelyzer/util/function';
import {Subject} from 'rxjs/Subject';
import {SimpleGlobal} from 'ng2-simple-global';
import {CoursesService} from './course/courses.service';
import {HeaderService} from './header/header.service';

@Injectable()
export class GlobalService {


  public user_id;
  public mainSearch = 0;
  public globalChatVar = 0;
  public mainSearchCourses = 0;
  public logedin = 0;
  public abc: any;
  public GlobalCourses: any;
  private caseNumber;
  public CurrentPage = 1;
  caseNumber$;

  // public GlobalWishListCourses: any;

  private openSearch = new BehaviorSubject<string>('0');
  openSearch$ = this.openSearch.asObservable();
  private openSliderSearch = new BehaviorSubject<string>('0');
  openSliderSearch$ = this.openSearch.asObservable();

  private openChat = new BehaviorSubject<number>(0);
  openChat$ = this.openChat.asObservable();

  private chatroom = new BehaviorSubject<number>(0);
  chatroom$ = this.chatroom.asObservable();

  private otherChatId = new BehaviorSubject<number>(0);
  otherChatId$ = this.otherChatId.asObservable();

  private teacherID = new BehaviorSubject<number>(0);
  teacherID$ = this.teacherID.asObservable();

  private ckeckCoursesLoaded = new BehaviorSubject<boolean>(false);
  ckeckCoursesLoaded$ = this.ckeckCoursesLoaded.asObservable();

  private InWatchlistorNot = new BehaviorSubject<boolean>(false);
  InWatchlistorNot$ = this.InWatchlistorNot.asObservable();

  private FollowOrNot = new BehaviorSubject<boolean>(false);
  FollowOrNot$ = this.FollowOrNot.asObservable();

  private checkingUserRole = new BehaviorSubject<string>('');
  checkingUserRole$ = this.checkingUserRole.asObservable();

  private emptyWishlistGlobal = new Subject<boolean>();
  emptyWishlistGlobal$ = this.emptyWishlistGlobal.asObservable();

  private showRecent = new BehaviorSubject<boolean>(false);
  showRecent$ = this.showRecent.asObservable();

  private topOfferGlobal = new BehaviorSubject<boolean>(true);
  topOfferGlobal$ = this.topOfferGlobal.asObservable();

  private tokenGlobal = new BehaviorSubject<boolean>(false);
  tokenGlobal$ = this.tokenGlobal.asObservable();

  private catName = new BehaviorSubject<any>('');
  catName$ = this.catName.asObservable();


  private subCatName = new BehaviorSubject<any>('');
  subCatName$ = this.subCatName.asObservable();

  private emptyCartGlobal = new Subject<boolean>();
  emptyCartGlobal$ = this.emptyCartGlobal.asObservable();

  private Categories = new Subject<any>();
  Categories$ = this.Categories.asObservable();

  private Courses = new Subject<any>();
  Courses$ = this.Courses.asObservable();
  private Coursez: any;


  private GlobalWishListCourses = new BehaviorSubject<any>('');
  GlobalWishListCourses$ = this.GlobalWishListCourses.asObservable();

  private GlobalCartCourses = new BehaviorSubject<any>('');
  GlobalCartCourses$ = this.GlobalCartCourses.asObservable();
  watchSubject=new BehaviorSubject<any>('');
  currentMessage = this.watchSubject.asObservable();
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private _http2: Http,
              private glb_ser: SimpleGlobal,
              private obj: CoursesService,
              private obj2: HeaderService,

  ) {

    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }
    if (isPlatformBrowser(this.platformId)) {
      this.caseNumber = new BehaviorSubject<any>(localStorage.getItem('loged_in'));
      this.caseNumber$ = this.caseNumber.asObservable();
    }
  }
  get_cources(page) {
    return this.obj.get_courses(page);
  }

  get_categories(){
     return this.obj2.get_categories();
  }
  search(data: string) {
    this.openSearch.next(data);
    // alert('Global'+data);
  }
  chat(data: number) {
    this.openChat.next(data);
    // alert('Global'+data);
  }

  chatroomfunc(data: number) {
    this.chatroom.next(data);
    // alert('Global'+data);
  }


  chatID(data: number) {
    this.otherChatId.next(data);
    // alert('Global'+data);
  }

  SetingteacherID(data: number) {
    this.teacherID.next(data);
  }


  searchSlider(data: string) {
    this.openSliderSearch.next(data);
    // alert('Global'+data);
  }

  publishData(data: any) {
    this.caseNumber.next(data);
  }
  setGlobalToken(data: any) {
    this.tokenGlobal.next(data);
    // alert('token is set to be ' + data);
  }

  setCatName(data: any) {
    this.catName.next(data);
    // alert('token is set to be ' + data);
  }

  setSubCatName(data: any) {
    this.subCatName.next(data);
    // alert('token is set to be ' + data);
  }

  checkUserRole(data: any) {
    this.checkingUserRole.next(data);
  }
  getCategories(data: any) {
    this.Categories.next(data);
    // console.log('get catec ',data)
  }

  getGolbalWishListCourses(data: any) {
    this.GlobalWishListCourses.next(data);
    // console.log('get catec ',data)
  }
  // get_recent_cources_Global(page) {
  //   return this.obj.get_recent_cources(page);
  // }

  getGolbalCartCourses(data: any) {
    this.GlobalCartCourses.next(data);
    console.log('get catec ',data)
  }

  getemptyWishlistGlobal(data: any) {
    this.emptyWishlistGlobal.next(data);
    // console.log('get catec ',data)
  }

  setShowRecent(data: any) {
    this.showRecent.next(data);
  }

  gettopOfferGlobal(data: any) {
    this.topOfferGlobal.next(data);
    // console.log('get catec ',data)
  }

  getemptyCartGlobal(data: any) {
    this.emptyCartGlobal.next(data);
    // console.log('get catec ',data)
  }


  IsCourses(data: boolean) {
    this.ckeckCoursesLoaded.next(data);
  }

  setWatchlist(data: boolean){
    this.InWatchlistorNot.next(data);
  }

  SetFollowing(data: boolean){
    this.FollowOrNot.next(data);
  }
  watchInfo(message) {
    this.watchSubject.next(message)
    console.log( message)
  }

}
