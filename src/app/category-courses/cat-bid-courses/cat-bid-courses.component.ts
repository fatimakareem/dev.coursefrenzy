import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {CoursesService} from '../../course/courses.service';
import {Config} from '../../Config';
import swal from 'sweetalert2';
import {BiddingDialogComponent} from '../../bidding-dialog/bidding-dialog.component';
import {GlobalService} from '../../global.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {CoursesOnBidComponent} from "../../courses-all/courses-on-bid/courses-on-bid.component";
declare const $: any;

@Component({
  selector: 'app-cat-bid-courses',
  templateUrl: './cat-bid-courses.component.html',
  styleUrls: ['../../popular-courses/popular-courses.component.css']
})
export class CatBidCoursesComponent implements OnInit {
  category: any;

  public BidCourses: any;
  public loaded: boolean;
  public ImageUrl = Config.ImageUrl;
  Logedin: string;
  public page = 1 ;
  public heart= false;
  public slideConfig;
  public heartClass= 'fa fa-heart-o';
  public GlobalWishListCourses: any=[];

  constructor(private obj: CoursesService,
              private global: GlobalService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              @Inject(PLATFORM_ID) private platformId: Object,
              private nav: Router
  ) {
    this.global.caseNumber$.subscribe(
      data => {
        this.Logedin = data;
      });
    this.global.catName$.subscribe(
      data => {
        this.category = data;
      });

    this.global.GlobalWishListCourses$.subscribe(
      data => {
        if (data.length===0){
          this.GlobalWishListCourses = [];
        }else {
          this.GlobalWishListCourses = data;
        }
      });

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
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
  ]};


  }
  category_id;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.category_id = +params['cat_id'] || 1;
      this.obj.get_bid_courses_by_category(this.page,this.category_id).subscribe(response => {
        this.BidCourses = response;
        if(this.BidCourses.bids.length>0){
          this.loaded = true;
        }
      });
    })
  
  }

  onclick(index, course_id) {
    if (this.Logedin === '1') {
      this.obj.add_wishlist(course_id).subscribe(
        data => {
          if(data[0]['json'].json().hasOwnProperty("status")) {
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
