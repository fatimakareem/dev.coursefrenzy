import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {HeaderService} from "../header/header.service";
import {CoursesService} from "../course/courses.service";
import {CoursesOnBidComponent} from '../courses-all/courses-on-bid/courses-on-bid.component';
import {BiddingDialogComponent} from '../bidding-dialog/bidding-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import swal from 'sweetalert2';
import {GlobalService} from '../global.service';
import {CatTopRatedCoursesComponent} from '../category-courses/cat-top-rated-courses/cat-top-rated-courses.component';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {
  public Categories: any;
  public topRatedCoursesviaCategories: any;
  public ImageUrl = 'https://storage.coursefrenzy.com/final/';
  public showCourses: boolean = true;
  Logedin: string;
  private route: ActivatedRoute;
  public GlobalWishListCourses: any= [];
  private category: any;
  public topRatedCourses: any;
  public loaded: boolean = false;
  constructor(private obj2: HeaderService,
              private obj: CoursesService,
              private nav: Router,
              private dialog: MatDialog,
              private global: GlobalService,
              @Inject(PLATFORM_ID) private platformId: Object) {
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

  ngOnInit() {
    this.obj2.get_categories().subscribe(response => {
          this.Categories = response;
        });
        this.obj.get_top_rated_courses_via_cat(1,2).subscribe(response => {
          // console.log(response);
          if (this.topRatedCoursesviaCategories===[]){
            this.showCourses = false;
            // alert('Show Courses are going to set false');
          }else{
            this.topRatedCoursesviaCategories = response;
            // console.log(this.topRatedCoursesviaCategories['courses']);
          }
        });
  //   this.global.catName$.subscribe(
  //     data => {
  //       this.category = data;
  //       this.obj.get_top_rated_courses_via_cat(1,this.category.id).subscribe(response => {
  //         this.topRatedCourses = response;
  //         // console.log("Top rated"+this.topRatedCourses['courses'].course[0]);
  //         if(this.topRatedCourses['courses'].length>0){
  //           // this.loaded = true;
  //         }
  // });
  //     });
  }
  public wishlistCourses: any=[];
  public emptyWishlist: boolean;
  public GlobalCartCourses: any = [];
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
  //     CatTopRatedCoursesComponent.Authenticat();
  //     this.nav.navigate(['login']);
  //   }
  // }
  onclick(index, course_id) {
    if (this.Logedin === '1') {
      this.obj.add_wishlist(course_id).subscribe(
        data => {
          // console.log(data[0]['json'].json());
          if(data[0]['json'].json().hasOwnProperty("status")) {
            CatTopRatedCoursesComponent.AlreadyInWishlistError();
          }
          else {
            this.GlobalWishListCourses.push(data[0]['json'].json());
            this.global.getGolbalWishListCourses(this.GlobalWishListCourses);
            CatTopRatedCoursesComponent.wishlistSuccess();
          }
        },
        error => {
          // console.log(error);
        }
      );
    }
    else {
      CatTopRatedCoursesComponent.Authenticat();
      this.nav.navigate(['login']);
    }
  }
   Authenticat() {
     swal.fire({
      type: 'error',
      title: 'Authentication Required <br> Please Login or Signup first',
      showConfirmButton: false,
      width: '512px',
      timer: 1500
    });
  }
  AlreadyInWishlistError() {
     swal.fire({
      type: 'warning',
      title: 'Oops! <br> This course already exists in your wishlist!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

   wishlistSuccess() {
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
