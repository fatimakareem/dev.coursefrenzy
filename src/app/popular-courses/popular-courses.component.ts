import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {CoursesService} from '../course/courses.service';
import {Config} from '../Config';
import {HomeService} from '../home/home.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material';
import {NgForm} from '@angular/forms';
import {BiddingDialogComponent} from '../bidding-dialog/bidding-dialog.component';
import {GlobalService} from '../global.service';
import swal from 'sweetalert2';
import {isPlatformBrowser} from '@angular/common';
import {SimpleGlobal} from 'ng2-simple-global';

@Component({
  selector: 'app-popular-courses',
  templateUrl: './popular-courses.component.html',
  styleUrls: ['./popular-courses.component.css']
})
export class PopularCoursesComponent implements OnInit {
  public Courses: any;
  loaded = false;
  checkLogin: number;
  public ImageUrl = Config.ImageUrl;
  public heart= false;
  public UserRole: any;
  public heartClass= 'fa fa-heart-o';
  public Courses_content: any;
  public page = 1;
  Logedin: string;
  public userRole: string;
  public IsCoursesLoaded: boolean;
  public BidCourses: any;
  loaded2;
  public GlobalWishListCourses: any;

  constructor(private obj: CoursesService,
              private obj2: HomeService,
              private global: GlobalService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              @Inject(PLATFORM_ID) private platformId: Object,
              private nav: Router,
              private glb_ser: SimpleGlobal
  ) {


    this.global.caseNumber$.subscribe(
      data => {
       // console.log('Sibling1Component-received from sibling2: ' + data);
        this.checkLogin = data;
      });

    if (isPlatformBrowser(this.platformId)) {
      this.Logedin = localStorage.getItem('loged_in');
    }
    this.global.caseNumber$.subscribe(
      data => {
        this.Logedin = data;
      });
    this.global.checkingUserRole$.subscribe(
      data => {
        this.userRole = data;
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

    if (this.glb_ser['Courses']) {
      this.Courses = this.glb_ser['Courses'];
    } else {
      this.global.get_cources(this.global.CurrentPage).subscribe(
        data => {
          this.Courses = data;
          this.glb_ser['Courses'] = this.Courses;
        });
    }

    if (this.checkLogin === 1) {
      this.obj2.get_role().subscribe(response => {
        this.UserRole = response;
           console.log(this.UserRole);
        this.loaded = true;
      });
    }

    this.obj2.get_courses_content().subscribe(response => {
      this.Courses_content = response;
    //  console.log(this.Courses_content);
      this.loaded = true;
    });
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

  openDialog(): void {
    const dialogRef = this.dialog.open(EditHomeCoursesContentComponent, {
      width: '500px'
    });
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
  openCartDialog(index, course_id): void {
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
  // openCartDialog(index, course_id): void {
  //   if (this.Logedin === '1') {
  //     const dialogRef = this.dialog.open(AddCartDialogComponent, {
  //       width: '500px',
  //       data: { course_id: course_id,
  //         // CourseDetail: this.Courses
  //       }
  //     });
  //   } else {
  //     this.Authenticat();
  //     this.nav.navigate(['login']);
  //   }
  // }


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
          if(data[0]['json'].json().hasOwnProperty("status")) {
            this.AlreadyInWishlistError();
          }
          else {
            this.GlobalWishListCourses.push(data[0]['json'].json());
            this.global.getGolbalWishListCourses(this.GlobalWishListCourses);
            this.wishlistSuccess();
          }
        },
        error => {
          // console.log(error);
        }
      );
    }
    else {
      this.Authenticat();
      this.nav.navigate(['login']);
    }
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


@Component({
  selector: 'app-edit-home-courses-content',
  templateUrl: './edit-home-courses-content.component.html',
  styleUrls: ['../events/add-event.component.css']
})
export class EditHomeCoursesContentComponent implements OnInit {
  public model: any = {};
  private loaded = false;
  public Courses_Content: any;
  public Courses_content: any;
  public id;

  constructor(private obj: HomeService, public dialogRef: MatDialogRef<EditHomeCoursesContentComponent>) {
  }

  ngOnInit() {
    this.obj.get_courses_content().subscribe(response => {
      this.Courses_content = response;
    //  console.log(this.Courses_content);
      this.loaded = true;
      this.id = this.Courses_content.id;
      this.model.heading = this.Courses_content.heading;
      this.model.description = this.Courses_content.description;
    });
  }

  onSubmit(f: NgForm) {
    this.obj.update_home_events_content(this.id, this.model.heading, this.model.description).subscribe(
      data => {
        // console.log(data);
      },
      error => {
        // console.log(error);
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}


