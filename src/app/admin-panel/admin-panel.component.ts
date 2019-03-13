import {Component, Inject, OnInit} from '@angular/core';
import {UploadCoursesService} from '../upload-courses/upload-courses.service';
import {Config} from '../Config';
import {NgForm} from '@angular/forms';
import {AdminPanelService} from './admin-panel.service';
import {PagerService} from "../paginator.service";
import {CoursesService} from "../course/courses.service";
import swal from 'sweetalert2';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html'
})
export class AdminPanelComponent implements OnInit {
  pendingCoursesList2: any;
  public approvedCoursesList: any = [];
  public rejectedCoursesList;
  public pendingCoursesList;
  public contactRequests;
  public partnerRequests;
  public isClassVisible = false;
  public ImageUrl = Config.ImageUrl;

  loaded = false;
  loaded2 = false;
  loaded3 = false;
  loaded4 = false;
  pager: any = {};
  public query: string;
  public NoSearchResult: boolean = false;

  constructor(private obj: CoursesService, private obj2: AdminPanelService, private pagerService: PagerService, public dialog: MatDialog) { }

  ngOnInit() {
   this.setPage(1);
   this.setPage2(1);
   this.setPage3(1);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.obj2.get_rejected_courses(page).subscribe(response => {
      this.rejectedCoursesList = response;
      console.log(this.rejectedCoursesList['courses']);
      this.pager = this.pagerService.getPager(this.rejectedCoursesList['totalItems'], page,8);
      this.loaded = true;
    });
  }

  setPage2(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.obj.get_courses(page).subscribe(response => {
      this.approvedCoursesList = response['courses'];
      console.log(this.approvedCoursesList);
      this.pager = this.pagerService.getPager(this.approvedCoursesList['totalItems'], page,8);
      this.loaded3 = true;
    });
  }

  setPage3(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.obj2.get_courses_for_approval(page).subscribe(response => {
      this.pendingCoursesList = response;
      this.pendingCoursesList2 = response;
      // console.log(this.pendingCoursesList['courses']);
      // console.log(this.pendingCoursesList['courses'][1]);
      this.pager = this.pagerService.getPager(this.pendingCoursesList['totalItems'], page,8);
      this.loaded4 = true;
    });
  }

  changefunction() {
    this.isClassVisible = true;
  }
  filter(query) {
    if (this.query !== '') {
      this.obj2.search_pending_course(this.query).subscribe(response => {
        if(this.pendingCoursesList['courses'].length===0){
          // alert('no result found');
          this.NoSearchResult = true;
          this.pendingCoursesList = this.pendingCoursesList2;
        }else{
          this.pendingCoursesList = response;
          this.NoSearchResult = false;

          console.log(this.pendingCoursesList);
          this.loaded = true;
        }
      });
    }
  }

  add_course_confirmation(id, index) {
    // console.log(index);
    // console.log(this.pendingCoursesList['courses'][index]);
     swal.fire({
      title: 'Are you sure you want to approve this course? <br> You will not be able to revert this!',
      // text: "You won't be able to revert this!",
      type: 'question',
      showCancelButton: true,
      showCloseButton: true,
      width: '512px',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve it!'
    }).then((result) => {
      if (result.value) {
        this.add_course(id, index);
      }
    })
  }


  reject_course_confirmation(id, index) {
    // console.log(index);
    // console.log(this.pendingCoursesList['courses'][index]);
     swal.fire({
      title: 'Are you sure you want to reject this course? <br> You will not be able to revert this!',
      // text: "You won't be able to revert this!",
      type: 'question',
      showCancelButton: true,
      showCloseButton: true,
      width: '512px',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reject it!'
    }).then((result) => {
      if (result.value) {
        this.reject_course(id, index);
      }
    });
  }

  add_course(id, index) {
    this.obj2.approveCourse(id).subscribe(
      data => {
        // console.log(data[0]['json'].json());
        // console.log(this.pendingCoursesList['courses'][index]);
        this.approvedCoursesList['courses'];
        this.pendingCoursesList['courses'].splice(this.pendingCoursesList['courses'].indexOf(this.pendingCoursesList['courses'][index]), 1);
        this.approveSuccess();
      },
      error => {
        // console.log(error);
        this.approveError();
      }
    );

  }

  reject_course(id, index) {

    const dialogRef = this.dialog.open(RejectReasonDialog, {
      width: '500px',
      data: {
        id: id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // console.log(result);
      this.rejectedCoursesList['courses'].push(result);
      this.pendingCoursesList['courses'].splice(this.pendingCoursesList['courses'].indexOf(this.pendingCoursesList['courses'][index]), 1);

    });

  }

  approveSuccess() {
     swal.fire({
      type: 'success',
      title: 'Approved Successfully <br> Course is added to approved courses list!',
      // showConfirmButton: false,
      width: '512px',
      // timer: 2500
    })
  }


  approveError() {
     swal.fire({
      type: 'error',
      title: 'Error <br> Failed to approve course!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }
}


@Component({
  selector: 'reject-reason-dialog',
  templateUrl: 'reject-reason.dialog.html',
  styleUrls: ['../events/add-event.component.css']
})


export class RejectReasonDialog implements OnInit{

  public model: any = {};

  constructor(public dialogRef: MatDialogRef<RejectReasonDialog>, private http: HttpClient, private obj: AdminPanelService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(f: NgForm) {

    this.obj.rejectCourse(this.data.id, this.model.detail).subscribe(
      data => {
        // console.log(data);
        // console.log(this.pendingCoursesList['courses'][index]);
        // this.rejectedCoursesList['courses'].push(this.pendingCoursesList['courses'][index]);
        // this.pendingCoursesList['courses'][index].splice();
        console.log(data[0]['json'].json());
        this.dialogRef.close(data[0]['json'].json());
        this.rejectSuccess();
      },
      error => {
        // console.log(error);
        this.rejectError();
      }
    );
  }

  rejectSuccess() {
     swal.fire({
      type: 'success',
      title: 'Rejected Successfully <br> Course is added to rejected courses list!',
      // showConfirmButton: false,
      width: '512px',
      // timer: 2500
    })
  }

  rejectError() {
     swal.fire({
      type: 'error',
      title: 'Error <br> Failed to reject course!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

}
