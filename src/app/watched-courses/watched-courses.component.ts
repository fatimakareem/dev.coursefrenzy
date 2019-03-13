import {Component, Inject, OnInit, AfterContentInit, PLATFORM_ID} from '@angular/core';
// import {CoursesService} from './courses.service';
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
import {CoursesService} from "../course/courses.service";
import {CourseComponent} from "../course/course.component";
import {BuyNowService} from "../BuyNow.service";

declare const $: any;
@Component({
  selector: 'app-watched-courses',
  templateUrl: './watched-courses.component.html',
  styleUrls: ['./watched-courses.component.scss']
})
export class WatchedCoursesComponent implements OnInit {
  endofList: boolean;
  public GlobalWishListCourses: any;
  public GlobalCartCourses: any = [];

  dateFormControl = new FormControl('', [
    Validators.required,
  ]);
  public ImageUrl = Config.ImageUrl;
  public Courses: any;
  public BidCourses: any;
  loaded = false;
  loaded2 = false;
  loadedTopRated = false;
  public catImageUrl = Config.staticStorageImages;
  public StaticImageUrl = Config.ImageUrl;
  public heart= false;
  public heartClass= 'fa fa-heart-o';
  public model: any = {};
  public page = 1;
  public check;
  public Cat_Courses: any;
  public SubCat_Courses: any;
  public ProfileImage: any;
  public cat_Id = 0;
  public subcat_Id = 0;
  public AllChapters: any;
  loaded3: any;
  loaded4: any;
  loaded5: any;
  private sub: Subscription;
  public Categories: any;
  Logedin: string;
  public alreadyInCartStatus: any;
  public IsCoursesLoaded: boolean;
  selectedValue: string;
  dateVal: any = 'Ahmad';
  teacher: any;


  public options = [];

  filteredOptions: Observable<string[]>;
  public coursename = '';
  public category = '';
  public subcat = '';
  public instructorId = 0;
  public courseDate = '';
  public onSale = false;
  public endofCatList: boolean = false;
  public endofSubCatList: boolean = false;
  private enrolled: any;



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
    private buyNowService: BuyNowService,
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

    this.obj.get_mywatched_courses().subscribe(data => {
      this.Courses = data;
      console.log(this.Courses);
      this.loaded=true;
      setTimeout(function () {
        $('.slick-bids5').slick({
          infinite: true,
          slidesToShow: 5,
          slidesToScroll: 5,
          autoplay: true,
          prevArrow: '<button class="leftRs">&lt;</button>',
          nextArrow: '<button class="rightRs">&lt;</button>',
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }

          ]
        });
      }, 250);

    });

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
  buyNowClick(index, course_id): void {
    this.buyNowService.buyNow(index, course_id,this.Logedin)
  }

  enrollCourse(index, course_id): void {
    if (this.Logedin === '1') {
      this.obj.enroll_free_course(course_id).subscribe(
        data => {
          this.enrolled = data[0]['json'].json();
          if(this.enrolled.status===false) {
            WatchedCoursesComponent.EnrollmentError();
          }
          else {
            WatchedCoursesComponent.EnrollmentSuccess();
          }
        },
        error => {
          // console.log(error);
        }
      );
    }
    else {
      WatchedCoursesComponent.Authenticat();
      this.nav.navigate(['login']);
    }
  }
  static EnrollmentError() {
     swal.fire({
      type: 'error',
      title: 'Oops! <br> Error in Buy Course!',
      showConfirmButton: false,
      width: '512px',
      timer: 2000
    })
  }
  static EnrollmentSuccess() {
     swal.fire({
      type: 'success',
      title: 'Success! <br> Successfuly Purchased.',
      showConfirmButton: false,
      width: '512px',
      timer: 3000,
    });
  }

  // goToTopRatedCourses() {
  //   this.nav.navigate(['courses/top-rated']);
  // }
  public wishlistCourses: any=[];
  public emptyWishlist: boolean;
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
       swal.fire({
        type: 'error',
        title: 'Authentication Required <br> Please Login or Signup first',
        showConfirmButton: false,
        width: '512px',
        timer: 1500
      });
      this.nav.navigate(['login']);
    }
  }
  // openDialog2(index, course_id): void {
  //   if (this.Logedin === '1') {
  //     const dialogRef = this.dialog.open(AddCartDialogComponent, {
  //       width: '500px',
  //       data: { course_id: course_id,
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
    // alert(course_id);
    // alert(event.target);
    // if (!this.heart) {
    //   this.heartClass = 'fa fa-heart';
    //   this.heart = true;
    // } else {
    //   this.heartClass = 'fa fa-heart-o';
    //   this.heart = false;
    // }
    //
    // alert(index);
    // alert(course_id);
    if (this.Logedin === '1') {
      this.obj.add_wishlist(course_id).subscribe(
        data => {
          // console.log(data[0]['json'].json());
          if(data[0]['json'].json().hasOwnProperty("status")) {
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


  loadCourses() {
    this.global.CurrentPage = this.global.CurrentPage + 1;
    this.global.get_cources(this.global.CurrentPage).subscribe(
      data => {
        if (this.Courses.totalItems != this.Courses.courses.length) {
          this.Courses.courses = this.Courses.courses.concat(data.courses);
          console.log(this.Courses.courses);
          this.glb_ser['Courses'] = this.Courses;
          if (this.Courses.courses.length === this.Courses.totalItems){
            this.endofList = true;
          }
        }
        else{
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
          if (this.Cat_Courses.courses.length === this.Cat_Courses.totalItems){
            this.endofCatList = true;
          }
        }
        else{
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
          if (this.SubCat_Courses.courses.length === this.SubCat_Courses.totalItems){
            this.endofSubCatList = true;
          }
        }
        else{
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
