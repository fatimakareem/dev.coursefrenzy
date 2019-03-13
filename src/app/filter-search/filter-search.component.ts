import {Component, Inject, OnInit, AfterContentInit, PLATFORM_ID} from '@angular/core';
import {CoursesService} from '../course/courses.service';
import {Config} from '../Config';
import {FormControl, NgForm, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {MatPaginatorModule} from '@angular/material';
import {BiddingDialogComponent} from '../bidding-dialog/bidding-dialog.component';

import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {HomeService} from '../home/home.service';
import {isPlatformBrowser} from '@angular/common';
import {GlobalService} from '../global.service';
import swal from 'sweetalert2';
import {HeaderService} from '../header/header.service';
import {SimpleGlobal} from 'ng2-simple-global';

import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {CoursesOnBidComponent} from '../courses-all/courses-on-bid/courses-on-bid.component';

declare const $: any;
@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrls: ['./filter-search.component.scss']
})

export class FilterSearchComponent  implements OnInit {
  endofList: boolean;
  public GlobalWishListCourses: any;
  public GlobalCartCourses: any = [];

  dateFormControl = new FormControl('', [
    Validators.required,
  ]);
  // p: number = 1;
  // public Coursez: any;
  public Courses: any;
  public BidCourses: any;
  loaded = false;
  loaded2 = false;
  loadedTopRated = false;
  public ImageUrl = Config.ImageUrl;
  public catImageUrl = Config.staticStorageImages;
  public StaticImageUrl = Config.ImageUrl;
  public heart= false;
  public openHeart  = 'fa fa-heart-o';
  public fillHeart  = 'fa fa-heart';
  public model: any = {};
  public page = 1;
  range;
  public check;
  public Cat_Courses: any;
  public SubCat_Courses: any;
  public topRatedCourses: any;
  public ProfileImage: any;
  public cat_Id = 0;
  public subcat_Id = 0;
  public AllChapters: any;
  loaded3: any;
  loaded4: any;
  loaded5: any;
  public result;
  private sub: Subscription;
  public Categories: any;
  Logedin: string;
  public alreadyInCartStatus: any;
  public IsCoursesLoaded: boolean;
  selectedValue: string;
  dateVal: any = 'Ahmad';
  teacher: any;
  ranges = [
    {value: '10$-20$', viewValue: '10$-20$'},
    {value: '20$-50$', viewValue: '20$-50$'},
    {value: '50$-100$', viewValue: '50$-100$'},
    {value: '100$-150', viewValue: '100$-150'},
    {value: '150$-200$', viewValue: '150$-200$'},
    {value: '200$-300$', viewValue: '200$-300$'}
  ];
  minDate = new Date(2017, 0, 1);
  maxDate = new Date(2020, 0, 1);
  public SubCategories: any;
  public startprice: any;
  public endprice: any;

  myControl: FormControl = new FormControl();

  public options = [];

  filteredOptions: Observable<string[]>;
  public coursename = '';
  public category = '';
  public subcat = '';
  public instructorId;
  public courseDate = '';
  public onSale = false;
  public endofCatList: boolean = false;
  public endofSubCatList: boolean = false;

  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  // public carouselOne: NgxCarousel;

  constructor(
    private obj: CoursesService,
    private homeObj: HomeService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object,
    private global: GlobalService,
    private nav: Router,
    private obj2: HeaderService,
    private glb_ser: SimpleGlobal) {
    if (isPlatformBrowser(this.platformId)) {
      this.Logedin = localStorage.getItem('loged_in');
    }


    this.global.caseNumber$.subscribe(
      data => {
        this.Logedin = data;
      });
    this.global.Categories$.subscribe(
      data => {
        this.Categories = data;
        // console.log('ccateeeee  ', data);
        // alert('categories'+ this.)
      });
    this.global.ckeckCoursesLoaded$.subscribe(
      data => {
        // console.log('boolean  ', data);
        this.IsCoursesLoaded = data;
      });

    this.global.GlobalWishListCourses$.subscribe(
      data => {
        if (data.length===0){
          this.GlobalWishListCourses = [];
        }else {
          this.GlobalWishListCourses = data;
        }
      });

    this.global.GlobalCartCourses$.subscribe(
      data => {
        if(data.length===0){
          this.GlobalCartCourses = [];
        }else{
          this.GlobalCartCourses = data;
        }
      });

    if (this.IsCoursesLoaded) {
      // alert('CAlling Courses Function in Courses Component and IsCoursesLoaded  = ' + this.IsCoursesLoaded);

      this.global.Courses$.subscribe(
        data => {
          // console.log('global ser  ', data);
          this.Courses = data;
          // alert(this.Courses);
        });
    }

    this.global.Categories$.subscribe(
      data => {
        this.Categories = data;
      });
  }

  pageno(page) {
    this.page = page;
  }

