import { Component, Inject, OnInit, PLATFORM_ID, ViewContainerRef } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
// import {  App_service } from  './../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './login.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { SignUpservice } from '../signup/signup.service';
import { GlobalService } from '../global.service';
import { isPlatformBrowser } from '@angular/common';
import swal from 'sweetalert2';
import { AuthService } from 'angular4-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angular4-social-login';
import { HttpClient } from '@angular/common/http';
import { Config } from '../Config';
import { JwtHelper } from 'angular2-jwt';
import { CoursesService } from '../course/courses.service';
import { CourseCheckoutService } from '../course-checkout/course-checkout.service';
import { RecapchaComponent } from '../recapcha/recapcha.component';
import { ViewChild } from '@angular/core';
import { RecapchaService } from '../recapcha/recapcha.service';

const EMAIL_REGEX = '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  @ViewChild(RecapchaComponent) captcha: RecapchaComponent;
  islogin: boolean;
  returnUrl: string;
  hide = true;
  checked = true;
  searchCaseNumber: any = '';
  public model: any = {};
  public firstnameLower = '';
  public wishPage = 1;
  public emptyWishlist: boolean;
  public emptyCart: boolean;
  public wishlistCourses: any;
  public GlobalCartCourses: any;
  username;
  password;
  captcharesponse;
  public cap: boolean = false;
  jwtHelper: JwtHelper = new JwtHelper();
  user: any;
  // public captcha: boolean =false;
  public logedin: any = 0;

  userFormControl = new FormControl('', [
    Validators.required,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required]);

  constructor(private obj: LoginService, public dialog: MatDialog, private vcr: ViewContainerRef,
    private route: ActivatedRoute, private global: GlobalService, private course: CoursesService, private obj2: CourseCheckoutService,
    @Inject(PLATFORM_ID) private platformId: Object, private authService: AuthService, private _http: HttpClient,
    private _nav: Router,public recapcha: RecapchaService) {
    // this.global.caseNumber$.subscribe(
    //   data => {
    //     this.searchCaseNumber = data;
    //   });

    this.global.GlobalWishListCourses$.subscribe(
      data => {
        if (data.length === 0) {
          this.wishlistCourses = data;
        } else {
          this.wishlistCourses = [];
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
  }

  ngOnInit() {
    // this.captcha.reset();
    if (isPlatformBrowser(this.platformId)) {
      this.logedin = localStorage.getItem('loged_in');
      // alert(this.logedin)
    }
    if (this.logedin === 1) {

      this._nav.navigate(['/']);
    }

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public resolved(captchaResponse: string) {

    this.captcharesponse = captchaResponse;
    // this.cap= true;
  }

  // resolved(captchaResponse: string) {
  //   console.log(`Resolved captcha with response ${captchaResponse}:`);
  //   this.captcha= true;
  //   // console.log('recap', this.captcha);
  //   // alert('recap'+this.captcha);
  // }
  static showSuccess() {
     swal.fire({
      type: 'success',
      title: 'Login Successful <br> Welcome to CourseFrenzy!',
      // text: 'Welcome to CourseFrenzy!',
      showConfirmButton: false,
      width: '512px',
      timer: 1500
    });
  }

  static LoginError() {
     swal.fire({
      type: 'error',
      title: 'Failed to Login <br> Incorrect Credentials!',
      width: '512px',
      timer: 2000
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '500px',
    });
  }

  onSubmit(f) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
    // console.log('username' + this.model.firstname, +'Password' + this.model.password);
    this.firstnameLower = this.model.firstname;
    this.firstnameLower = this.firstnameLower.toLowerCase();
    // this.model.firstname = (this.model.firstname).toLowerCase();
    if (this.recapcha.check()) {
      this.obj.login_authenticate(this.firstnameLower).subscribe(
        data => {
          this.obj.loged_in(this.firstnameLower, this.model.password, this.returnUrl).subscribe(
            data => {

              LoginComponent.showSuccess();
              if (isPlatformBrowser(this.platformId)) {
                localStorage.setItem("loged_in", '1');
                this.global.publishData("1");
              }
              if (isPlatformBrowser(this.platformId)) {
                localStorage.setItem('login', 'false');
              }

              this.course.get_wishlist_courses(this.wishPage).subscribe(response => {
                if (response.hasOwnProperty("status")) {
                  this.emptyWishlist = true;
                  this.global.getemptyWishlistGlobal(this.emptyWishlist);
                }
                else {
                  this.wishlistCourses = response;
                  console.log(this.wishlistCourses);
                  this.global.getGolbalWishListCourses(this.wishlistCourses);
                  this.emptyWishlist = false;
                  this.global.getemptyWishlistGlobal(this.emptyWishlist);
                }
              });

              this.obj2.get_checkout_courses().subscribe(response => {
                if (response.hasOwnProperty("status")) {
                  this.emptyCart = true;
                  this.global.getemptyCartGlobal(this.emptyCart);
                }
                else {
                  this.GlobalCartCourses = response;
                  // if (this.GlobalCartCourses.hasOwnProperty("status")){
                  //   console.log('status found')
                  // }
                  console.log('Checkout' + this.GlobalCartCourses);
                  this.global.getGolbalCartCourses(this.GlobalCartCourses);
                  this.emptyCart = false;
                  this.global.getemptyCartGlobal(this.emptyCart);
                }
              });

            },
            error => {

              this.islogin = false;
              LoginComponent.LoginError();
            });
        },error => {
          console.log(error.status, 'masssssagaggggg')
          if (error.status == 404) {
             swal.fire({
              type: 'error',
              title: 'First, Verify your email address to Sign In.',
              showConfirmButton: false,
              width: '512px',
              timer: 2000
            });
          }
          else if (error.status == 500) {
             swal.fire({
              type: 'error',
              title: 'User Doesnot Exist!',
              showConfirmButton: false,
              width: '512px',
              timer: 2000
            });
          }
      }
        )
    }
    // else if(this.captcha.getResponse()== false){
    //
    //    swal.fire({
    //     type: 'error',
    //     title: 'Please confirm you are not a robot!',
    //     showConfirmButton: false,
    //     width: '512px',
    //     timer: 2000
    //   })
    //
    // }
    else {
      this.captcha.resetImg();
            // this.captcha.reset();
            // this.isequal = false;
            
             swal.fire({
              type: 'error',
              title: 'Please confirm you are not a robot!',
              showConfirmButton: false,
              width: '512px',
              timer: 2000
            });

    }
  }

  signOut(): void {
    this.authService.signOut();
  }

  socialCallBack = (user) => {
    this.user = user;

    const headers = { 'Content-Type': 'application/json' };
    if (user) {
      console.log(user,'pppppppp')
      const createUser = this._http.post(Config.api + 'users/social_login/', {
        user
      }, { headers: headers });

      createUser.subscribe(data => {
        // localStorage.setItem('json_token', data['token']);
        // localStorage.setItem('isSocial', 'True');
        // this.user.id = data[ 'id' ];
        // console.log(data);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem("loged_in", '1');
          localStorage.setItem("Authorization", data['token']);
          localStorage.setItem('username', this.jwtHelper.decodeToken(data['token']).username);
          localStorage.setItem('id', this.jwtHelper.decodeToken(data['token']).user_id);
          this.global.publishData("1");
          LoginComponent.showSuccess();

          this.course.get_wishlist_courses(this.wishPage).subscribe(response => {
            if (response.hasOwnProperty("status")) {
              this.emptyWishlist = true;
              this.global.getemptyWishlistGlobal(this.emptyWishlist);
            }
            else {
              this.wishlistCourses = response;
              console.log(this.wishlistCourses);
              this.global.getGolbalWishListCourses(this.wishlistCourses);
              this.emptyWishlist = false;
              this.global.getemptyWishlistGlobal(this.emptyWishlist);
            }
          });

          this.obj2.get_checkout_courses().subscribe(response => {
            if (response.hasOwnProperty("status")) {
              this.emptyCart = true;
              this.global.getemptyCartGlobal(this.emptyCart);
            }
            else {
              this.GlobalCartCourses = response;
              console.log('Checkout' + this.GlobalCartCourses);
              this.global.getGolbalCartCourses(this.GlobalCartCourses);
              this.emptyCart = false;
              this.global.getemptyCartGlobal(this.emptyCart);
            }
          });


          this._nav.navigate(['/']);
        }
      });
    }
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(this.socialCallBack)
      .catch(message => console.log(message));
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(this.socialCallBack)
      .catch(message => console.log(message));
  }

}

@Component({
  selector: 'app-reset-password-dialog',
  templateUrl: 'reset-password-dialog.html',
  styleUrls: ['../events/add-event.component.css']
})

export class ResetPasswordComponent {
  public model: any = {};
  public emailResponse = false;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  constructor(private obj: LoginService, private obj2: SignUpservice,
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(f: NgForm) {
    this.obj2.check_email_unique(this.model.email).subscribe(Response => this.emailResponse = Response);
    if (this.emailResponse == false) {
      this.obj.reset_password(this.model.email).subscribe(
        data => {
          // console.log(data);
          this.dialogRef.close();
          ResetPasswordComponent.resetSuccess();
        },
        error => {
          // console.log(error);
        }
      );
    } else {
      ResetPasswordComponent.emailError();
    }
  }

  static resetSuccess() {
       swal.fire({
        type: 'success',
        title: 'Check Email! <br> Link sent on Email!',
        width: '512px',
        timer:2000
      })
  }

  static emailError() {
     swal.fire({
      type: 'error',
      title: 'Oops <br> No account registered with this email',
      width: '512px',
      timer:2000
    })
  }
}
