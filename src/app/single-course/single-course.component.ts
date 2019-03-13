import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { SingleCourseService } from './single-course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';
import { FormControl, NgModel, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent } from '@angular/material';
import { NgControl } from '@angular/forms';
import { GlobalService } from '../global.service';
import { Config } from '../Config';
import { BiddingDialogComponent } from "../bidding-dialog/bidding-dialog.component";
import { isPlatformBrowser } from "@angular/common";
import swal from 'sweetalert2';
import { SingleCourseGlobalService } from "../singleCourse.global.service";
import { HttpClient } from "@angular/common/http";
import { VideoShowDialogComponent } from "./video-show-dialog/video-show-dialog.component";
import { AddReviewDialogComponent } from "./add-review-dialog/add-review-dialog.component";
import { CoursesService } from "../course/courses.service";
import { MessagesService } from "../Messages.service";
import { FollowUnfollowService } from "../Follow-Unfollow.service";
import { BuynowDialogComponent } from '../buynow-dialog/buynow-dialog.component';
import { AcceptOfferDialogComponent } from '../accept-offer-dialog/accept-offer-dialog.component';

declare const $: any;

@Component({
  selector: 'app-single-course',
  templateUrl: './single-course.component.html',
  styleUrls: ['./single-course.component.css'],
})
export class SingleCourseComponent implements OnInit, OnDestroy {
  public isFollow: boolean;
  public model: any = {};
  selectedValue: string;
  languages = [
    { value: 'English', viewValue: 'English' },
    { value: 'Urdu', viewValue: 'Urdu' },
    { value: 'Spanish', viewValue: 'Spanish' },
    { value: 'French', viewValue: 'French' },
    { value: 'Turkish', viewValue: 'Turkish' },
    { value: 'Arabic', viewValue: 'Arabic' }
  ];
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
  public GlobalWishListCourses: any;
  public GlobalCartCourses: any = [];
  public alreadyInCartStatus: any;

