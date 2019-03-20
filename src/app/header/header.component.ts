import {Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {HeaderService} from './header.service';
import {Config} from '../Config';
import {GlobalService} from '../global.service';
import {UploadCoursesService} from '../upload-courses/upload-courses.service';
import {LogoutService} from '../logout/logout.service';
import {Router} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';
import swal from 'sweetalert2'
import {SimpleGlobal} from "ng2-simple-global";
import {HomeService} from "../home/home.service";
import {CoursesService} from "../course/courses.service";
import {CourseCheckoutService} from "../course-checkout/course-checkout.service";
import {MatDialog} from "@angular/material";
import {HomeComponent} from '../home/home.component';
import {CoursesOnBidComponent} from '../courses-all/courses-on-bid/courses-on-bid.component';
import {AddCourseDialogComponent} from '../upload-courses/upload-courses.component'

declare const $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../chat/chat.component.css', '../course/course.component.css']
})
export class HeaderComponent implements OnInit {
// public nestedSubCategories:any;
public postedCoursesList:any;
  public Categories: any;
  loaded = false;
  Logedin: string = '1';
  uname;
  public wishPage = 1;
  search: string;
  searchSlider: string;
  searchCourses: string;
  IsLogedIn: boolean;
  public islogin: boolean;
  public query: any;
  public Courses: any;
  public selected: any;
  public ImageUrl1 = 'https://storage.coursefrenzy.com/images/';
  ImageUrl = Config.staticStorageImages;
  public heart= false;
  public heartClass= 'fa fa-heart-o';
  // public coursesList: any;
  // public listTitles = [];
  // public countries = [];
  // public filteredList = [];
  public userRole: string;
  getingRoleData: any;
  public wishlistCourses: any=[];
  public wishloaded: boolean = false;
  public checkoutCourses: any;
  public chekoutloaded: boolean;
  public GlobalWishListCourses:any = [];
  public GlobalCartCourses:any = [];
  public emptyWishlist: boolean;
  public emptyCart: boolean;
  public topOffer: boolean = true;
  private token: string | any;
  public BidCourses: any;
  public page = 1 ;
  public notify: any ;
  constructor(private obj: HeaderService,
              private global2: GlobalService,
              private course: CoursesService,
              private courseCheckout: CourseCheckoutService,
              private objcourses: UploadCoursesService,
              private logout: LogoutService,
              private _nav: Router,
              private glb_ser: SimpleGlobal,
              private global: GlobalService,
              private obj2: CourseCheckoutService,
              private _home: HomeService,
              public dialog: MatDialog,
              private nav: Router,
              @Inject(PLATFORM_ID) private platformId: Object ) {
    // this.islogin = this.isAuthenticated();
    if (isPlatformBrowser(this.platformId)) {
      this.Logedin = localStorage.getItem("loged_in");
    }
    this.global2.caseNumber$.subscribe(
      data => {
        this.Logedin = data;
      });




    // this.global2.topOfferGlobal$.subscribe(
    //   data => {
    //     this.topOffer = data;
    //   });
    this.global2.checkingUserRole$.subscribe(
      data => {
        this.userRole = data;
        // alert('Checking Role in Header' + data);
      });
      this.global.Categories$.subscribe(
        data => {
          this.Categories = data;
          console.log(this.Categories)
        });

    this.global2.openSearch$.subscribe(
      data => {
        this.search = data;
      });

    this.global2.openSliderSearch$.subscribe(
      data => {
        this.searchSlider = data;
      });

    this.global2.GlobalWishListCourses$.subscribe(
      data => {
        if (data.length===0){
          this.wishlistCourses = [];
        }else {
          this.wishlistCourses = data;
        }
      });

    this.global2.GlobalCartCourses$.subscribe(
      data => {
        if(data.length===0){
          this.GlobalCartCourses = [];
          // alert('Global list is going to be set empty');
        }else {
          this.GlobalCartCourses = data;
          this.totalcarts=data.totalItems;
        }
      });

    this.global2.emptyWishlistGlobal$.subscribe(
      data => {
        this.emptyWishlist = data;
      });

    this.global2.emptyCartGlobal$.subscribe(
      data => {
        this.emptyCart = data;
      });
    this.token = localStorage.getItem('Authorization');
    if(this.token!=null){
      this.global2.setGlobalToken(true);
    }else{
      this.global2.setGlobalToken(false);
    }

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
  }
  UserRole:any;
  totalcarts;
  ngOnInit() {
   
  
  

    if (this.Logedin === '1') {
      this._home.get_role().subscribe(response => {
        this.getingRoleData = response;
        this.userRole = this.getingRoleData.Role;
        // alert('Home Role' + this.UserRole);
        this.global2.checkUserRole(this.userRole);
        this.loaded = true;
      });
    }
    if (this.Logedin === '1') {
      this.obj.Notifications().subscribe(data => {
        this.notify = data;
        console.log(this.notify);
      });
    }
    if (this.Logedin === '1') {
      this.course.get_wishlist_courses(this.wishPage).subscribe(response => {
        if(response.hasOwnProperty("status")) {
          this.wishlistCourses = [];
          this.emptyWishlist = true;
        }
        else {
          this.wishlistCourses = response;
          // alert('total Wishlist Courses' + this.wishlistCourses.length);
          this.global2.getGolbalWishListCourses(this.wishlistCourses);
          this.emptyWishlist = false;
        }

      });
    }
this.getcart();
   

  }
  getcart(){
    if (this.Logedin === '1') {
      // alert('calling Checkout Courses');
      this.obj2.get_checkout_courses().subscribe(response => {
        if(response.hasOwnProperty("status")) {
          this.emptyCart = response.status;
          this.GlobalCartCourses = [];

          // alert('Checkout Courses are Empty')
        }
        else {
          this.GlobalCartCourses = response;
          this.totalcarts=response.totalItems
          this.global2.getGolbalCartCourses(this.GlobalCartCourses);
          this.emptyCart = false;
        }
      });
    }
  }
 
