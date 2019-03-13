import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {BiddingService} from '../bidding-dialog/bidding.service';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {BiddingDialogComponent} from '../bidding-dialog/bidding-dialog.component';
import {MatDialog} from '@angular/material';
import {CoursesService} from '../course/courses.service';
import {GlobalService} from '../global.service';
import {Config} from '../Config';
// import * as moment from 'moment';
import * as moment from 'moment-timezone';
@Component({
  selector: 'app-bid-history',
  templateUrl: './bid-history.component.html',
  styleUrls: ['./bid-history.component.css']
})
export class BidHistoryComponent implements OnInit {
  loaded = false;
  public bids: any;
  private BidId: number;
  public alreadyInCartStatus: any;
  private sub: Subscription;
  public SingleCourse: any = [];
  public GlobalCartCourses: any = [];
  public StaticImageUrl = Config.ImageUrl;
  public route_instructor: number;
  DateFields:any ="2018-09-09";
  new_date:any;
  TimeZone:any;
  constructor(private obj: BiddingService, private router: Router, private route: ActivatedRoute,
              private dialog: MatDialog, vRef: ViewContainerRef, private obj2: CoursesService, private global: GlobalService) {

    this.global.GlobalCartCourses$.subscribe(
      data => {
        if (data.length === 0){
          this.GlobalCartCourses = [];
        }else {
          this.GlobalCartCourses = data;
        }
      });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.BidId = +params['bid_id'] || 1;
      this.obj.get_bids(this.BidId).subscribe(response => {

        this.bids = response;


        // this.TimeZone = moment("this.new_date").tz("Asia/Karachi").format('Z');
        // var june = moment("2014-06-01T12:00:00Z");
        //  june.tz("Asia/Karachi").format('Z');
        // this.history = this.history.bidhistory;
        // console.log(this.bids);
        this.loaded = true;
      });
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BiddingDialogComponent, {
      width: '500px',
      data: { bid_id: this.BidId },
    });
  }
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
  noPromo() {
    this.obj2.add_to_cart_no_promo(this.BidId).subscribe(
      data => {
        // console.log(data[0]['json'].json());
        if(data[0]['json'].json().hasOwnProperty("status")) {
          this.alreadyInCartStatus = true;
          // AddCartDialogComponent.AlreadyInCartError();
          // this.dialogRef.close();
        }
        else {
          this.GlobalCartCourses.push(data[0]['json'].json());
          this.getcart();
          // AddCartDialogComponent.CartSuccess();
          // this.dialogRef.close();
        }
      },
      error => {
        // console.log(error);
        // AddCartDialogComponent.CartError();
      }
    );
  }
}
