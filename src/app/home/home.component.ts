import {Component, OnInit,AfterContentInit, OnDestroy, PLATFORM_ID, Inject} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {HomeService} from './home.service';
import {GlobalService} from '../global.service';
import {CoursesService} from '../course/courses.service';
import {Config} from '../Config';
import swal from 'sweetalert2';
import {BiddingDialogComponent} from '../bidding-dialog/bidding-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog,MatDialogRef} from '@angular/material';
import { BuyNowService } from '../BuyNow.service';
import {NgForm} from '@angular/forms';
import {FormControl, NgModel, Validators, ReactiveFormsModule} from '@angular/forms';
import {HeaderService} from '../header/header.service';
import {SimpleGlobal} from "ng2-simple-global";
import { BuynowDialogComponent } from '../buynow-dialog/buynow-dialog.component';
import { AcceptOfferDialogComponent } from '../accept-offer-dialog/accept-offer-dialog.component';
import {CourseCheckoutService} from "../course-checkout/course-checkout.service";

// import { HomeSliderEidtDialogComponent } from './.component';
// declare const $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  IsLogedIn: boolean;
  islogin: boolean;
  public SliderContent: any;
  // public UserRole: any;
  public Categories: any;
  model: any;
  ImageUrl_storage = Config.staticStorageImages;
  search: string;
  searchSlider: string;
  public userRole: string;
  private isAdmin: boolean;
  getingRoleData: any;
  public UserRole: any;
  checkLogin: string = '1';
  public BidCourses: any;
  public courses:any;
  public openHeart  = 'fa fa-heart-o';
  public fillHeart  = 'fa fa-heart';
  public loaded: boolean;
  public ImageUrl = Config.ImageUrl;
  Logedin: string;
  public page = 1 ;
  public heart= false;
  public heartClass= 'fa fa-heart-o';
  public data:any;
  public GlobalWishListCourses: any= [];
  public slideConfig;
 public slide:{
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  dots: false,
  prevArrow: '<button class="leftRs">&lt;</button>',
  nextArrow: '<button class="rightRs">&lt;</button>',
  responsive: [
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
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
      breakpoint: 605,
      settings: {
        slidesToShow: 2,
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

  ]
 };
 public trendingNowCourses: any=[];
 private enrolled: any;
 public topRatedCourses: any;
 public Courses: any;
 public showrecent: boolean;
 constructor( @Inject(PLATFORM_ID) private platformId: Object, private obj: 
  HomeService,private obj_CoursesService: CoursesService,private nav: Router,
  private route: ActivatedRoute,private obj2: HeaderService, private buyNowService: BuyNowService,private dialog: MatDialog, private router: Router, 
  private global: GlobalService,private glb_ser: SimpleGlobal,  private obj3: CourseCheckoutService,) {
   

    this.obj_CoursesService.get_all().subscribe(response => {
      this.data = response;
      // this.loaded = true;
            this.loaded = true;
            // $('.homeSlider').fadeOut(0);
            if (this.data) {
             this.slideConfig =  {
                  infinite: true,
                  slidesToShow: 5,
                  slidesToScroll: 5,
                  autoplay: false,
                  dots: false,
                  prevArrow: '<button class="leftRs">&lt;</button>',
                  nextArrow: '<button class="rightRs">&lt;</button>',
                  responsive: [
                    {
                      breakpoint: 1025,
                      settings: {
                        slidesToShow: 4,
                        slidesToScroll: 3,
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
                      breakpoint: 605,
                      settings: {
                        slidesToShow: 2,
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
      
                  ]
              };
            }
           
          });

this.obj2.get_categories().subscribe(response => {
  this.Categories = response;
  this.global.getCategories(this.Categories);
  // this.loaded = true;
        this.loaded = true;
        this.slideConfig = {
          infinite: true,
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
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 605,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]};
      });

 
    this.global.caseNumber$.subscribe(
      data => {
        this.checkLogin = data;
      });
    this.global.checkingUserRole$.subscribe(
      data => {
        this.UserRole = data;
        // alert('Geting DAta From Shared Service' + this.UserRole);
      });
      this.global.caseNumber$.subscribe(
        data => {
          this.Logedin = data;
        });
  
      this.global.GlobalWishListCourses$.subscribe(
        data => {
          if (data.length===0){
            this.GlobalWishListCourses = [];
          }else {
            this.GlobalWishListCourses = data;
          }
        });
        if (this.Logedin === '1') {
        this.obj_CoursesService.get_recommendcourse(this.page).subscribe(
          data => {
            this.Courses = data;
          
            this.slideConfig = {
              infinite: true,
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
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 605,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]};
        
          });
          this.obj_CoursesService.get_recent_cources(1).subscribe(response => {
            if(response.hasOwnProperty("status")){
              this.courses = [];
              this.showrecent = false;
              this.global.setShowRecent(false);
            }else {
              this.courses = response;
              this.showrecent = true;
              this.global.setShowRecent(true);
             
            }
           
            this.slideConfig = {
              infinite: true,
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
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 605,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]};
          
          });}
  }
  upperhome;
  ngOnInit() {
    
if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('home', 'true');
    }

    if (this.checkLogin === '1') {
      this.obj.get_role().subscribe(response => {
        this.getingRoleData = response;
        this.UserRole = this.getingRoleData.Role;
        // alert('Home Role' + this.UserRole);
        this.global.checkUserRole(this.UserRole);
        this.loaded = true;
      });
    }


    
  }

  openSearch() {
    // this.global.mainSearchCourses = 1;
    this.global.searchSlider('1');
    this.global.search('1');
    // this.search = '1';
    setTimeout(function () {
      // $('#textsearch').focus();
    }, 200);
  }
  isAuthenticated() {
    if (isPlatformBrowser(this.platformId)) {
      const user = sessionStorage.getItem('currentUser');

      if (user !== '' && user) {
        return true;
      } else {
        return false;
      }
    }
  }

  logFunction() {
    if (isPlatformBrowser(this.platformId)) {
      this.Logedin = localStorage.getItem('login');
      this.global.publishData(0);
      
    }
  
  }
 
  
  buyNowClick(index, course_id): void {
    if(this.Logedin === '1'){
    this.obj_CoursesService.buyNowcheck(index, course_id,this.Logedin).subscribe(
      data => {
        // alert(data.message)
       if(this.Logedin === '1' && data.message=="Course is already in your My Courses"){
         swal.fire({
          type: 'error',
          title: 'You Already Bought this course',
          showConfirmButton: false,
          width: '512px',
          timer: 1500
        });
       }
    else if (this.Logedin === '1' && data.message != "Course is already in your My Courses") {
      const dialogRef = this.dialog.open(BuynowDialogComponent, {
        width: '500px',
        data: { course_id: course_id,
          // CourseDetail: this.Courses
        }
      });
    } else {
     
         swal.fire({
          type: 'error',
          title: 'Authentication Required <br> Please Login or Signup first',
          showConfirmButton: false,
          width: '512px',
          timer: 1500
        });
      
      this.nav.navigate(['login']);
    }})}
    else{
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
  public emptyCart: boolean;
  public wishlistCourses: any=[];
  public emptyWishlist: boolean;
  public GlobalCartCourses: any = [];
  totalcarts;
  getcart(){
    if (this.Logedin === '1') {
      // alert('calling Checkout Courses');
      this.obj3.get_checkout_courses().subscribe(response => {
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
  }
  openDialog3(index, course_id): void {
    if (this.Logedin === '1') {
      this.obj_CoursesService.add_to_cart_no_promo(course_id).subscribe(
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
            this.wishlistCourses.splice(this.wishlistCourses.indexOf(this.wishlistCourses[course_id]),1);
            console.log(data[0]['json'].json())
            this.getcart()
             swal.fire({
              type: 'success',
              title: 'Success <br> Course Added to Cart!',
              showConfirmButton: false,
              width: '512px',
              timer: 2500
            })
         
            this.obj_CoursesService.removeFromWishlist(course_id).subscribe(
              data => {
                console.log(data);
                // this.wishlistCourses.splice(this.wishlistCourses.indexOf(this.wishlistCourses[index]),1);
                // console.log(this.wishlistCourses);
                // if (this.Logedin === '1') {
                this.obj_CoursesService.get_wishlist_courses(1).subscribe(response => {
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
  
  goToTopRatedCourses() {
    this.nav.navigate(['courses/top-rated']);
  }
  bidcourse(){
    alert('hello')
    this.nav.navigate(['/bid-courses']);

  }
  enrollCourse(index, course_id): void {
    if (this.Logedin === '1') {
      this.obj_CoursesService.enroll_free_course(course_id).subscribe(
        data => {
          this.enrolled = data[0]['json'].json();
          if(this.enrolled.status===false) {
            HomeComponent.EnrollmentError();
          }
          else {
            HomeComponent.EnrollmentSuccess();
          }
        },
        error => {
          // console.log(error);
        }
      );
    }
    else {
      HomeComponent.Authenticat();
      this.nav.navigate(['login']);
    }
  }

  static EnrollmentError() {
     swal.fire({
      type: 'error',
      title: 'You Already Enrolled This Course.',
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
  onclick(index, course_id,inwhishlist) {
   
    if (this.Logedin === '1') {
      if(inwhishlist=='true'){
        HomeComponent.AlreadyInWishlistError();
      }else{

        this.obj_CoursesService.add_wishlist(course_id).subscribe(
          data => {
            console.log(data);
            if(data[0]['json'].json().hasOwnProperty("status")) {
               swal.fire({
                type: 'warning',
                title: 'Oops! <br> This course already exists in your courses!',
                showConfirmButton: false,
                width: '512px',
                timer: 2500
              })
            }
            else {
              this.GlobalWishListCourses.push(data[0]['json'].json());
              this.global.getGolbalWishListCourses(this.GlobalWishListCourses);
              HomeComponent.wishlistSuccess();
            }
          }
        );
      }
    }
    else {
      HomeComponent.Authenticat();
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
      // position: 'top-end'
    });
  }
  AcceptDialog(id): void {
    if (this.Logedin == '1') {
      const dialogRef = this.dialog.open(AcceptOfferDialogComponent, {
        width: '500px',
        data: { id: id }
      });
    } else {
      HomeComponent.Authenticat();
      this.nav.navigate(['login']);
    }

  }

  openDialog2(bid_id): void {
    if (this.Logedin == '1') {
      const dialogRef = this.dialog.open(BiddingDialogComponent, {
        width: '500px',
        data: { bid_id: bid_id }
      });
    } else {
      HomeComponent.Authenticat();
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


  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('home', 'false');
    }
  }
}

