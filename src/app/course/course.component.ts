import { Component, OnInit, Inject, AfterContentInit, PLATFORM_ID } from '@angular/core';
import { CoursesService } from './courses.service';
import { Config } from '../Config';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import { BiddingDialogComponent } from '../bidding-dialog/bidding-dialog.component';

import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../home/home.service';
import { isPlatformBrowser } from '@angular/common';
import { GlobalService } from '../global.service';
import swal from 'sweetalert2';
import { HeaderService } from '../header/header.service';
import { SimpleGlobal } from 'ng2-simple-global';
import { PagerService } from '../paginator.service';

import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

declare const $: any;
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
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
  public ImageUrl = Config.api2;
  public catImageUrl = Config.staticStorageImages;
  public StaticImageUrl = Config.ImageUrl;
  public heart = false;
  public heartClass = 'fa fa-heart-o';
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
    { value: '10$-20$', viewValue: '10$-20$' },
    { value: '20$-50$', viewValue: '20$-50$' },
    { value: '50$-100$', viewValue: '50$-100$' },
    { value: '100$-150', viewValue: '100$-150' },
    { value: '150$-200$', viewValue: '150$-200$' },
    { value: '200$-300$', viewValue: '200$-300$' }
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
  slideConfig = {
    infinite: false,
    speed: 900,
    autoplay: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    prevArrow: '<button class="leftRs">&lt;</button>',
    nextArrow: '<button class="rightRs">&lt;</button>',
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true
        }
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true
        }
      }
]};
  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
  pager: any = {};
  // public carouselOne: NgxCarousel;

  constructor(
    private pagerService: PagerService,
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
        if (data.length === 0) {
          this.GlobalWishListCourses = [];
        } else {
          this.GlobalWishListCourses = data;
        }
      });

    this.global.GlobalCartCourses$.subscribe(
      data => {
        if (data.length === 0) {
          this.GlobalCartCourses = [];
        } else {
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
  courses(page: number) {
    if(this.level || this.price || this.rate){
      if (page < 1 || page > this.pager.totalPages) {
        return;
      }
      this.obj.search(this.level,this.price,this.rate,page).subscribe(data => {
        this.result = data.courses;
        this.total=data.totalItems
        console.log(this.result);
        this.pager = this.pagerService.getPager(this.total, page, 10);
      });
    
  }
  }
 
  pageno(page) {
    this.page = page;
  }
  total;
 level="ALL";
 price="ALL";
 rate="ALL";
  checked1(event) {
    if (event.target.checked == true) {
        console.log(event.target.checked)
        this.level = "ALL";
       this.courses(1)
    }
   
}
checked2(event) {
  if (event.target.checked == true) {
      console.log(event.target.checked)
      this.level = "B";
     this.courses(1)
  }
 
}
checked3(event) {
  if (event.target.checked == true) {
      console.log(event.target.checked)
      this.level = "I";
     this.courses(1)
  }
 
}
checked4(event) {
  if (event.target.checked == true) {
      console.log(event.target.checked)
      this.level = "A";
     this.courses(1)
  }
 
}
checked9(event) {
  if (event.target.checked == true) {
      console.log(event.target.checked)
      this.rate = "ALL";
     this.courses(1)
  }
 
}
checked8(event) {
  if (event.target.checked == true) {
      console.log(event.target.checked)
      this.rate = "1.0-2.0";
     this.courses(1)
  }
 
}
checked7(event) {
  if (event.target.checked == true) {
      console.log(event.target.checked)
      this.rate = "2.0-3.0";
     this.courses(1)
  }
}
checked6(event) {
  if (event.target.checked == true) {
      console.log(event.target.checked)
      this.rate = "3.0-4.0";
     this.courses(1)
  }
}
checked5(event) {
  if (event.target.checked == true) {
      console.log(event.target.checked)
      this.rate = "4.0-5.0";
     this.courses(1)
  }
}
checked10(event) {
  if (event.target.checked == true) {
      console.log(event.target.checked)
      this.price = "ALL";
     this.courses(1)
  }
}
checked11(event) {
  if (event.target.checked == true) {
      console.log(event.target.checked)
      this.price = "PAID";
     this.courses(1)
  }
}
checked12(event) {
  if (event.target.checked == true) {
      console.log(event.target.checked)
      this.price = "FREE";
     this.courses(1)
  }
}

  public SlideConfig;
  ngOnInit() {
    this.courses(1);
    this.obj2.get_categories().subscribe(response => {
      this.Categories = response;
      this.loaded = true;
      this.loaded = true;
      // $('.homeSlider').fadeOut(0);
      // if (this.Categories) {
      //   // this.slideConfig = 

      // }
      // $('.homeSlider').fadeIn(500).delay(200);
    });

    this.obj.get_top_rated_courses(1).subscribe(response => {
      this.topRatedCourses = response;
      console.log(this.topRatedCourses['courses']);
      this.loadedTopRated = true;
    });


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
      if (this.subcat_Id > 0) {
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



    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }

  openDialog(bid_id): void {
    if (this.Logedin === '1') {
      const dialogRef = this.dialog.open(BiddingDialogComponent, {
        width: '500px',
        data: { bid_id: bid_id }
      });
    } else {
      CourseComponent.Authenticat();
      this.nav.navigate(['login']);
    }
  }

  public emptyCart: boolean;
  totalcarts;
  getcart(){
    
      // alert('calling Checkout Courses');
      this.obj.get_checkout_courses().subscribe(response => {
        if(response.hasOwnProperty("status")) {
          this.emptyCart = response.status;
          this.GlobalCartCourses = [];

          // alert('Checkout Courses are Empty')
        }
        else {
          this.GlobalCartCourses = response;
          this.totalcarts=response.totalItems
          this.global.getGolbalCartCourses(this.GlobalCartCourses);
          this.emptyCart = false;
        }
      });
   
  }
  buyNow(index, course_id): void {
    if (this.Logedin === '1') {
      this.obj.add_to_cart_no_promo(course_id).subscribe(
        data => {
          // console.log(data[0]['json'].json());
          if (data[0]['json'].json().hasOwnProperty("status")) {
            this.alreadyInCartStatus = true;
            CourseComponent.AlreadyInCartError();
            this.nav.navigate(['/checkout']);
          }
          else {
            this.GlobalCartCourses.push(data[0]['json'].json());
           this.getcart();
            CourseComponent.buySuccess();
            this.nav.navigate(['/checkout']);
          }
        },
        error => {
          // console.log(error);
          CourseComponent.buyError();
        }
      );

    } else {
      CourseComponent.Authenticat();
      this.nav.navigate(['login']);
    }
  }


  static buySuccess() {
     swal.fire({
      type: 'success',
      title: 'Success! <br> Pay for the course and purchase it!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static buyError() {
     swal.fire({
      type: 'error',
      title: 'Oops <br> Failed to add to Cart!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static AlreadyInCartError() {
     swal.fire({
      type: 'warning',
      title: 'Oops! <br> This course already exists in your cart!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  goToTopRatedCourses() {
    this.nav.navigate(['courses/top-rated']);
  }
  public wishlistCourses: any=[];
  public emptyWishlist: boolean;
  openDialog2(index, course_id): void {
    if (this.Logedin === '1') {
      this.obj.add_to_cart_no_promo(course_id).subscribe(
        data => {
          // console.log(data[0]['json'].json());
          if(data[0]['json'].json().hasOwnProperty("status")) {
         
             swal.fire({
              type: 'warning',
              title: 'Oops! <br> This course already exists in your cart!',
              showConfirmButton: false,
              width: '512px',
              timer: 2500
            })
          
          } else {
            this.wishlistCourses.splice(this.wishlistCourses.indexOf(this.wishlistCourses[index]),1);
            this.GlobalCartCourses.push(data[0]['json'].json());
         this.getcart();
             swal.fire({
              type: 'success',
              title: 'Success <br> Course Added to Cart!',
              showConfirmButton: false,
              width: '512px',
              timer: 2500
            })
         
            this.obj.removeFromWishlist(course_id).subscribe(
              data => {
                console.log(data);
                // this.wishlistCourses.splice(this.wishlistCourses.indexOf(this.wishlistCourses[index]),1);
                // console.log(this.wishlistCourses);
                // if (this.Logedin === '1') {
                this.obj.get_wishlist_courses(1).subscribe(response => {
                  if(!response.status){
  
                  }
                  if(response.hasOwnProperty("status")) {
                    this.wishlistCourses = [];
                    this.emptyWishlist = true;
                  }
                  else {
                    this.wishlistCourses = response;
                    // alert('total Wishlist Courses' + this.wishlistCourses.length);
                    this.global.getGolbalWishListCourses(this.wishlistCourses);
                    this.emptyWishlist = false;
                  }
  
                });
                // }
              });
          }
  
        },
        error => {
          // console.log(error);
       
             swal.fire({
              type: 'error',
              title: 'Oops <br> Failed to add to Cart!',
              showConfirmButton: false,
              width: '512px',
              timer: 2500
            })
          }
       
      );
  
    } else {
      CourseComponent.Authenticat();
      this.nav.navigate(['login']);
    }
  }
  // openDialog2(index, course_id): void {
  //   if (this.Logedin === '1') {
  //     const dialogRef = this.dialog.open(AddCartDialogComponent, {
  //       width: '500px',
  //       data: {
  //         course_id: course_id,
  //         // CourseDetail: this.Courses
  //       }
  //     });
  //   } else {
  //     CourseComponent.Authenticat();
  //     this.nav.navigate(['login']);
  //   }
  // }

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
          // console.log(data[0]['json'].json());
          if (data[0]['json'].json().hasOwnProperty("status")) {
            CourseComponent.AlreadyInWishlistError();
          }
          else {
            this.GlobalWishListCourses.push(data[0]['json'].json());
            this.global.getGolbalWishListCourses(this.GlobalWishListCourses);
            CourseComponent.wishlistSuccess();
          }

        },
        error => {
          // console.log(error);
        }
      );
    }
    else {
      CourseComponent.Authenticat();
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

  // onSubmit(course_id) {
  //   // alert(course_id);
  //   this.obj.add_wishlist(course_id).subscribe(
  //     data => {
  //       // console.log(data);
  //     },
  //     error => {
  //       // console.log(error);
  //     }
  //   );
  // }
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
  // selected2(range) {
  //   console.log(range);
  //   if (range === '10$-20$') {
  //      this.startprice = 10;
  //     this.endprice = 20;
  //   }
  //   if (range === '20$-50$') {
  //     this.startprice = 20;
  //     this.endprice = 50;
  //   }
  //   if (range === '20$-50$') {
  //     this.startprice = 20;
  //     this.endprice = 50;
  //   }
  //   if (range === '50$-100$') {
  //     this.startprice = 50;
  //     this.endprice = 100;
  //   }
  //   if (range === '100$-150$') {
  //     this.startprice = 100;
  //     this.endprice = 150;
  //   }
  //   if (range === '150$-200$') {
  //     this.startprice = 150;
  //     this.endprice = 200;
  //   }
  //   if (range === '200$-300$') {
  //     this.startprice = 200;
  //     this.endprice = 300;
  //   }
  //   alert( this.startprice);
  //   alert( this.endprice);
  //   this.SearchingFilter();
  // }

  selectrange1(range1) {
    this.startprice = range1;
    this.SearchingFilter();
  }
  selectrange2(range2) {
    this.endprice = range2;
    this.SearchingFilter();
  }

  SearchingFilter() {
    console.log(this.coursename, this.startprice, this.endprice, this.category, this.subcat)
    this.obj.filterd(this.coursename, this.startprice, this.endprice, this.category, this.subcat).subscribe(data => {
      console.log(data);
      this.result = data['Results'];
      // this.pager = this.page.getPager(data['Total Result']);
      // this.router.navigate([''])

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
  loadCourses() {
    this.global.CurrentPage = this.global.CurrentPage + 1;
    this.global.get_cources(this.global.CurrentPage).subscribe(
      data => {
        if (this.Courses.totalItems != this.Courses.courses.length) {
          this.Courses.courses = this.Courses.courses.concat(data.courses);
          console.log(this.Courses.courses);
          this.glb_ser['Courses'] = this.Courses;
          if (this.Courses.courses.length === this.Courses.totalItems) {
            this.endofList = true;
          }
        }
        else {
          console.log("there are no More Courses in List");
          CourseComponent.noMoreCoursesError();
        }
      });
  }

  loadMoreCatCourses() {
    this.global.CurrentPage = this.global.CurrentPage + 1;
    this.global.get_cources(this.global.CurrentPage).subscribe(
      data => {
        if (this.Cat_Courses.totalItems != this.Cat_Courses.courses.length) {
          this.Cat_Courses.courses = this.Courses.courses.concat(data.courses);
          console.log(this.Cat_Courses.courses);
          // this.Cat_Courses = this.Cat_Courses;
          if (this.Cat_Courses.courses.length === this.Cat_Courses.totalItems) {
            this.endofCatList = true;
          }
        }
        else {
          console.log("there are no More Courses in List");
          CourseComponent.noMoreCoursesError();
        }
      });
  }

  loadMoreSubCatCourses() {
    this.global.CurrentPage = this.global.CurrentPage + 1;
    this.global.get_cources(this.global.CurrentPage).subscribe(
      data => {
        if (this.SubCat_Courses.totalItems != this.SubCat_Courses.courses.length) {
          this.SubCat_Courses.courses = this.Courses.courses.concat(data.courses);
          console.log(this.SubCat_Courses.courses);
          // this.Cat_Courses = this.Cat_Courses;
          if (this.SubCat_Courses.courses.length === this.SubCat_Courses.totalItems) {
            this.endofSubCatList = true;
          }
        }
        else {
          console.log("there are no More Courses in List");
          CourseComponent.noMoreCoursesError();
        }
      });
  }

  static noMoreCoursesError() {
     swal.fire({
      type: 'error',
      title: 'Oops! <br> There are no more courses in this list.',
      showConfirmButton: true,
      width: '512px',
    });
  }

}


// $('.wishlist').click(function(event){
//   $(event.target).addClass('hello');
//   alert('Clicked on: ' + event.target.nodeName);
// });
