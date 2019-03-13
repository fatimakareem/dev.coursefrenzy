import { Component, Inject, OnInit, PLATFORM_ID,OnDestroy } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { UploadCoursesService } from './upload-courses.service';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { Config } from '../Config';
import swal from 'sweetalert2';
import { HeaderService } from '../header/header.service';
import { GlobalService } from '../global.service';
import { PagerService } from '../paginator.service';
import { HttpClient } from '@angular/common/http';
import { HomeService } from "../home/home.service";
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { isPlatformBrowser } from '@angular/common';
import { Alert } from 'selenium-webdriver';
// import { Router } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import {RecentlyViewedCoursesComponent} from '../courses-all/recently-viewed-courses/recently-viewed-courses.component';
import { WinbidDialogComponent } from '../winbid-dialog/winbid-dialog.component';

const NAME_REGEX = '[a-zA-Z0-9_.]+?';
// const ^[0-9]*$ = '[0-9]+';

@Component({
  selector: 'app-upload-courses',
  templateUrl: './upload-courses.component.html',
  styleUrls: ['./upload-courses.component.css']
})
export class UploadCoursesComponent implements OnInit,OnDestroy {
  course_data_passing: any;
  public NoPostedCourseErrorMessage: string;
  public coursesList: any = [];
  getingRoleData: any;
  public ImageUrl = Config.ImageUrl;
  p = 1;
  public userRole: string;
  public postedCoursesList: any = [];
  public loaded2: boolean = false;
  pager: any = {};
  public query: any;
  response;
  res;
  public searchResult: any;
  public NoMyCoursesErrorFalse: boolean = false;
  public NoMyCoursesErrorMessage: string;
  public GlobalUploadCourses: any = [];
  public Logedin: string;
  public UploadCourses: any = [];
  constructor( private nav: Router,private _nav:Router,private route: ActivatedRoute,private obj1: HeaderService,private obj: UploadCoursesService, public dialog: MatDialog, private global: GlobalService,
    private pagerService: PagerService, private _home: HomeService, private global2: GlobalService, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.Logedin = localStorage.getItem("loged_in");
    }
    this.global2.caseNumber$.subscribe(
      data => {
        this.Logedin = data;
      });

