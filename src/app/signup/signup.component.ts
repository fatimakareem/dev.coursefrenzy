import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {SignUpservice} from './signup.service';
import {FormControl, NgForm, Validators} from '@angular/forms';
// import { ActivatedRoute, ParamMap } from '@angular/router';
// import { Location } from '@angular/common';
import swal from 'sweetalert2';
import {AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser} from 'angular4-social-login';
// import {AuthService, FacebookLoginProvider,  GoogleLoginProvider, LinkedinLoginProvider} from 'ng4-social-login';
// import { SocialUser } from 'ng4-social-login';
import {Router} from '@angular/router';
import { RecapchaComponent } from '../recapcha/recapcha.component';
import { RecapchaService } from '../recapcha/recapcha.service';

import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['../login/login.component.css'],
  providers: [SignUpservice]
})
export class SignUpComponent implements OnInit {
  @ViewChild(RecapchaComponent) captcha: RecapchaComponent;
  email_regex = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';
  password_regex = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';
  private user: SocialUser;
  private loggedIn: boolean;
  hide = true;
  position = 'above';
  public model: any = {};
  public usernameResponse;
  public usernamestatus = false;
  public emailResponse;
  public emailstatus = false;
  public usernameLower = '';
  public emailLower = '';
  captcharesponse;


  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9_.-]+?'),
    Validators.maxLength(50)
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.email_regex),
    Validators.maxLength(100)
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.password_regex),
    Validators.minLength(8),
    Validators.maxLength(30)
  ]);
  confirmPasswordFormControl= new FormControl('', [
    Validators.required,
    Validators.pattern(this.password_regex),
    Validators.minLength(8),
    Validators.maxLength(30)
  ]);

  captchaFormControl = new FormControl('', [
    Validators.required]);
  public resolved(captchaResponse: string) {

    this.captcharesponse = captchaResponse;
    // this.cap= true;
  }
  // Validators.pattern('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$" minlength="8')

  constructor(private obj: SignUpservice , private authService: AuthService, private router: Router,public recapcha: RecapchaService) {
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  onSubmit(f: NgForm) {
    //  console.log((this.model.username, this.model.email, this.model.Password));
    // alert(this.usernamestatus);
    if(this.recapcha.check()) {

      if (this.usernamestatus === false) {
        this.usernameError();
      } else {
        if (this.emailstatus === false) {
          this.emailError();
        } else {
          this.usernameLower = this.model.username;
          this.usernameLower = this.usernameLower.toLowerCase();
          this.emailLower = this.model.email;
          this.emailLower = this.emailLower.toLowerCase();
          this.obj.register_customer(this.usernameLower, this.emailLower, this.model.Password).subscribe();
          this.showSuccess();
          this.router.navigate(['/login']);
        }
      }
    }
    else{
      this.captcha.resetImg();
           
             swal.fire({
              type: 'error',
              title: 'Please confirm you are not a robot!',
              showConfirmButton: false,
              width: '512px',
              timer: 2000
            });

    }

    // console.log("ksdkjsdfkjsdf",this.model.username);
  }

  usernameError() {
     swal.fire({
      type: 'error',
      title: 'Failed to Sign Up! <br> Username already exists!',
      width: '512px'
    })
  }

  emailError() {
     swal.fire({
      type: 'error',
      title: 'Failed to Sign Up! <br> Email already registered',
      width: '512px'
    })
  }

  getusername() {
    if (this.model.username !== '') {
      this.obj.username_verify(this.model.username).subscribe(Response => {
          this.usernameResponse = Response;
          this.usernamestatus = this.usernameResponse.status;

          if (this.usernamestatus === false) {
            this.usernameVerificationError();
          }
        },
        error => {
          this.usernameResponse = true;
        });
    }
  }

  getemail() {
    if (this.model.email !== '') {
      this.obj.check_email_unique(this.model.email).subscribe(Response => {
          this.emailResponse = Response;
          this.emailstatus = this.emailResponse.status;
          // alert(this.emailstatus);
          // console.log(this.emailstatus);
          if (this.emailstatus === false) {
            this.emailVerificationError();
          }
        },
        error => {
          this.emailstatus = false;
        });
    }
  }

  emailVerificationError() {
     swal.fire({
      type: 'error',
      title: 'Oops! <br> Email alreday registered',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  usernameVerificationError() {
     swal.fire({
      type: 'error',
      title: 'Oops! <br> Username already exists!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  showSuccess() {
     swal.fire({
      type: 'success',
      // title: 'Welcome to CourseFrenzy! <br> Please Vrify email and Sign In to Proceed',
      title: 'Please check your inbox for verification code. Enter that code below to continue the CourseFrenzy Signup Process.',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  showError() {
     swal.fire({
      type: 'error',
      title: 'Failed to Signup! <br> Incorrect Information',
      width: '512px'
    })
  }
}
