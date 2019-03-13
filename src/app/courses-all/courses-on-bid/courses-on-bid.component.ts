import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CoursesService } from '../../course/courses.service';
import { Config } from '../../Config';
import swal from 'sweetalert2';
import { BiddingDialogComponent } from '../../bidding-dialog/bidding-dialog.component';
import { GlobalService } from '../../global.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
// import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { PagerService } from "../../paginator.service";
import { BuynowDialogComponent } from '../../buynow-dialog/buynow-dialog.component';
import { AcceptOfferDialogComponent } from '../../accept-offer-dialog/accept-offer-dialog.component';


declare const $: any;

@Component({
  selector: 'app-courses-on-bid',
  templateUrl: './courses-on-bid.component.html',
  styleUrls: ['../../popular-courses/popular-courses.component.css']
})
export class CoursesOnBidComponent implements OnInit {
  public BidCourses: any;
  pager: any = {};

  public openHeart = 'fa fa-heart-o';
  public fillHeart = 'fa fa-heart';
  public loaded: boolean;
  public ImageUrl = Config.ImageUrl;
  Logedin: string;
  public page = 1;
  public heart = false;
  public heartClass = 'fa fa-heart-o';
  public GlobalWishListCourses: any = [];
  public slideConfig;
  constructor(private obj: CoursesService,
    private global: GlobalService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object, private pagerService: PagerService,
    private nav: Router,
    // config: NgbRatingConfig
  ) {
    // config.max = 5;
    // config.readonly = true;
    this.global.caseNumber$.subscribe(
      data => {
        this.Logedin = data;
      });

    this.global.GlobalWishListCourses$.subscribe(
      data => {
        if (data.length === 0) {
          this.GlobalWishListCourses = [];
        } else {
          this.GlobalWishListCourses = data;
        }
      });
  }
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.obj.get_bid_courses(this.page).subscribe(response => {
      this.BidCourses = response;
      // console.log(this.topRatedCourses['courses']);
      this.pager = this.pagerService.getPager(this.BidCourses['totalItems'], page, 20);
      this.loaded = true;
    });
  }
  ngOnInit() {
    this.setPage(1);

  }
  buyNowClick(index, course_id): void {
    if (this.Logedin === '1') {
      this.obj.buyNowcheck(index, course_id, this.Logedin).subscribe(
        data => {
          // alert(data.message)
          if (this.Logedin === '1' && data.message == "Course is already in your My Courses") {
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
              data: {
                course_id: course_id,
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
          }
        })
    }
    else {
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
  AcceptDialog(id): void {
    if (this.Logedin == '1') {
      const dialogRef = this.dialog.open(AcceptOfferDialogComponent, {
        width: '500px',
        data: { id: id }
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
    }

  }
  onclick(index, course_id) {
    if (this.Logedin === '1') {
      this.obj.add_wishlist(course_id).subscribe(
        data => {
          console.log(data);
          if (data[0]['json'].json().hasOwnProperty("status")) {
            CoursesOnBidComponent.AlreadyInWishlistError();
          }
          else {
            this.GlobalWishListCourses.push(data[0]['json'].json());
            this.global.getGolbalWishListCourses(this.GlobalWishListCourses);
            CoursesOnBidComponent.wishlistSuccess();
          }
        }
      );
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
      timer: 2000,
      position: 'top-end'
    });
  }


  openDialog2(bid_id): void {
    if (this.Logedin == '1') {
      const dialogRef = this.dialog.open(BiddingDialogComponent, {
        width: '500px',
        data: { bid_id: bid_id }
      });
    } else {
      CoursesOnBidComponent.Authenticat();
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


}