  public step = 0;
  public StaticImageUrl = Config.ImageUrl;
  public SingleCourse: any = [];
  public ProfileImage: any;
  public instructor_id: any;
  public followers: any;
  private CourseId: number;
  public AllChapters: any = [];
  public ImageUrl = Config.ImageUrl;
  public VideoUrl = Config.VideoUrl;
  public Chaptersloaded = false;
  Floaded = false;
  public FollowResponse: any;
  private sub: Subscription;
  Logedin: string;
  private userRole: string;
  public chat;
  public otherId;
  public chatroom;
  public chatroomresponse;
  public route_instructor: number;
  public overview: any = [];
  public overviewloaded: boolean;
  public reviewsloaded: boolean = false;
  public reviewss: any = [];
  public statusMessage: string;
  public NoReviewMessage: string;
  public NoOverviewMessage: string = '';
  public NoOverviewFalse: boolean;
  public course_category: string;
  public SingleCourseloaded: Boolean;
  public IsBuyed: Boolean = false;
  public IsReviewed: Boolean = false;
  public token: Boolean;
  public Video_URL: string = '';
  public course_Subcategory: string;
  public course_category_id: number;
  public course_Subcategory_id: number;
  public message: string;
  public InWatchList: boolean;
  public firstname;
  public lastname;
  public rev: any;
  totallectures;
  // public model: any = {};
  headline = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9_. -,]+?')]);

  selected = 0;
  hovered = 0;
  readonly = false;
  reviewscomment = new FormControl('', [
    Validators.required,
  ]);
  constructor(private obj: SingleCourseService,
    private follow_unfollow: FollowUnfollowService,
    private obj2: GlobalService,
    private route: ActivatedRoute,
    private router: Router,
    private obj3: CoursesService,
    private nav: Router,
    private global: GlobalService,
    public dialog: MatDialog, @Inject(PLATFORM_ID) private platformId: Object) {
    //  config.max = 5;
    // config.readonly = true;
    if (isPlatformBrowser(this.platformId)) {
      this.Logedin = localStorage.getItem("loged_in");
    }
    this.obj2.caseNumber$.subscribe(
      data => {
        this.Logedin = data;
      });
    this.obj2.checkingUserRole$.subscribe(
      data => {
        this.userRole = data;
      });

    this.obj2.openChat$.subscribe(
      data => {
        this.chat = data;
      });

    this.obj2.otherChatId$.subscribe(
      data => {
        this.otherId = data;
      });

    this.obj2.chatroom$.subscribe(
      data => {
        this.chatroom = data;
      });

    this.obj2.tokenGlobal$.subscribe(
      data => {
        this.token = data;
      });
    this.global.GlobalWishListCourses$.subscribe(
      data => {
        if (data.length === 0) {
          this.GlobalWishListCourses = [];
        } else {
          this.GlobalWishListCourses = data;
        }
      });

    this.global.GlobalCartCourses$.subscribe(
      data => {
        if (data.length === 0) {
          this.GlobalCartCourses = [];
        } else {
          this.GlobalCartCourses = data;
        }
      });

    this.global.InWatchlistorNot$.subscribe(
      data => {
        this.InWatchList = data;
      });

    this.global.FollowOrNot$.subscribe(
      data => {
        this.isFollow = data;
      });
  }
  cheptermessage;
  total;
  minuts;my_vedio;
  videos;
  demo_vedio;duration;
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.CourseId = +params['query'] || 1;
      this.route_instructor = +params['instructor'] || 0;
      this.obj.get_Single_Course(this.CourseId).subscribe(response => {
this.my_vedio=response.mycourses;

        this.SingleCourse = response.data;
        this.demo_vedio=response.demovideo;
        this.rev = response.rating;
        if (response.hasOwnProperty("status")) {
          // this.AlreadyInWishlistError();
        }
        console.log(this.SingleCourse);
        this.global.SetingteacherID(this.SingleCourse.user_id.id);

        // this.ProfileImage = this.SingleCourse.user_id[0].profile[0].profilePhoto;
        this.ProfileImage = this.SingleCourse.user_id;
        // alert(this.ProfileImage);
        // console.log(this.ProfileImage);
        // console.log(this.ProfileImage.id);
        // console.log(this.ProfileImage.profile);
        this.ProfileImage = this.ProfileImage.profile;
        this.ProfileImage = this.ProfileImage.profilePhoto;
        console.log(this.ProfileImage);
        this.instructor_id = this.SingleCourse.user_id.id;
      
        this.rev = this.SingleCourse.rating;
        this.firstname = this.SingleCourse.user_id.first_name;
        this.lastname = this.SingleCourse.user_id.last_name;
        this.SingleCourseloaded = true;
        // console.log(this.SingleCourse);
        this.course_category = this.SingleCourse.Categories[0].name;
        this.course_category_id = this.SingleCourse.Categories[0].id;
        this.course_Subcategory = this.SingleCourse.SubCategory[0].name;
        this.course_Subcategory_id = this.SingleCourse.SubCategory[0].id;
        this.InWatchList = this.SingleCourse.inWatchList;
        this.global.setWatchlist(this.SingleCourse.inWatchList);
        this.global.SetFollowing(this.SingleCourse.isFollowedInstructor);
      },
        (error) => {
          this.statusMessage = 'Something Wrong! Please Try Again!'
        });
    });

    this.obj.get_chapters(this.CourseId).subscribe(response => {
      if (response.hasOwnProperty("status")) {
        console.log('Chapters are going to set False');
        this.AllChapters = [];
        this.Chaptersloaded = false;
        this.cheptermessage=response.message;
        
      } else {
        this.AllChapters = response.data;
       
        this.duration=response['Total Hours'];
this.totallectures=response['Total Lectures'];
        this.videos=response.vedios
        this.total=response['Total Chapter'];
        this.minuts=response['Total Minute'];
        this.Chaptersloaded = true;
      }

    });
    if (isPlatformBrowser(this.platformId)) {
      // this.token = localStorage.getItem('Authorization');
      // console.log(this.token.toString().length>0);
      if (this.token) {
        this.obj.check_course_buy_review(this.CourseId).subscribe(response => {
          console.log(response);
          this.IsBuyed = response.purchased;
          this.IsReviewed = response.reviewed;
        });
      }
    }

    this.obj.get_reviews(this.CourseId).subscribe(response => {
      if (response.hasOwnProperty("status")) {
        console.log("No REview Founddddd");
        this.NoReviewMessage = response.message;
        this.reviewsloaded = false;
        this.reviewss = [];

      }
      else {
        console.log(this.reviewss);
        this.reviewsloaded = true;
        this.reviewss = response;
      }

    });

    this.obj.get_overview(this.CourseId).subscribe(response => {

      if (response.hasOwnProperty("status")) {
        this.NoOverviewMessage = response.message;
        this.NoOverviewFalse = false;
      } else {
        this.NoOverviewFalse = true;
        this.overview = response;
      }
      // console.log(this.overview);
      // this.overviewloaded = true;
    });

    // this.obj.get_followers(this.instructor_id).subscribe(response => {
    //   this.followers = response;
    //   this.Floaded = true;
    // });

    SingleCourseComponent.loadScript('./assets/js/fixedscroll.js');

    $('#loadVideo').on('hide.bs.modal', function (e) {
      // document.getElementById('courseVideo').pause();
      $('#courseVideo').get(0).pause();
    });
  }

  Follow_Instructor(user_id) {
    this.follow_unfollow.Follow_Unfollow(user_id, this.Logedin);
  }
  onSubmit(f: NgForm) {
    this.route.params.subscribe(params => {
      this.CourseId = +params['query'] || 1;
    // alert(this.model.selectedValue);
    this.obj.publish_course(this.CourseId, this.model.headline, this.model.selectedValue, this.model.detail).subscribe(
      data => {
        //      console.log(data);
        // this.dialogRef.close();
        PublishCourseComponent.publishSuccess();
      },
      error => {
        // console.log(error);
        PublishCourseComponent.publishError();
      }
    );})
  }

  static publishSuccess() {
     swal.fire({
      type: 'success',
      title: 'Success! <br> Course Publish Request Sent to Admin!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static publishError() {
     swal.fire({
      type: 'error',
      title: 'Oops! <br> Failed to send publish course request!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }
  AddToWatchList() {
    if (this.Logedin == '1') {
      this.obj.AddtoWatchedCourses(this.CourseId).subscribe(response => {
        if (response.status === false) {
          this.message = response.message;
          MessagesService.ErrorMessage(this.message);
        }
        else {
          // this.GlobalWishListCourses.push(data[0]['json'].json());
          // this.global.getGolbalWishListCourses(this.GlobalWishListCourses);
          this.SingleCourse.inWatchList = true;
          this.InWatchList = true;
          this.global.setWatchlist(true);
          MessagesService.SuccessMessage("Course Added to WatchList Successfully!");
        }
      });
    } else {
      MessagesService.AuthenticatMessage();
      this.router.navigate(['login']);
    }
  }

  RemoveFromWatchList() {
    if (this.Logedin == '1') {
      this.obj.WatchListDelete(this.CourseId).subscribe(response => {
        if (response.status === true) {
          this.InWatchList = false;
          this.global.setWatchlist(false);
          MessagesService.SuccessMessage(response.message);
        }
        else {
          this.SingleCourse.inWatchList = false;
          MessagesService.ErrorMessage(response.message);
        }
      });
    } else {
      MessagesService.AuthenticatMessage();
      this.router.navigate(['login']);
    }
  }


  getValueq(event) {
    // this.strap = event;
  }

  openChat(chatId) {
    if (this.chat === 1) {
      this.chat = 0;
      this.obj2.chat(0);
    }
    else {
      this.chat = 1;
      this.obj2.chat(1);
      if (isPlatformBrowser(this.platformId)) {
        this.obj.room(localStorage.getItem('id'), chatId).subscribe(response => {
          this.chatroomresponse = response;
          this.chatroom = this.chatroomresponse.room;

          localStorage.setItem('room', this.chatroom);

          // this.obj2.chatroomfunc(this.chatroom);
          // console.log(this.FollowResponse.message);
        });
      }
      //
      // }
      // this.obj2.chatID(chatId);
    }
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  openReviewDialog(): void {
    if (this.Logedin == '1') {
      const dialogRef = this.dialog.open(AddReviewDialogComponent, {
        width: '1200px',
        data: {
          CourseId: this.CourseId,
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        // console.log(this.AllChapters);
        // console.log('The dialog was closed');
        console.log(result);
        // if(result !== 1) {
        //   this.AllChapters.push(result);
        //   this.Chaptersloaded = true;
        //   // console.log(this.AllChapters);
        // }
      });
    }
    else {
      SingleCourseComponent.Authenticat();
      this.router.navigate(['login']);
    }
  }

  openDialog(): void {
    if (this.Logedin == '1') {
      const dialogRef = this.dialog.open(AddChapterComponent, {
        width: '500px',
        data: {
          CourseId: this.CourseId,
          AllChapters: this.AllChapters
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        // console.log(this.AllChapters);
        // console.log('The dialog was closed');
        console.log(result);
        if (result !== 1) {
          this.AllChapters.push(result);
          this.Chaptersloaded = true;
          // console.log(this.AllChapters);
        }
      });
    }
    else {
      SingleCourseComponent.Authenticat();
      this.router.navigate(['login']);
    }
  }
  insSetVideoURL(video_url,SetVideoURL) {
   
      const dialogRef = this.dialog.open(VideoShowDialogComponent, {
      width: '1366px',
      data: {
        video_url: video_url,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  
    

  }
  SetVideoURL(video_url,SetVideoURL) {
   
    
      const dialogRef = this.dialog.open(VideoShowDialogComponent, {
        width: '1366px',
        data: {
          video_url: video_url,
        }
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    //   
    
    

  }
  SetVideoURL1(video_url,SetVideoURL) {
   
    if(this.my_vedio== true){
      const dialogRef = this.dialog.open(VideoShowDialogComponent, {
        width: '1366px',
        data: {
          video_url: video_url,
        }
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    //   
    }else if(this.my_vedio== false){
      if(SetVideoURL==false){
         swal.fire({
          type: 'error',
          title: 'Oops! <br> Please bought this course first!',
          showConfirmButton: false,
          width: '512px',
          timer: 2500
        })
            
         }else if(SetVideoURL==true){
            const dialogRef = this.dialog.open(VideoShowDialogComponent, {
              width: '1366px',
              data: {
                video_url: video_url,
              }
            });
            dialogRef.afterClosed().subscribe(result => {
            });
          }
        }
    

  }
  public emptyCart: boolean;
  totalcarts;
  getcart(){
    
      // alert('calling Checkout Courses');
      this.obj3.get_checkout_courses().subscribe(response => {
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
  // noPromo() {
  //   this.obj.add_to_cart_no_promo(this.CourseId).subscribe(
  //     data => {
  //       // console.log(data[0]['json'].json());
  //       if (data[0]['json'].json().hasOwnProperty("status")) {
  //         this.alreadyInCartStatus = true;
  //         // AddCartDialogComponent.AlreadyInCartError();
  //         // this.dialogRef.close();
  //       }
  //       else {
  //         this.GlobalCartCourses.push(data[0]['json'].json());
  //         this.getcart();
  //         // AddCartDialogComponent.CartSuccess();
  //         // this.dialogRef.close();
  //       }
  //     },
  //     error => {
  //       // console.log(error);
  //       // AddCartDialogComponent.CartError();
  //     }
  //   );
  // }
  buyNowClick(index, course_id): void {
    if(this.Logedin === '1'){
    this.obj3.buyNowcheck(index, course_id,this.Logedin).subscribe(
      data => {
        // alert(data.message)
       if(this.Logedin === '1' && data.message=="Course is already in your My Courses"){
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
        data: { course_id: course_id,
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
    }})}
    else{
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
  deletdeVideo(chapter_index, video_index, video_id) {
     swal.fire({
      title: 'Are you sure you want to delete this video? <br> This Video Will be Deleted Permanently. <br> You will not be able to revert this!',
      type: 'question',
      showCancelButton: true,
      width: '512px',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.obj.delete_video(video_id).subscribe(
          data => {
            // alert(this.AllChapters[chapter_index]);
            this.AllChapters[chapter_index].splice(this.AllChapters[chapter_index].indexOf(this.AllChapters[chapter_index][video_index]), 1);
            SingleCourseComponent.deleteVideoSuccess();
          },
          error => {
            SingleCourseComponent.deleteVideoError();
          }
        );
      }
    })
  }

  static deleteVideoSuccess() {
     swal.fire({
      type: 'success',
      title: 'Video Deleted Successfully!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static deleteVideoError() {
     swal.fire({
      type: 'error',
      title: 'Oops! <br> Failed to send request',
      // text: 'Failed to approve course!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  deletdeChapter(index, chapter_id) {
     swal.fire({
      title: 'Are you sure you want to delete this Chapter? <br> All Video in this Chapter will be deleted <br> You will not be able to revert this!',
      type: 'question',
      showCancelButton: true,
      width: '512px',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        alert(chapter_id)
        this.obj.delete_chapter(chapter_id).subscribe(
          data => {
            this.AllChapters.splice(this.AllChapters.indexOf(this.AllChapters[index]), 1);
            SingleCourseComponent.deleteSuccess();
          },
          error => {
            SingleCourseComponent.deleteError();
          }
        );
      }
    })
  }

  static deleteSuccess() {
     swal.fire({
      type: 'success',
      title: 'Chapter Deleted Successfully!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static deleteError() {
     swal.fire({
      type: 'error',
      title: 'Oops! <br> Failed to send request',
      // text: 'Failed to approve course!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }
  openEditDemoDialog(index, id): void {
    // alert(id);
    // alert(index);
    if (this.Logedin == '1') {
      const dialogRef = this.dialog.open(EditdemoComponent, {
        width: '500px',
        data: {
          // courseId: this.CourseId,
          vedioId: id,
          // chapterDetail: this.AllChapters[index]
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        // console.log('The dialog was closed');
        // console.log(result);
        if (result !== 1) {
          // console.log(this.AllChapters);
          // console.log(this.AllChapters[index].chapter_name);
          // console.log(result.chapter_name);
          this.AllChapters[index].chapter_name = result.chapter_name;
        }
        // console.log(this.AllChapters);
      });
    }
    else {
      SingleCourseComponent.Authenticat();
      this.router.navigate(['login']);
    }
  }
  openEditChapterDialog(index, id): void {
    // alert(id);
    // alert(index);
    if (this.Logedin == '1') {
      const dialogRef = this.dialog.open(EditChapterComponent, {
        width: '500px',
        data: {
          courseId: this.CourseId,
          chapterId: id,
          chapterDetail: this.AllChapters[index]
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        // console.log('The dialog was closed');
        // console.log(result);
        if (result !== 1) {
          // console.log(this.AllChapters);
          // console.log(this.AllChapters[index].chapter_name);
          // console.log(result.chapter_name);
          this.AllChapters[index].chapter_name = result.chapter_name;
        }
        // console.log(this.AllChapters);
      });
    }
    else {
      SingleCourseComponent.Authenticat();
      this.router.navigate(['login']);
    }
  }

  Publishcourse(){
    this.route.params.subscribe(params => {
      this.CourseId = +params['query'] || 1;
    if (this.Logedin == '1') {
      this.obj.req_for_publish(this.CourseId).subscribe(
        data => {
          //      console.log(data);
         
          PublishCourseComponent.publishSuccess();
        },
        error => {
          // console.log(error);
          PublishCourseComponent.publishError();
        }
      );
      // const dialogRef = this.dialog.open(PublishCourseComponent, {
      //   width: '500px',
      //   data: { CourseId: this.CourseId }
      // });
    }
    else {
      SingleCourseComponent.Authenticat();
      this.router.navigate(['login']);
    }
  })
  }


  openBidDialog(): void {
    if (this.Logedin == '1') {
      const dialogRef = this.dialog.open(BiddingDialogComponent, {
        width: '500px',
        data: { bid_id: this.CourseId }
      });
    }
    else {
      SingleCourseComponent.Authenticat();
      this.router.navigate(['login']);
    }
  }

  // openCartDialog(): void {
  //   if (this.Logedin === '1') {
  //     const dialogRef = this.dialog.open(AddCartDialogComponent, {
  //       width: '500px',
  //       data: { course_id: this.CourseId }
  //     });
  //   } else {
  //     SingleCourseComponent.Authenticat();
  //     this.router.navigate(['login']);
  //   }
  // }


  static Authenticat() {
     swal.fire({
      type: 'error',
      title: 'Authentication Required <br> Please Login or Singup first',
      // text: '',
      showConfirmButton: false,
      timer: 1500
    })
  }
  openDialog4(id){
    this.route.params.subscribe(params => {
      this.CourseId = +params['query'] || 1
      
    const dialogRef = this.dialog.open(IntroVideoComponent, {
      width: '500px',
      data: {
        id:  this.CourseId,
        
        // chapter_Videos: chapter_Videos
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result !== 1) {
        // chapter_Videos.push(result);
        // console.log(chapter_Videos);
      }
    });})
  }

  openDialog2(chapter_id, chapter_Videos): void {
    const dialogRef = this.dialog.open(AddVideoComponent, {
      width: '500px',
      data: {
        chapter_id: chapter_id,
        chapter_Videos: chapter_Videos
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result !== 1) {
        chapter_Videos.push(result);
        console.log(chapter_Videos);
      }
    });
  }

  public static loadScript(url) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
  public wishlistCourses: any=[];
  public emptyWishlist: boolean;

  openDialogAddToCart(index, course_id): void {
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
            // this.GlobalCartCourses.push(data[0]['json'].json());
            this.getcart();
             swal.fire({
              type: 'success',
              title: 'Success <br> Course Added to Cart!',
              showConfirmButton: false,
              width: '512px',
              timer: 2500
            })
         
            this.obj3.removeFromWishlist(course_id).subscribe(
              data => {
                console.log(data);
                // this.wishlistCourses.splice(this.wishlistCourses.indexOf(this.wishlistCourses[index]),1);
                // console.log(this.wishlistCourses);
                // if (this.Logedin === '1') {
                this.obj3.get_wishlist_courses(1).subscribe(response => {
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
      SingleCourseComponent.Authenticat();
      this.nav.navigate(['login']);
    }
  }
  // openDialogAddToCart(course_id): void {
  //   if (this.Logedin === '1') {
  //     const dialogRef = this.dialog.open(AddCartDialogComponent, {
  //       width: '500px',
  //       data: {
  //         course_id: course_id,
  //         // CourseDetail: this.Courses
  //       }
  //     });
  //   } else {
  //     SingleCourseComponent.Authenticat();
  //     this.nav.navigate(['login']);
  //   }
  // }

  onclick(index,course_id,inwhishlist) {
    if (this.Logedin === '1') {
      
        if(inwhishlist=='true'){
          SingleCourseComponent.AlreadyInWishlistError();
        }else{
      this.obj3.add_wishlist(course_id).subscribe(
        data => {
          // console.log(data[0]['json'].json());
          if (data[0]['json'].json().hasOwnProperty("status")) {
             swal.fire({
              type: 'warning',
              title: 'Oops! <br> This course already exists in your courses!',
              showConfirmButton: false,
              width: '512px',
              timer: 2500
            })
          }
          else {
            this.GlobalWishListCourses.push(data[0]['json'].json());
            this.global.getGolbalWishListCourses(this.GlobalWishListCourses);
            SingleCourseComponent.wishlistSuccess();
          }

        },
        error => {
          // console.log(error);
        }
      );}
    }
    else {
      SingleCourseComponent.Authenticat();
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

  reviews_post() {
    this.obj.post_reviews(this.model.comment, this.model.rating, this.CourseId).subscribe(data => {
     
    }
    );
  }
}

@Component({
  selector: 'app-add-chapter--dialog',
  templateUrl: 'add-chapter-dialog.html',
  styleUrls: ['../events/add-event.component.css']
})

export class AddChapterComponent {
  public model: any = {};

  constructor(private obj: SingleCourseService, public dialogRef: MatDialogRef<AddChapterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  chaptername = new FormControl('', [
    Validators.required
  ]);

  onNoClick(): void {
    this.dialogRef.close(1);
  }

  onSubmit(f: NgForm) {
    this.obj.upload_chapter(this.model.chaptername, this.data.CourseId).subscribe(
      data => {
        // console.log(data);
        //  console.log(data[0]['json'].json());
        this.dialogRef.close(data[0]['json'].json());
        // this.dialogRef.close();
        AddChapterComponent.chapterSuccess();
      },
      error => {
        // console.log(error);
        AddChapterComponent.chapterError();
      }
    );
  }

  static chapterSuccess() {
     swal.fire({
      type: 'success',
      title: 'Success! <br> New Chapter Added!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static chapterError() {
     swal.fire({
      type: 'error',
      title: 'Oops! <br> Failed to add new chapter!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

}


@Component({
  selector: 'app-edit-chapter--dialog',
  templateUrl: 'edit-chapter-dialog.html',
  styleUrls: ['../events/add-event.component.css']
})

export class EditChapterComponent implements OnInit {
  public model: any = {};

  constructor(private obj: SingleCourseService, public dialogRef: MatDialogRef<EditChapterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  chaptername = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9_.+-, !@#$%^&*()<>{}|=~]+?')
  ]);


  ngOnInit() {
    // console.log(this.data.chapterDetail.chapter_name);
    this.model.chaptername = this.data.chapterDetail.chapter_name;
  }

  onNoClick(): void {
    this.dialogRef.close(1);
  }

  onSubmit(f: NgForm) {
    this.obj.edit_chapter(this.data.chapterId, this.model.chaptername).subscribe(
      data => {
        if (data.hasOwnProperty("status")) {
          EditChapterComponent.editChapterError();
        } else {
          // console.log(data);
          //  console.log(data[0]['json'].json());
          this.dialogRef.close(data[0]['json'].json());
          // this.dialogRef.close();
          EditChapterComponent.editChapterSuccess();
        }
      },
      error => {
        // console.log(error);
        EditChapterComponent.editChapterError();
      }
    );
  }

  static editChapterSuccess() {
     swal.fire({
      type: 'success',
      title: 'Success! <br> Chapter name edited successfully!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static editChapterError() {
     swal.fire({
      type: 'error',
      title: 'Oops! <br> Failed to edit chapter name',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

}

@Component({
  selector: 'app-edit-demo--dialog',
  templateUrl: 'editdemo-dialog.html',
  styleUrls: ['../events/add-event.component.css']
})

export class EditdemoComponent {
  public model: any = {};
  clicked = false;
  public Videos;
  loaded = false;
  isActive = false;

  // video_title = new FormControl('', [
  //   Validators.required,
  //   Validators.pattern('[a-zA-Z0-9_. -,]+?')]);
  video_url = new FormControl('', [
    Validators.required,
  ]);

  // video_minutes = new FormControl('', [
  //   Validators.required,
  //   Validators.pattern('[0-9.: -]+?')]);
  //
  // video_size = new FormControl('', [
  //   Validators.required,
  //   Validators.pattern('[a-zA-Z0-9.: -,_]+?')]);

  // video_isPrivate = new FormControl('', [
  //   Validators.required,
  // ]);

  // chapter = new FormControl('', [
  //   Validators.required,
  //   Validators.pattern('[0-9]+?')]);
  private input: FormData;
  private course_video: string;
  private video_minutes: string;
  private video_size: string;

  constructor(private obj: SingleCourseService,
    public dialogRef: MatDialogRef<AddVideoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient) {
  }

  // ngOnInit() {
  //   // this.obj.get_videos().subscribe(response => {
  //   //   this.Videos = response;
  //   //   console.log(this.Videos);
  //   //   this.loaded = true;
  //   // });
  // }
  onNoClick(): void {
    this.dialogRef.close(1);
  }

  isClick() {
    if (this.clicked === true) {
      return this.clicked = false;
    } else {
      return this.clicked = true;
    }
  }

  onChange(event: EventTarget) {
    this.input = new FormData();
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    this.input.append('fileToUpload', target.files[0]);
    // alert(target.files[0].name.toString());
    // this.model.video_title = target.files[0].name.toString();
  }


  onSubmit(f: NgForm) {
    // console.log('form Submit call');
    this.http.post(
      'https://storage.coursefrenzy.com/upload_video.php',
      this.input, { responseType: 'json' }).subscribe(data => {
        // this.course_video = data;
        // alert(data);
        // console.log(data);
        this.ifImageUpload(data);
      });
  }

  private ifImageUpload(data) {
    this.obj.upload_demovideo(data.video_url, data.video_minutes, data.video_size,this.data.vedioId).subscribe(
      data => {
        console.log(data[0]['json'].json());
        this.dialogRef.close(data[0]['json'].json());
        AddVideoComponent.videoSuccess();
      },
      error => {
        // console.log(error);
        AddVideoComponent.videoError();
      }
    );
  }

  // submit() {
  //   const uploadFile = (<HTMLInputElement>window.document.getElementById('myFileInputField')).files[0];
  //   console.log('file tarining   ', uploadFile);
  //   const myUploadItem = new MyUploadItem(uploadFile);
  //   myUploadItem.formData = { FormDataKey: 'Form Data Value' };  // (optional) form data can be sent with file
  //
  //   this.uploaderService.onSuccessUpload = (item, response, status, headers) => {
  //     // success callback
  //   };
  //   this.uploaderService.onErrorUpload = (item, response, status, headers) => {
  //     // error callback
  //   };
  //   this.uploaderService.onCompleteUpload = (item, response, status, headers) => {
  //     // complete callback, called regardless of success or failure
  //   };
  //
  //   this.uploaderService.onProgressUpload = (item, percentComplete) => {
  //     // progress callback
  //   };
  //
  //   this.uploaderService.upload(myUploadItem);
  //
  // }


  static videoSuccess() {
     swal.fire({
      type: 'success',
      title: 'Success <br> New Video added!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static videoError() {
     swal.fire({
      type: 'error',
      title: 'Oops! <br> Failed to add Video!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

}

@Component({
  selector: 'app-add-video--dialog',
  templateUrl: 'add-video-dialog.html',
  styleUrls: ['../events/add-event.component.css']
})

export class AddVideoComponent {
  public model: any = {};
  clicked = false;
  public Videos;
  loaded = false;
  isActive = false;

  video_title = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9_. -,]+?')]);
  video_url = new FormControl('', [
    Validators.required,
  ]);

  // video_minutes = new FormControl('', [
  //   Validators.required,
  //   Validators.pattern('[0-9.: -]+?')]);
  //
  // video_size = new FormControl('', [
  //   Validators.required,
  //   Validators.pattern('[a-zA-Z0-9.: -,_]+?')]);

  video_isPrivate = new FormControl('', [
    Validators.required,
  ]);

  chapter = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]+?')]);
  private input: FormData;
  private course_video: string;
  private video_minutes: string;
  private video_size: string;

  constructor(private obj: SingleCourseService,
    public dialogRef: MatDialogRef<AddVideoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient) {
  }

  // ngOnInit() {
  //   // this.obj.get_videos().subscribe(response => {
  //   //   this.Videos = response;
  //   //   console.log(this.Videos);
  //   //   this.loaded = true;
  //   // });
  // }
  onNoClick(): void {
    this.dialogRef.close(1);
  }

  isClick() {
    if (this.clicked === true) {
      return this.clicked = false;
    } else {
      return this.clicked = true;
    }
  }

  onChange(event: EventTarget) {
    this.input = new FormData();
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    this.input.append('fileToUpload', target.files[0]);
    // alert(target.files[0].name.toString());
    // this.model.video_title = target.files[0].name.toString();
  }


  onSubmit(f: NgForm) {
    // console.log('form Submit call');
    this.http.post(
      'https://storage.coursefrenzy.com/upload_video.php',
      this.input, { responseType: 'json' }).subscribe(data => {
        // this.course_video = data;
        // alert(data);
        // console.log(data);
        this.ifImageUpload(data);
      });
  }

  private ifImageUpload(data) {
    this.obj.upload_video(this.model.video_title, data.video_url, data.video_minutes, data.video_size, this.isActive, this.data.chapter_id).subscribe(
      data => {
        console.log(data[0]['json'].json());
        this.dialogRef.close(data[0]['json'].json());
        AddVideoComponent.videoSuccess();
      },
      error => {
        // console.log(error);
        AddVideoComponent.videoError();
      }
    );
  }

  // submit() {
  //   const uploadFile = (<HTMLInputElement>window.document.getElementById('myFileInputField')).files[0];
  //   console.log('file tarining   ', uploadFile);
  //   const myUploadItem = new MyUploadItem(uploadFile);
  //   myUploadItem.formData = { FormDataKey: 'Form Data Value' };  // (optional) form data can be sent with file
  //
  //   this.uploaderService.onSuccessUpload = (item, response, status, headers) => {
  //     // success callback
  //   };
  //   this.uploaderService.onErrorUpload = (item, response, status, headers) => {
  //     // error callback
  //   };
  //   this.uploaderService.onCompleteUpload = (item, response, status, headers) => {
  //     // complete callback, called regardless of success or failure
  //   };
  //
  //   this.uploaderService.onProgressUpload = (item, percentComplete) => {
  //     // progress callback
  //   };
  //
  //   this.uploaderService.upload(myUploadItem);
  //
  // }


  static videoSuccess() {
     swal.fire({
      type: 'success',
      title: 'Success <br> New Video added!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static videoError() {
     swal.fire({
      type: 'error',
      title: 'Oops! <br> Failed to add Video!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

}


@Component({
  selector: 'app-publish-course-dialog',
  templateUrl: 'publish-course-dialog.html',
  styleUrls: ['../events/add-event.component.css']
})

export class PublishCourseComponent {
  public model: any = {};
  selectedValue: string;
  languages = [
    { value: 'English', viewValue: 'English' },
    { value: 'Urdu', viewValue: 'Urdu' },
    { value: 'Spanish', viewValue: 'Spanish' },
    { value: 'French', viewValue: 'French' },
    { value: 'Turkish', viewValue: 'Turkish' },
    { value: 'Arabic', viewValue: 'Arabic' }
  ];

  constructor(private obj: SingleCourseService, public dialogRef: MatDialogRef<PublishCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  headline = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9_. -,]+?')]);

  closePublishDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(f: NgForm) {
    // alert(this.model.selectedValue);
    this.obj.publish_course(this.data.CourseId, this.model.headline, this.model.selectedValue, this.model.detail).subscribe(
      data => {
        //      console.log(data);
        this.dialogRef.close();
        PublishCourseComponent.publishSuccess();
      },
      error => {
        // console.log(error);
        PublishCourseComponent.publishError();
      }
    );
  }

  static publishSuccess() {
     swal.fire({
      type: 'success',
      title: 'Success! <br> Course Publish Request Sent to Admin!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static publishError() {
     swal.fire({
      type: 'error',
      title: 'Oops! <br> Failed to send publish course request!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }
}

@Component({
  selector: 'app-intro-video--dialog',
  templateUrl: 'intro-video-dialog.html',
  // styleUrls: ['../events/intro-event.component.css']
})

export class IntroVideoComponent {
  public model: any = {};
  clicked = false;
  public Videos;
  loaded = false;
  isActive = false;

  // video_title = new FormControl('', [
  //   Validators.required,
  //   Validators.pattern('[a-zA-Z0-9_. -,]+?')]);
  video_url = new FormControl('', [
    Validators.required,
  ]);

  // video_minutes = new FormControl('', [
  //   Validators.required,
  //   Validators.pattern('[0-9.: -]+?')]);
  //
  // video_size = new FormControl('', [
  //   Validators.required,
  //   Validators.pattern('[a-zA-Z0-9.: -,_]+?')]);

  // video_isPrivate = new FormControl('', [
  //   Validators.required,
  // ]);

  // chapter = new FormControl('', [
  //   Validators.required,
  //   Validators.pattern('[0-9]+?')]);
  private input: FormData;
  private course_video: string;
  private video_minutes: string;
  private video_size: string;

  constructor(private obj: SingleCourseService,
    public dialogRef: MatDialogRef<AddVideoComponent>,
    @Inject(MAT_DIALOG_DATA) public course: any,
    private http: HttpClient) {
      // alert(course.id)
  }

  // ngOnInit() {
  //   // this.obj.get_videos().subscribe(response => {
  //   //   this.Videos = response;
  //   //   console.log(this.Videos);
  //   //   this.loaded = true;
  //   // });
  // }
  onNoClick(): void {
    this.dialogRef.close(1);
  }

  isClick() {
    if (this.clicked === true) {
      return this.clicked = false;
    } else {
      return this.clicked = true;
    }
  }

  onChange(event: EventTarget) {
    this.input = new FormData();
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    this.input.append('fileToUpload', target.files[0]);
    // alert(target.files[0].name.toString());
    // this.model.video_title = target.files[0].name.toString();
  }


  onSubmit(f: NgForm) {
    // console.log('form Submit call');
    this.http.post(
      'https://storage.coursefrenzy.com/upload_video.php',
      this.input, { responseType: 'json' }).subscribe(data => {
        // this.course_video = data;
        // alert(data);
        // console.log(data);
        this.ifImageUpload(data);
      });
  }

  private ifImageUpload(data) {
    this.obj.upload_introvideo( data.video_url, data.video_minutes, data.video_size,this.course.id).subscribe(
      data => {
        var mess=data['message']
        if(mess=="Video Already Exists."){
           swal.fire({
            type: 'error',
            title: 'Oops! <br> Video Already Exists.',
            showConfirmButton: false,
            width: '512px',
            timer: 2500
          })
        }else{console.log(data[0]['json'].json());
        this.dialogRef.close(data[0]['json'].json());
        IntroVideoComponent.videoSuccess();}
        
      },
      error => {
        // console.log(error);
        AddVideoComponent.videoError();
      }
    );
  }

  // submit() {
  //   const uploadFile = (<HTMLInputElement>window.document.getElementById('myFileInputField')).files[0];
  //   console.log('file tarining   ', uploadFile);
  //   const myUploadItem = new MyUploadItem(uploadFile);
  //   myUploadItem.formData = { FormDataKey: 'Form Data Value' };  // (optional) form data can be sent with file
  //
  //   this.uploaderService.onSuccessUpload = (item, response, status, headers) => {
  //     // success callback
  //   };
  //   this.uploaderService.onErrorUpload = (item, response, status, headers) => {
  //     // error callback
  //   };
  //   this.uploaderService.onCompleteUpload = (item, response, status, headers) => {
  //     // complete callback, called regardless of success or failure
  //   };
  //
  //   this.uploaderService.onProgressUpload = (item, percentComplete) => {
  //     // progress callback
  //   };
  //
  //   this.uploaderService.upload(myUploadItem);
  //
  // }


  static videoSuccess() {
     swal.fire({
      type: 'success',
      title: 'Success <br> New Video added!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static videoError() {
     swal.fire({
      type: 'error',
      title: 'Oops! <br> Failed to add Video!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

}