  openDialog(): void {
    if (localStorage.getItem("loged_in")) {
      this.nav.navigate(['/mycourses']);
      localStorage.setItem('sell','sell')
      // const dialogRef = this.dialog.open(AddCourseDialogComponent, {
      //   // width: '500px',
      //   data: this.postedCoursesList
      // });
    }
    else {
       swal.fire({
        type: 'error',
        title: 'Authentication Required <br> Please Login or Signup first',
        showConfirmButton: false,
        width: '512px',
        timer: 1500
      });
      this.nav.navigate(['/login']);
    }
   }
  onclick() {
    if (!this.heart) {
      this.heartClass = 'fa fa-heart';
      this.heart = true;
      // alert(this.heart);
    } else {
      this.heartClass = 'fa fa-heart-o';
      // alert(this.heart);
      this.heart = false;
    }
  }

  click(index, course_id) {
    if (this.Logedin === '1') {
      this.course.add_wishlist(course_id).subscribe(
        data => {
          if(data[0]['json'].json().hasOwnProperty("status")) {
            CoursesOnBidComponent.AlreadyInWishlistError();
          }
          else {
            this.wishlistCourses.splice(this.wishlistCourses.indexOf(this.wishlistCourses[index]),1);

            this.GlobalWishListCourses.push(data[0]['json'].json());
            this.global.getGolbalWishListCourses(this.GlobalWishListCourses);
            CoursesOnBidComponent.wishlistSuccess();
          }
        }
      );
      this.courseCheckout.removeFromCart(course_id).subscribe(
        data => {
          console.log(data);
          // this.wishlistCourses.splice(this.wishlistCourses.indexOf(this.wishlistCourses[index]),1);
          // console.log(this.wishlistCourses);
          // if (this.Logedin === '1') {
          this.courseCheckout.get_checkout_courses().subscribe(response => {
            if (response.hasOwnProperty("status")) {
              this.emptyCart = true;
              this.global.getemptyCartGlobal(this.emptyCart);
            }
            else {
              this.GlobalCartCourses = response;
              // if (this.GlobalCartCourses.hasOwnProperty("status")){
              //   console.log('status found')
              // }
              console.log('Checkout' + this.GlobalCartCourses);
              this.global.getGolbalCartCourses(this.GlobalCartCourses);
              this.emptyCart = false;
              this.global.getemptyCartGlobal(this.emptyCart);
            }

          });
          // }
        });

    }
    else {
      CoursesOnBidComponent.Authenticat();
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
      timer: 2500,
    });
  }

  isAuthenticated() {
    // alert("dsfd")
    // localStorage.clear();
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('username');
      this.uname = user;
      // console.log(this.uname)
      if (user !== '' && user) {
        return this.IsLogedIn = true;
      } else {
        return this.IsLogedIn = false;
      }
    }
  }
  offerTopSetFalse(){
    this.topOffer = false;
    this.global2.gettopOfferGlobal(this.topOffer);


    this.global2.topOfferGlobal$.subscribe(
      data => {
        this.topOffer = data;
      });

    // alert('Top Offer After Cross '+ this.topOffer);

  }
  logFunction() {

    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
    this.GlobalCartCourses = [];
    this.global2.getGolbalCartCourses(this.GlobalCartCourses);
    this.wishlistCourses = [];
    this.global2.getGolbalWishListCourses(this.wishlistCourses);
    this.emptyWishlist = true;
    this.global2.getemptyWishlistGlobal(this.emptyWishlist);
    this.emptyCart = true;
    this.global2.getemptyCartGlobal(this.emptyCart);
    this._nav.navigate(['/']);

    // });
    if (this.Logedin === '1') {
      this.Logedin = '0';
      this.global2.publishData(this.Logedin);
      this.global2.checkUserRole(null);
      this.logSuccess();
    }
    this.global2.setGlobalToken(false);

  }

  logSuccess() {
     swal.fire({
      type: 'success',
      title: 'You have been successfully signed out from CourseFrenzy.',
      width: '512px',
      showConfirmButton: false,
      timer: 2000
    })
  }