    this.global.checkingUserRole$.subscribe(
      data => {
        this.userRole = data;
      });
    // this.global.GlobalUploadCourse$.subscribe(
    //   data => {
    //     if (data.length===0){
    //       this.GlobalUploadCourses = [];
    //     }else {
    //       this.GlobalUploadCourses = data;
    //     }
    //   });

  }
  GetBidUser(){
    this.obj1.Biduser().subscribe(data =>{

      this.response = data['Win List'];
      this.res = data['Lose List'];

    })


  }
  ngOnInit() {
    
    if(localStorage.getItem("sell")){ const dialogRef = this.dialog.open(AddCourseDialogComponent, {
      // width: '500px',
      data: this.postedCoursesList
      
    });}
    this.GetBidUser();
    this.global.currentMessage.subscribe(message =>this.postedCoursesList = message)
    // this.global.GlobalUploadCourse$.subscribe(response  => this.response  = response);
    this.obj.get_my_enrolled_courses().subscribe(response => {
      if (response.hasOwnProperty("status")) {
        // console.log("No Course Founddddd in My Enrolled Courses");
        console.log(response.status);
        this.NoMyCoursesErrorFalse = false;
        this.NoMyCoursesErrorMessage = response.message;

      } else {
        this.coursesList = response.courses;
        this.NoMyCoursesErrorFalse = true;
        console.log('printing My Courses List');
        // console.log(this.coursesList);
        this.loaded = true;
      }

    });

    this._home.get_role().subscribe(response => {
      this.getingRoleData = response;
      this.userRole = this.getingRoleData.Role;
      this.global.checkUserRole(this.userRole);
      this.loaded = true;
    });

    this.setPage(1);

  }

  animal: string;
  name: string;
  loaded = false;

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCourseDialogComponent, {
      // width: '500px',
      data: this.postedCoursesList
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   // console.log('The dialog was closed');
    //   // console.log(result);
    //   // window.location.reload();
    //   if (result !== 1) {
    //     this.postedCoursesList['courses'].push(result);
    //     console.log('hello worlds', this.postedCoursesList['courses']);
    //   }
    // });
  }

  EditCourseDialog(index, course_id): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    this.course_data_passing = this.postedCoursesList;
    // dialogConfig
    dialogConfig.data = {
      width: '500px',
      course_data: this.course_data_passing['courses'][index],
      isEditForm: true
    };
    const dialogRef = this.dialog.open(EditCourseDialogComponent, dialogConfig);

    
  }


  deletdeCourse(index, course_id) {
    // console.log(index);
    // console.log(course_id);
     swal.fire({
      title: 'Are you sure you want to delete this course? <br> All Chapters and videos of this course will be deleted <br> You will not be able to revert this!',
      type: 'question',
      showCancelButton: true,
      width: '512px',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.obj.delete_my_posted_course(course_id).subscribe(
          data => {
            // console.log(data);
            // console.log('index' + index);
            this.postedCoursesList['courses'].splice(this.postedCoursesList['courses'].indexOf(this.postedCoursesList['courses'][index]), 1);
            // console.log(this.postedCoursesList['courses']);
            UploadCoursesComponent.deleteSuccess();
          },
          error => {
            // console.log(error);
            UploadCoursesComponent.deleteError();
          }
        );
      }
    })
  }


  static deleteSuccess() {
     swal.fire({
      type: 'success',
      title: 'Delete Request sent to admin',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static deleteError() {
     swal.fire({
      type: 'error',
      title: 'Oops! <br> Failed to send request',
      // text: 'Failed to approve course!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }


  filter(query) {
    if (this.query !== '') {
      this.obj.search_my_posted_course(this.query).subscribe(response => {
        this.postedCoursesList = response;
        // this.searchResult = response;
        // console.log(this.Courses);

        this.loaded = true;
      });
    }
  }
  openDialog3(index, course_id): void {
    // alert(course_id);
   
    if (this.Logedin === '1') {
      const dialogRef = this.dialog.open(WinbidDialogComponent, {
        width: '500px',
        data: { course_id: course_id,
          // CourseDetail: this.Courses
        }
      });
    } else {
      RecentlyViewedCoursesComponent.Authenticat();
      this.nav.navigate(['login']);
    }
  }


  openDialog2(BidCourse_id): void {
    const dialogRef = this.dialog.open(CourseBidComponent, {
      width: '500px',
      data: { BidCourse_id: BidCourse_id }
    });

  }


  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.obj.get_my_posted_courses(page).subscribe(response => {
      this.postedCoursesList = response;
      this.global.watchInfo( this.postedCoursesList);
      console.log('PostedCourse', this.postedCoursesList);
      if (response.hasOwnProperty("status")) {
        this.NoPostedCourseErrorMessage = response.message;
      }
      // console.log(this.postedCoursesList['courses']);
      this.pager = this.pagerService.getPager(this.postedCoursesList['totalItems'], page, 10);
      // console.log(this.postedCoursesList['totalItems']);
      this.loaded2 = true;
    });
  }
  ngOnDestroy(){
    localStorage.removeItem("sell");
  }
  setPage2(page: number) {
    // if (page < 1 || page > this.pager.totalPages) {
    //   return;
    // }
    // this.obj.get_my_posted_courses(page).subscribe(response => {
    //   this.postedCoursesList = response;
    //   // console.log(this.postedCoursesList.courses);
    //   this.pager = this.pagerService.getPager(this.postedCoursesList['totalItems'], page, 10);
    //   this.loaded2 = true;
    // });
  }

  onSelect(course) {
  }
}

@Component({
  selector: 'app-add-course--dialog',
  templateUrl: 'add-course-dialog.html',
  styleUrls: ['../events/add-event.component.css']
})
export class AddCourseDialogComponent implements OnInit,OnDestroy {
  time = new Date("00:00:00 GMT-0500 (EST)");
  public course_image: string;
  public ImageUrl = Config.ImageUrl;
  private EditCourseData: any = [];
  public isEditForm: boolean = false;
  name: any;
  page: number;
  skill: string;
  public Categories;
  public SubCategories;
  public nestedSubCategories;
  public loaded = false;
  nestedsub_category;
  Auction = true;
  file: any;
  file1: any;
  files: File;
  input;
  Checks = true;
  clicked = false;
  public model: any = {};
  color = 'accent';
  checked = false;
  disabled = false;
  hide;
  isActive = true;
  isActives = false;
  isBidPrice = true;

  Check = false;
  Day = false;
  hides;
  isBids;

  duration = 0;
  Dic = 0;
  Sale = 0;
  Days = false;
  starttime;
  Date = new Date();
  Dates = new Date();
  Auct;
  Logedin: string;
  public GlobalUploadCourses: any = [];
  ranges = [
    { value: '10', viewValue: '10' },
    { value: '15', viewValue: '15' },
    { value: '21', viewValue: '21' },
    { value: '30', viewValue: '30' },
    { value: '60', viewValue: '60' }
  ];
  range = [
    { value: '3', viewValue: '3' },
    { value: '5', viewValue: '5' },
    { value: '7', viewValue: '7' },
    { value: '15', viewValue: '15' },
  ];
  end_time;
  Sales;
  response
  Name = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9_.+-, !@#$%^&*()<>{}|=~]+?')]);

  Price = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$')
  ]);


  Discount = new FormControl('', [
    Validators.required, Validators.pattern('^[0-9]*$')]);

  DaysDuration = new FormControl('', [
    Validators.required]);

  SaleDuration = new FormControl('', [
    Validators.required
  ]);
  ReservedPrice = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$')]);

  SalePrice = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$')]);
  Maximum = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$')]);

  Minimum = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$')]);
  dateFormControl = new FormControl('', [
    Validators.required,
  ]);
  public postedCoursesList: any = [];

  constructor(private obj: UploadCoursesService, private obj2: HeaderService, public dialogRef: MatDialogRef<AddCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private global: GlobalService, @Inject(PLATFORM_ID) private platformId: Object) {
    if (data.course_data) {
      this.EditCourseData = data.course_data;
      this.isEditForm = data.isEditForm;
      console.log('Edit Course Data', this.EditCourseData);
      console.log(this.isEditForm);
      // this.model = data.course_data;
      this.model.course_image = this.EditCourseData.course.course_image;
      this.model.Name = this.EditCourseData.course.name;
      console.log(this.model.Name);
      this.model.Price = this.EditCourseData.course.actual_price;
      // this.model.Discount = this.EditCourseData.discounted_price;
      this.Sales = this.EditCourseData.course.date_durationforsale;
      console.log('Sale_Duration', this.Sales);
      this.isActive = this.EditCourseData.course.sale_status;
      console.log('isActive', this.isActive);
      this.isActives = this.EditCourseData.course.accept_offer;
      console.log('isActives', this.isActives);
      this.isBidPrice = this.EditCourseData.course.bidstatus;
      console.log('isBidPrice', this.isBidPrice);
      this.model.SalePrice = this.EditCourseData.InitAmount;
      console.log('SalePrice', this.model.SalePrice);
      this.Date = this.EditCourseData.StartTime;
      console.log('Current Date', this.Date);
      this.end_time = this.EditCourseData.EndTime;
      console.log('end_time', this.end_time);
      this.Check = this.EditCourseData.isReserved;
      console.log('CHeck', this.Check);
      this.model.ReservedPrice = this.EditCourseData.reservedPrice;
      console.log('ReservedPrice', this.model.ReservedPrice);
      this.model.category = this.EditCourseData.course.Categories[0].id;
      console.log(this.model.category);
      this.model.Name = this.EditCourseData.name;
      this.obj2.get_sub_categories(this.model.category).subscribe(response => {
        this.SubCategories = response;
        // console.log(this.SubCategories);
        this.loaded = true;
      });
      this.model.sub_category = this.EditCourseData.course.SubCategory[0].id;

      console.log(this.model.sub_category);

      this.model.skill = this.EditCourseData.skill;

    }
    // this.global.GlobalUploadCourse$.subscribe(
    //   data => {
    //     if (data.length===0){
    //       this.GlobalUploadCourses = [];
    //     }else {
    //       this.GlobalUploadCourses = data;
    //     }
    //   });
    this.global.caseNumber$.subscribe(
      data => {
        this.Logedin = data;
      });

  }

  ngOnInit() {
   console.log(new Date());
    this.global.currentMessage.subscribe(message =>this.postedCoursesList = message)
    this.obj2.get_categories().subscribe(response => {
      this.Categories = response;
      // console.log(this.Categories);
      this.loaded = true;
    });
    // this.global.GlobalUploadCourse$.subscribe(response  => this.response  = response);
  }
  ngOnDestroy(){
    localStorage.removeItem("sell");
  }
  onNoClick(): void {
    this.dialogRef.close(1);
    // localStorage.removeItem("sell");
  }
  nestedsubcat(id) {
    this.obj2.get_nestedcategories(id).subscribe(response => {
      this.nestedSubCategories = response;
    });
  }
  onSubmit(f: NgForm) {
    this.http.post(
      Config.ImageUploadUrl,
      this.input, { responseType: 'text' }).subscribe(data => {
        if (data === "Sorry, not a valid Image.Sorry, only JPG, JPEG, PNG & GIF files are allowed.Sorry, your file was not uploaded.") {
          EditCourseDialogComponent.ImageUploadFailer();
        } else {
          this.course_image = data;
          console.log(this.course_image);
          this.ifImageUpload();
        
        }
       
      });

    // }
  }
  private ifImageUpload() {
  
    if (this.Days == false) {
      var curent_date = moment(this.Date, "DD-MM-YYYY");

      var new_date = moment(curent_date).add(this.end_time, 'days');
     
    }
    else if (this.Days == true) {
   
      var curent_date = moment(this.Dates, "DD-MM-YYYY");
      var new_date = moment(this.Dates).add(this.end_time, 'days');
      console.log('Auction Later', this.model.date);

    }
    if(this.isActive == false){
      var sale_date = moment(this.Dates).add(this.Sales, 'days'); 
    }
    this.obj.upload_course(this.model.Name, this.model.Price, this.course_image, this.model.skill, this.model.category, this.model.sub_category, this.model.nestedsub_category,sale_date,this.model.Minimum, this.model.Maximum, this.isActive, this.isActives, this.isBidPrice, this.model.SalePrice, curent_date, new_date, this.Check, this.model.ReservedPrice, this.Days,this.Sales,this.end_time).subscribe(
      data => {
        this.dialogRef.close(data[0]['json'].json());
        AddCourseDialogComponent.CourseSuccess();
        this.obj.get_my_posted_courses(1).subscribe(response => {
          this.postedCoursesList = response;
          this.global.watchInfo( this.postedCoursesList);
          console.log('PostedCourse', this.postedCoursesList);
         
        });
      },
      error => {
        AddCourseDialogComponent.CourseFailure();
      }

    );
    // if (data[0]['json'].json().hasOwnProperty("status")) {
    //   AddCourseDialogComponent.CourseFailure();
    // }
    // else {
    //   this.GlobalUploadCourses(this.dialogRef.close(data[0]['json'].json()));
    //   console.log("Ussama here33", this.GlobalUploadCourses);
    //   this.global.getGlobalUploadCourses(this.GlobalUploadCourses);
    //   AddCourseDialogComponent.CourseSuccess();

    // data => {
    //   // console.log(data[0]['json'].json());
    //   this.GlobalUploadCourses.dialogRef.close(data[0]['json'].json());
    //   this.global.getGlobalUploadCourses(this.GlobalUploadCourses);
    //   AddCourseDialogComponent.CourseSuccess();
    // },
    //   error => {
    //     AddCourseDialogComponent.CourseFailure();
    //   }
    // console.log(data[0]['json'].json());
    // this.dialogRef.close(data[0]['json'].json());
    // AddCourseDialogComponent.CourseSuccess();
  }

  // this.reserveds();
  reserved() {
    if (this.isActive) {
      this.hide = false;
    } else {
      this.hide = true;
    }
  }

  reserveds() {
    if (this.isActives) {
      this.hides = false;
    } else {
      this.hides = true;
    }
  }
  Auctions() {
    if (this.isBids) {
      this.isBids = false;
    } else {
      this.isBids = true;
    }
  }

  CheckReserved() {
    if (this.Checks) {
      this.Checks = false;
    }
    else {
      this.Checks = true;
    }
  }
  Auc() {
    if (this.Days) {
      this.Days = false;
    } else {
      this.Days = true;
    }
  }
  // AucLater() {
  //   if (this.Auct) {
  //     this.Auct = false;
  //   } else {
  //     this.Auct = true;
  //   }
  // }

  selected(cat_id) {
    this.obj2.get_sub_categories(cat_id).subscribe(response => {
      this.SubCategories = response;
      // console.log(this.SubCategories);
      this.loaded = true;
    });
  }

  static CourseSuccess() {
     swal.fire({
      type: 'success',
      title: 'Course Added Successfully! <br> Request is sent to admin you will be notified after approval.',
      width: '512px',
      timer: 2500
    })
  }

  static CourseFailure() {
     swal.fire({
      type: 'error',
      title: 'Oops! <br>Failed to add course. Inccorrect Information!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static greaterDiscout() {
     swal.fire({
      type: 'error',
      title: 'Please review form! <br>Discount amount can not be greater than course price!',
      // showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  isClick() {
    if (this.clicked === true) {
      return this.clicked = false;
    } else {
      return this.clicked = true;
    }
  }




  static onlyNumberKey(event) {
    const charCode = (event.query) ? event.query : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    } else {
      return true;
    }
  }

  onChange(event: EventTarget) {
    this.input = new FormData();
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    this.input.append('fileToUpload', target.files[0]);
    console.log(this.input)
    
  }
}


@Component({
  selector: 'app-add-course--dialog',
  templateUrl: 'edit-course-dialog.html',
  styleUrls: ['../events/add-event.component.css']
})
export class EditCourseDialogComponent implements OnInit {
  public course_image: string;
  public ImageUrl = Config.ImageUrl;
  private EditCourseData: any = [];
  public isEditForm: boolean = false;
  name: any;
  page: number;
  skill: string;
  public Categories;
  public SubCategories;
  public loaded = false;
  Auction = true;
  file: any;
  file1: any;
  files: File;
  input;
  Checks = true;
  clicked = false;
  public model: any = {};
  color = 'accent';
  checked = false;
  disabled = false;
  hide;
  isActive = true;
  isActives = false;
  isBidPrice = true;
  Check = false;
  Day = false;
  ReservedPrice;
  hides;
  isBids;
  edit_isBidPrice = false;
  edit_isBids;
  duration = 0;
  Dic = 0;
  Sale;
  SalePrice = 0;
  Minimum;
  Maximum;
  Days = false;
  starttime;
  ranges = [
    { value: '10', viewValue: '10' },
    { value: '15', viewValue: '15' },
    { value: '21', viewValue: '21' },
    { value: '30', viewValue: '30' },
    { value: '60', viewValue: '60' }
  ];
  range = [
    { value: '3', viewValue: '3' },
    { value: '5', viewValue: '5' },
    { value: '7', viewValue: '7' },
    { value: '15', viewValue: '15' },
  ];
  end_time: any=[];
  Sales;
  Date = new Date();
  Dates = new Date();
  Name = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9_.+-, !@#$%^&*()<>{}|=~]+?')]);

  Price = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$')]);


  Discount = new FormControl('', [
    Validators.required, Validators.pattern('^[0-9]*$')]);

  DaysDuration = new FormControl('', [
    Validators.required]);

  SaleDuration = new FormControl('', [
    Validators.required
  ]);
  reservedbidamountFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$')]);

  StartingBidPrice = new FormControl('', [
    Validators.required
  ]);
  dateFormControl = new FormControl('', [
    Validators.required,
  ]);
  private course_id: number;
  private course_discounted_price: any = 0;
  private course_actual_price: any = 0;

  bidstatus;
  var_start_date_string;
  var_end_date_string;
  edit_start_auction;
  new_dateBuy;
  var_end_date;
  var_start_Date;
  var_get_start_date;
  var_get_end_date;
  var_final_get_date;
  var_get_auctionlater;
  var_get_status;
  var_get_post_end_date;
  var_list_for_sale_start;
  var_list_for_sale_end;
  var_get_post_date;
  var_final_date_durationforsale;
  date_durationforsale;
  postdate;
  final_date_durationforsale;
  constructor(private obj: UploadCoursesService,private global: GlobalService, private obj2: HeaderService, public dialogRef: MatDialogRef<AddCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) {
    if (data.course_data) {
    
      this.EditCourseData = data.course_data;

      this.isEditForm = data.isEditForm;
      this.course_id = this.EditCourseData.course.id;
      this.model.ids = this.EditCourseData.id;
      this.model.FirstName = this.EditCourseData.course.name;
      this.model.course_image = this.EditCourseData.course.course_image;
      this.model.Price = this.EditCourseData.course.actual_price;
    
      // var new_dateBuy = moment(this.Sales).subtract(this.end_time, 'days').days();
      this.isActive = this.EditCourseData.course.sale_status;
      if(this.isActive==true)
      {    
        this.isActive==true
        this.hide = true;
        
      }
    else
    {
      this.isActive==false;
      this.hide = false;
      
     
   
     
      
    
     }
     this.model.Sales=this.EditCourseData.course.daysforsale.toString();
       this.model.end_time=this.EditCourseData.daysforauction.toString();
this.model.date= this.EditCourseData.StartTime
      this.model.Sale=   this.var_final_date_durationforsale;
         this.Day=this.EditCourseData.auctionlater
      this.isActives = this.EditCourseData.course.accept_offer;

      this.isBidPrice = this.EditCourseData.course.bidstatus;
      if (this.isBidPrice == true) {
        this.edit_isBidPrice = true;
        this.edit_isBids = true;
        this.model.SalePrice = this.EditCourseData.InitAmount;
        this.var_start_Date = this.EditCourseData.StartTime;
        this.var_end_date = this.EditCourseData.EndTime;
        this.var_get_start_date=this.var_start_Date.toString().slice(8, 10);
        this.var_get_end_date=this.var_end_date.toString().slice(8, 10);
        this.var_final_get_date=this.var_get_end_date-this.var_get_start_date;
         
        this.Check = this.EditCourseData.isReserved;
        if (this.Check == true) {
          this.Checks = true;
          this.model.ReservedPrice = this.EditCourseData.reservedPrice;
        }
        else {
          this.Check=false;
          this.Checks = false;
        }
        this.var_get_auctionlater=this.EditCourseData.auctionlater;
        if(this.var_get_auctionlater==true)
        {
          this.Day=true;
          this.Days=true;
        }
        else
        {
          this.Day=false;
          this.var_get_auctionlater=false;
          this.Days=false;
        }

      }
      else {
        this.edit_isBids = false;
        this.edit_isBidPrice = false;
      }
      if (this.isActives == true) {
        this.hides = true;
        this.model.edit_Minimum = this.EditCourseData.course.min_amount;
        this.model.edit_Maximum = this.EditCourseData.course.max_amount;
      }
      else {
        this.isActives = false;
      }
      if (this.Days == true) {
        this.Days = true;
      }
      else {
        this.Days = false;
      }
      this.model.category = this.EditCourseData.course.Categories[0].id;
      this.obj2.get_sub_categories(this.model.category).subscribe(response => {
        this.SubCategories = response;
        // console.log(this.SubCategories);
        this.loaded = true;
      });
      this.model.sub_category = this.EditCourseData.course.SubCategory[0].id;
      this.obj2.get_nestedcategories(this.model.sub_category).subscribe(response => {
        this.nestedSubCategories = response;
        // console.log(this.SubCategories);
        this.loaded = true;
      });
      this.model.nestedsub_category = this.EditCourseData.course.nestedSubCategory[0].id;
      console.log(this.model.sub_category);
      this.model.skill = this.EditCourseData.course.skill;
    }

  }
  nestedSubCategories;
  public postedCoursesList: any = [];

  ngOnInit() {
    this.global.currentMessage.subscribe(message =>this.postedCoursesList = message)
    this.obj2.get_categories().subscribe(response => {
      this.Categories = response;
      // console.log(this.Categories);
      this.loaded = true;
    });
  }
  nestedsubcat(id) {
    this.obj2.get_nestedcategories(id).subscribe(response => {
      this.nestedSubCategories = response;
    });

  }
  onNoClick(): void {
    this.dialogRef.close(1);
  }

  EditCourse() {
   
    if (this.input) {
      this.http.post(
        Config.ImageUploadUrl,
        this.input, { responseType: 'text' }).subscribe(data => {
          if (data === "Sorry, not a valid Image.Sorry, only JPG, JPEG, PNG & GIF files are allowed.Sorry, your file was not uploaded.") {
            EditCourseDialogComponent.ImageUploadFailer();
          } else {
            this.course_image = data;
            console.log(this.course_image);
          

          }
        });
    }
    else {
      this.course_image = this.model.course_image;
      // }
    }
    this.ifImageUpload();
  }

  private ifImageUpload() {
    if(this.Day == false){
    
      var curent_date = moment(this.Date, "DD-MM-YYYY");

      console.log("current date", this.Date);
      // var fielddate= moment(curent_date,"DD-MM-YYYY");
      var new_date = moment(curent_date).add(this.model.end_time, 'days');
   
    }else if(this.Day == true){
var curent_date =moment(this.model.date, "DD-MM-YYYY");
var new_date = moment(curent_date).add(this.model.end_time, 'days');
    }
    // if(this.isActive == false){
    //   var sale_date = moment(this.Dates).add(this.Sales, 'days'); 
    // }
    var new_dateBuy = moment(curent_date).add(this.Sales, 'days');
console.log(this.course_id, this.model.FirstName, this.model.Price, this.course_image, this.model.skill, this.model.category, this.model.sub_category,this.model.nestedsub_category, new_dateBuy,this.model.edit_Minimum, this.model.edit_Maximum, this.isActive, this.isActives, this.edit_isBids, this.model.SalePrice,curent_date,new_date,this.Checks, this.model.ReservedPrice, this.Days,this.model.ids,'kkkk')
    this.obj.edit_course(this.course_id, this.model.FirstName, this.model.Price, this.course_image, this.model.skill, this.model.category, this.model.sub_category,this.model.nestedsub_category, new_dateBuy,this.model.edit_Minimum, this.model.edit_Maximum, this.isActive, this.isActives, this.edit_isBids, this.model.SalePrice,curent_date,new_date,this.Checks, this.model.ReservedPrice, this.Days,this.model.ids,this.model.Sales,this.model.end_time).subscribe(
      data => {
        this.dialogRef.close();
        EditCourseDialogComponent.CourseSuccess();
        this.obj.get_my_posted_courses(1).subscribe(response => {
          this.postedCoursesList = response;
          this.global.watchInfo( this.postedCoursesList);
          console.log('PostedCourse', this.postedCoursesList);
         
        });
      },
      error => {
        EditCourseDialogComponent.CourseFailure();
      }
    );
    // this.reserveds();
  }
  reserved() {
    if (this.isActive) {
      this.hide = false;
    } else {
      this.hide = true;
    }
  }

  reserveds() {
    if (this.isActives) {
      this.hides = false;
    } else {
      this.hides = true;
    }
  }
  Auctions() {
    if (this.isBids) {
      this.isBids = false;
    } else {
      this.isBids = true;
    }
  }
  edit_Auctions() {
    if (this.edit_isBidPrice) {
      this.edit_isBids = false;
    } else {
      this.edit_isBids = true;
    }
  }
  CheckReserved() {
    if (this.Checks) {
      this.Checks = false;
    }
    else {
      this.Checks = true;
    }
  }
  Auc() {
    if (this.Days) {
      this.Days = false;
    } else {
      this.Days = true;
    }
  }
  selected(cat_id) {
    this.obj2.get_sub_categories(cat_id).subscribe(response => {
      this.SubCategories = response;
      // console.log(this.SubCategories);
      this.loaded = true;
    });
  }

  static CourseSuccess() {
     swal.fire({
      type: 'success',
      title: 'Course Edited Successfully! <br> Request is sent to admin you will be notified after approval.',
      width: '512px'
    })
  }

  static CourseFailure() {
     swal.fire({
      type: 'error',
      title: 'Oops! <br>Failed to add course. Inccorrect Information!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static ImageUploadFailer() {
     swal.fire({
      type: 'error',
      title: 'Oops! <br>Something Went Wrong Please try Again!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static greaterDiscout() {
     swal.fire({
      type: 'error',
      title: 'Please review form! <br>Discount amount can not be greater than course price!',
      // showConfirmButton: false,
      width: '512px',
      // timer: 2500
    })
  }

  isClick() {
    if (this.clicked === true) {
      return this.clicked = false;
    } else {
      return this.clicked = true;
    }
  }




  static onlyNumberKey(event) {
    const charCode = (event.query) ? event.query : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    } else {
      return true;
    }
  }

  onChange(event: EventTarget) {
    this.input = new FormData();
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    this.input.append('fileToUpload', target.files[0]);
  }
}

@Component({
  selector: 'app-course-bid',
  templateUrl: './course-bid.component.html',
  styleUrls: ['../events/add-event.component.css']
})
export class CourseBidComponent implements OnInit {
  public model: any = {};

  hid = true;
  Actives = true;
  date: Date;
  count;
  time = new Date("00:00:00 GMT-0500 (EST)");


  bidamount = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$')]);

  reservedbidamountFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$')]);

  dateFormControl = new FormControl('', [
    Validators.required,
  ]);

  startTimeFormControl = new FormControl('', [
    Validators.required,
  ]);

  endTimeFormControl = new FormControl('', [
    Validators.required,
  ]);



  constructor(private obj: UploadCoursesService,
    public dialogRef: MatDialogRef<CourseBidComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {

  }
  Date;
  onSubmit(f: NgForm) {
    var curent_date = moment(this.model.date, "DD-MM-YYYY").add(1, 'days');
    var new_date = moment(curent_date, "DD-MM-YYYY").add(this.Date, 'days');
   
    this.obj.add_bid_on_course(this.model.bidamount, curent_date, new_date, this.Actives, this.model.reservedbid, this.data.BidCourse_id).subscribe(
      data => {
       
        CourseBidComponent.BidCourseSuccess();
        
      }
    );
  }

  reserved() {
    if (this.hid) {
      this.hid = false;
    }
    else {
      this.hid = true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  static BidCourseSuccess() {
     swal.fire({
      type: 'success',
      title: 'Success! <br> Bid Allowed on Course!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    });
  }
  // static InvalidInformation() {
  //    swal.fire({
  //     type: 'error',
  //     title: 'Oops! <br> Invalid Information!',
  //     showConfirmButton: false,
  //     width: '512px',
  //     timer: 2500
  //   })
  // }
  // static BidCourseFailure() {
  //    swal.fire({
  //     type: 'error',
  //     title: 'Oops! <br> Course not Approved by Admin !',
  //     showConfirmButton: false,
  //     width: '512px',
  //     timer: 2500
  //   })
  // }
  // static BidCourseFailure2() {
  //    swal.fire({
  //     type: 'error',
  //     title: 'Oops! <br> Course is already posted !',
  //     showConfirmButton: false,
  //     width: '512px',
  //     timer: 2500
  //   })
  // }

  static onlyNumberKey(event) {
    const charCode = (event.query) ? event.query : event.keyCode;
    // console.log(charCode);
    if (charCode > 31
      && (charCode < 48 || charCode > 57)) {
      return false;
    }

    return true;
  }


}
