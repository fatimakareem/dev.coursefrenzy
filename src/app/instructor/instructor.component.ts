import { Component, OnInit } from '@angular/core';
import {InstructorService} from './instructor.service';
import {PagerService} from "../paginator.service";
import {Config} from '../Config';
import {GlobalService} from '../global.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {ProfileService} from '../profile/profile.service';
import {CoursesService} from '../course/courses.service';


@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.scss']
})
export class InstructorComponent implements OnInit {
 public instructorlist;
  pager: any = {};

  public ImageUrl =  Config.ImageUrl;
  public loaded = false;
  public BidCourses: any;
  public page = 1 ;
  private isFollow: boolean;
public staticStorageImages = Config.staticStorageImages;
  constructor(private obj2: InstructorService, private pagerService: PagerService,private global: GlobalService,  private route: ActivatedRoute,
              private router: Router,private obj: CoursesService) {

    this.global.FollowOrNot$.subscribe(
      data => {
        this.isFollow = data;
      });
  }

  ngOnInit() {

    this.setPage3(1);
    this.get_instructor();
  }
  get_instructor(){
  this.obj.get_bid_courses(this.page).subscribe(response => {
    this.BidCourses = response;
  });
  }
  setPage3(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.obj2.get_instructor(page).subscribe(response => {
      this.instructorlist = response;
      // this.pendingCoursesList2 = response;
      console.log(this.instructorlist['Instructors']);
      // alert(this.instructorlist['Instructors']);
      // console.log(this.pendingCoursesList['courses'][1]);
      this.pager = this.pagerService.getPager(this.instructorlist['totalItems'], page,8);
      // this.loaded4 = true;
    });
  }

}
