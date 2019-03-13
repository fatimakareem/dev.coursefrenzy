import { Component, OnInit } from '@angular/core';
import {Config} from '../../Config';
import {GlobalService} from '../../global.service';
import {SimpleGlobal} from 'ng2-simple-global';
import swal from 'sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from "@angular/material";
import {CoursesService} from "../../course/courses.service";
import {BuyNowService} from "../../BuyNow.service";
// import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import {PagerService} from "../../paginator.service";

declare const $: any;

@Component({
  selector: 'app-recommended-courses',
  templateUrl: './recommended-courses.component.html',
  styleUrls: ['../../popular-courses/popular-courses.component.css']
})
export class RecommendedCoursesComponent implements OnInit {
  enrolled: any;

  public Courses: any;
  public ImageUrl = Config.ImageUrl;
  Logedin: string = '1'
  public GlobalWishListCourses: any;
  public loaded: boolean=false;
  public page = 1 ;
  public slideConfig;
  pager: any = {};

  constructor(private glb_ser: SimpleGlobal, private global: GlobalService, private nav: Router,
              public dialog: MatDialog, private obj: CoursesService, private buyNowService: BuyNowService,private pagerService: PagerService) {
    // config.max = 5;
    // config.readonly = true;

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
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.obj.get_recommendcourse(this.page).subscribe(
      data => {
        this.Courses = data;
      // console.log(this.topRatedCourses['courses']);
      this.pager = this.pagerService.getPager(this.Courses['totalItems'], page,20);
      this.loaded = true;
    });
  }
  ngOnInit() {
   this.setPage(1);
  }
  buyNowClick(index, course_id): void {
    this.buyNowService.buyNow(index, course_id,this.Logedin)
  }
  public GlobalCartCourses: any = [];
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
      RecommendedCoursesComponent.Authenticat();
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
  //     RecommendedCoursesComponent.Authenticat();
  //     this.nav.navigate(['login']);
  //   }
  // }


  onclick(index, course_id) {
    if (this.Logedin === '1') {
      this.obj.add_wishlist(course_id).subscribe(
        data => {
          // console.log(data[0]['json'].json());
          if(data[0]['json'].json().hasOwnProperty("status")) {
            RecommendedCoursesComponent.AlreadyInWishlistError();
          }
          else {
            this.GlobalWishListCourses.push(data[0]['json'].json());
            this.global.getGolbalWishListCourses(this.GlobalWishListCourses);
            RecommendedCoursesComponent.wishlistSuccess();
          }
        },
        error => {
          // console.log(error);
        }
      );
    }
    else {
      RecommendedCoursesComponent.Authenticat();
      this.nav.navigate(['login']);
    }
  }

  enrollCourse(index, course_id): void {
    if (this.Logedin === '1') {
      this.obj.enroll_free_course(course_id).subscribe(
        data => {
          this.enrolled = data[0]['json'].json();
          if(this.enrolled.status===false) {
            RecommendedCoursesComponent.EnrollmentError(this.enrolled.message);
          }
          else {
            RecommendedCoursesComponent.EnrollmentSuccess();
          }
        },
        error => {
          // console.log(error);
        }
      );
    }
    else {
      RecommendedCoursesComponent.Authenticat();
      this.nav.navigate(['login']);
    }
  }
  static EnrollmentError(message) {
     swal.fire({
      type: 'error',
      title: 'Oops! <br> ' + message,
      showConfirmButton: true,
      width: '512px',
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


  static Authenticat() {
     swal.fire({
      type: 'error',
      title: 'Authentication Required <br> Please Login or Signup first',
      showConfirmButton: false,
      width: '512px',
      timer: 1500
    });
  }

}