  ngOnInit() {


    if (this.glb_ser['Courses']) {
      this.Courses = this.glb_ser['Courses'];
    } else {
      this.global.get_cources(this.global.CurrentPage).subscribe(
        data => {
          this.Courses = data;
          this.glb_ser['Courses'] = this.Courses;
        });
    }

    this.sub = this.route.params.subscribe(params => {
      this.cat_Id = +params['query'] || 0;
      // alert('category Id '+ this.cat_Id);
      this.subcat_Id = +params['query2'] || 0;
      // alert('Sub category Id '+ this.sub);


      this.obj.get_courses_subcategory(this.subcat_Id, this.page).subscribe(response => {
        this.SubCat_Courses = response;
        //  console.log(this.SubCat_Courses);
        this.loaded5 = true;
      });
      if (this.subcat_Id>0) {
        this.obj.get_courses_category(this.cat_Id, this.page).subscribe(response => {
          this.Cat_Courses = response;
          console.log(this.Cat_Courses);
          this.loaded3 = true;
        });
      }
      if (this.cat_Id < 1 && this.subcat_Id < 1) {
        this.loaded2 = true;
        this.loaded = true;
        this.obj.get_bid_courses(this.page).subscribe(response => {
          this.BidCourses = response;
          //    console.log(this.BidCourses);
          this.loaded4 = true;
        });
      }
    });

    this.obj2.get_categories().subscribe(response => {
      this.Categories = response;
      this.loaded = true;
      this.loaded = true;
    });

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }

  selected(cat_id) {
    this.obj2.get_sub_categories(cat_id).subscribe(response => {
      this.SubCategories = response;
      this.loaded = true;
    });
    this.category = cat_id;
    this.SearchingFilter();
  }
  selectedSub(Subcat_name) {
    this.subcat = Subcat_name;
    this.SearchingFilter();
  }
  clear() {
    this.coursename = '';
    // this.startprice= 0;
    // this.endprice = 0;
    this.category = '';
    this.subcat = '';
    // this.instructorId = 0;
    this.courseDate = '';
    this.onSale = false;
    this.selectedValue = '';
    this.model.coursename = '';
    this.model.category = '';
    this.model.sub_category = '';

    if (this.glb_ser['Courses']) {
      this.Courses = this.glb_ser['Courses'];
    } else {
      this.global.get_cources(this.global.CurrentPage).subscribe(
        data => {
          this.Courses = data;
          this.glb_ser['Courses'] = this.Courses;
        });
    }
  }

  selectrange1(range1){
    this.startprice= range1;
    this.SearchingFilter();
  }
  selectrange2(range2){
    this.endprice= range2;
    this.SearchingFilter();
  }

  SearchingFilter() {
    console.log(this.coursename, this.startprice, this.endprice, this.category, this.subcat)
    this.obj.filterd(this.coursename, this.startprice, this.endprice, this.category, this.subcat).subscribe(data => {
      this.result = data;
      console.log(this.result);
      // this.loaded = true;
      // console.log(this.result['Results'].course[0]);
    });



  }
  selected4(course_name) {
    this.coursename = course_name;
    this.SearchingFilter();
  }

//   getingInstructors() {
//     // console.log('Calling Teacher API' + teacher);
//     this.obj.saerchTeacher(this.teacher).subscribe(response => {
//
//       // this.options = response;
//       this.instructorId = response[0].id;
//       console.log( this.instructorId);
//       alert(this.instructorId);
//       this.SearchingFilter();
//
//     });
//
// }

  openDialog2(bid_id): void {
    if (this.Logedin == '1') {
      const dialogRef = this.dialog.open(BiddingDialogComponent, {
        width: '500px',
        data: { bid_id: bid_id }
      });
    } else {
      FilterSearchComponent.Authenticat();
      this.nav.navigate(['login']);
    }

  }

  static Authenticat() {
     swal.fire({
      type: 'error',
      title: 'Authentication Required <br> Please Login or Signup first',
      showConfirmButton: false,
      width: '512px',
      timer: 1500
    });
  }
  onclick(index, course_id) {
    if (this.Logedin === '1') {
      this.obj.add_wishlist(course_id).subscribe(
        data => {
          if(data[0]['json'].json().hasOwnProperty("status")) {
            FilterSearchComponent.AlreadyInWishlistError();
          }
          else {
            this.GlobalWishListCourses.push(data[0]['json'].json());
            this.global.getGolbalWishListCourses(this.GlobalWishListCourses);
            FilterSearchComponent.wishlistSuccess();
          }
        }
      );
    }
    else {
      FilterSearchComponent.Authenticat();
      this.nav.navigate(['login']);
    }
  }


  static AlreadyInWishlistError() {
     swal.fire({
      type: 'warning',
      title: 'Oops! <br> This course already exists in your wishlist!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static wishlistSuccess() {
     swal.fire({
      type: 'success',
      title: 'Success! <br> Successfuly added to wishlist.',
      showConfirmButton: false,
      width: '512px',
      timer: 2000,
      position: 'top-end'
    });
  }

}