onClick() {
  if (this.Logedin === '1') {
    this.nav.navigate(['/mycourses']);
  }
  else {
     swal.fire({
      type: 'error',
      title: 'Authentication Required <br> Please Login or Signup first',
      showConfirmButton: false,
      width: '512px',
      timer: 1500
    });
    this.nav.navigate(['/login']);
  }
}
  closeSearch() {
    if(this.searchCourses === '1' || this.searchSlider === '1') {
      this.searchCourses = '0';
      this.searchSlider = '0';
      this.search = '0';
      this.global2.searchSlider('0');
      this.global2.search('0');
      this.query = '';
      this.Courses = '';
    }
  }

  openSearch() {
    this.searchCourses = '1';
    this.search = '1';
    setTimeout(function () {
      $('#textsearch').focus();
    },200);
  }
  filter(query) {
    if (this.query !== '') {
      this.obj.search(this.query).subscribe(response => {
        this.Courses = response['results'];
        // console.log(this.Courses);
        this.loaded = true;
      });
    }
  }
  fund(event) {
    console.log(this.query)
    
    let requiredUrl = 'results'
    this._nav.navigate([requiredUrl], { queryParams: { keyword: this.query } });
    this.closeSearch();
  }
  select(item) {
    this.selected = item;
    this.searchCourses = '0';
    this.search = '0';
    this.query = '';
    this.Courses = '';
  }

  private Suggestions(query: any, number: number) {
  }

  

  openCartDialog(index, course_id): void {
    if (this.Logedin === '1') {
      this.course.add_to_cart_no_promo(course_id).subscribe(
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
            this.getcart();

             swal.fire({
              type: 'success',
              title: 'Success <br> Course Added to Cart!',
              showConfirmButton: false,
              width: '512px',
              timer: 2500
            })
         
            this.course.removeFromWishlist(course_id).subscribe(
              data => {
                console.log(data);
                // this.wishlistCourses.splice(this.wishlistCourses.indexOf(this.wishlistCourses[index]),1);
                // console.log(this.wishlistCourses);
                // if (this.Logedin === '1') {
                this.course.get_wishlist_courses(1).subscribe(response => {
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
  // openCartDialog(index, course_id): void {
  //   // if (this.Logedin === '1') {
  //     const dialogRef = this.dialog.open(AddCartDialogComponent, {
  //       width: '500px',
  //       data: { course_id: course_id,
  //               index: index
  //         // CourseDetail: this.Courses
  //       }
  //     });
  //   // } else {
  //   //   this.Authenticat();
  //   //   this.nav.navigate(['login']);
  //   // }
  // }

  removeFromWishlist(index, course_id) {
    console.log(index);
    console.log(course_id);
     swal.fire({
      title: 'Are you sure you want to remove this course from wishlist? <br> You will not be able to revert this!',
      type: 'question',
      showCancelButton: true,
      width: '512px',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm'
    }).then((result) => {
      if (result.value) {
        this.course.removeFromWishlist(course_id).subscribe(
          data => {
            console.log(data);
            console.log('index' + index);
            this.wishlistCourses.splice(this.wishlistCourses.indexOf(this.wishlistCourses[index]),1);
            console.log(this.wishlistCourses);
            HeaderComponent.removeFromWishlistSuccess();
          },
          error => {
            // console.log(error);
            HeaderComponent.removeFromWishlistError();
          }
        );
      }
    })
  }


  static removeFromWishlistSuccess() {
     swal.fire({
      type: 'success',
      title: 'Course Removed From Wishlist Successfully',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static removeFromWishlistError() {
     swal.fire({
      type: 'error',
      title: 'Oops <br> Failed to remove from wishlist!',
      // text: 'Failed to approve course!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }


  removeFromCart(index, course_id) {
    console.log(index);
    console.log(course_id);
     swal.fire({
      title: 'Are you sure you want to remove this course from cart? <br> You will not be able to revert this!',
      type: 'question',
      showCancelButton: true,
      width: '512px',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.value) {
        this.courseCheckout.removeFromCart(course_id).subscribe(
          data => {
            console.log(data);
            this.getcart();
            HeaderComponent.removeFromCartSuccess();
          },
          error => {
            // console.log(error);
            HeaderComponent.removeFromCartError();
          }
        );
      }
    })
  }


  static removeFromCartSuccess() {
     swal.fire({
      type: 'success',
      title: 'Course Removed From Cart Successfully',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static removeFromCartError() {
     swal.fire({
      type: 'error',
      title: 'Oops <br> Failed to remove from cart!',
      // text: 'Failed to approve course!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }



}
