import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Config} from '../Config';
import {BasicInfoService} from '../basic-info/basic-info.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {UploadCoursesService} from '../upload-courses/upload-courses.service';
import {PagerService} from "../paginator.service";
import {ProfileService} from "./profile.service";
import {CoursesService} from "../course/courses.service";
import swal from 'sweetalert2';
import {GlobalService} from "../global.service";
import {isPlatformBrowser} from "@angular/common";
import {MatDialog} from "@angular/material";
import {FollowUnfollowService} from "../Follow-Unfollow.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  Logedin: string;
  public GlobalWishListCourses: any;
  public GlobalCartCourses: any = [];

  public ProfileData;
  public ImageUrl =  Config.ImageUrl;
  private UserId: number;
  public coursesList: any;
  private sub: Subscription;
  public loaded = false;
  public loaded2 = false;
  pager: any = {};
  private isFollow: boolean;

  constructor(private obj: ProfileService,
              private follow_unfollow: FollowUnfollowService,
              private route: ActivatedRoute,
              private router: Router,
              private pagerService: PagerService,
              private obj2: CoursesService,
              private nav: Router,
              private global: GlobalService,
              @Inject(PLATFORM_ID) private platformId: Object,
              public dialog: MatDialog,


  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.Logedin = localStorage.getItem('loged_in');
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

    this.global.GlobalCartCourses$.subscribe(
      data => {
        if(data.length===0){
          this.GlobalCartCourses = [];
        }else{
          this.GlobalCartCourses = data;
        }
      });

    this.global.FollowOrNot$.subscribe(
      data => {
        this.isFollow = data;
      });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.UserId = +params['query'] || 1;
        this.obj.get_instructor_profile(this.UserId).subscribe(response => {
          this.ProfileData = response;
          this.isFollow = this.ProfileData.isFollowedInstructor;
          this.global.SetFollowing(this.ProfileData.isFollowedInstructor);

          console.log(this.ProfileData);
          this.loaded = true;
          // this.loaded = true;
        });
      });
    this.setPage(1);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.obj.get_instructor_courses(page, this.UserId).subscribe(response => {
      this.coursesList = response;
      // console.log(this.AllEvents.events);
      this.pager = this.pagerService.getPager(this.coursesList['totalItems'], page,10);
      this.loaded2 = true;
    });
  }
  public wishlistCourses: any=[];
  public emptyWishlist: boolean;
  public emptyCart: boolean;
  totalcarts;
  getcart(){
    
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
          this.global.getGolbalCartCourses(this.GlobalCartCourses);
          this.emptyCart = false;
        }
      });
   
  }
  openDialog2(index, course_id): void {
    if (this.Logedin === '1') {
      this.obj2.add_to_cart_no_promo(course_id).subscribe(
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
         
            this.obj2.removeFromWishlist(course_id).subscribe(
              data => {
                console.log(data);
                // this.wishlistCourses.splice(this.wishlistCourses.indexOf(this.wishlistCourses[index]),1);
                // console.log(this.wishlistCourses);
                // if (this.Logedin === '1') {
                this.obj2.get_wishlist_courses(1).subscribe(response => {
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
  //     ProfileComponent.Authenticat();
  //     this.nav.navigate(['login']);
  //   }
  // }

  onclick(index, course_id) {
    if (this.Logedin === '1') {
      this.obj2.add_wishlist(course_id).subscribe(
        data => {
          // console.log(data[0]['json'].json());
          if(data[0]['json'].json().hasOwnProperty("status")) {
            ProfileComponent.AlreadyInWishlistError();
          }
          else {
            this.GlobalWishListCourses.push(data[0]['json'].json());
            this.global.getGolbalWishListCourses(this.GlobalWishListCourses);
            ProfileComponent.wishlistSuccess();
          }

        },
        error => {
          // console.log(error);
        }
      );
    }
    else {
      ProfileComponent.Authenticat();
      this.nav.navigate(['login']);
    }
  }

  Follow_Instructor() {
    this.follow_unfollow.Follow_Unfollow(this.ProfileData.user.id,this.Logedin);
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
