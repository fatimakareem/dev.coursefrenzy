import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header/header.service';
import { Config } from '../Config';
import { CourseCheckoutService } from '../course-checkout/course-checkout.service';
import { RecentlyViewedCoursesComponent } from '../courses-all/recently-viewed-courses/recently-viewed-courses.component';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { OfferPayoutDialogComponent } from '../offer-payout-dialog/offer-payout-dialog.component';

@Component({
  selector: 'app-accept-offer-activity',
  templateUrl: './accept-offer-activity.component.html',
  styleUrls: ['./accept-offer-activity.component.scss']
})
export class AcceptOfferActivityComponent implements OnInit {

  public response: any = [];
  public res: any = [];
  public check: any = [];
  Logedin: string;
  public GlobalWishListCourses: any;
  finalResult = [];
  public ImageUrl = Config.ImageUrl;
  constructor(private obj: HeaderService, private Checks: CourseCheckoutService, public dialog: MatDialog, private nav: Router, private global: GlobalService) {


    this.global.caseNumber$.subscribe(
      data => {
        this.Logedin = data;
      });
  }

  ngOnInit() {
    this.Getacceptoffer();

  }

  Getacceptoffer() {
    this.obj.accept_offer().subscribe(data => {

      this.response = data
     

    })


  }
  openDialog2(index, course_id): void {
    // alert(course_id);

    if (this.Logedin === '1') {
      const dialogRef = this.dialog.open(OfferPayoutDialogComponent, {
        width: '500px',
        data: {
          course_id: course_id,
          // CourseDetail: this.Courses
        }
      });
    } else {
      RecentlyViewedCoursesComponent.Authenticat();
      this.nav.navigate(['login']);
    }
  }

}
