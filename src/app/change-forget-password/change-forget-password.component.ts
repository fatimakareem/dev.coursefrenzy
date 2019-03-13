import { Component, OnInit } from '@angular/core';
import {FormControl, NgForm, Validators} from "@angular/forms";
import swal from 'sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from "rxjs/Subscription";
import {ChangeForgetPasswordService} from "./change-forget-password.service";

@Component({
  selector: 'app-change-forget-password',
  templateUrl: './change-forget-password.component.html',
  styleUrls: ['./../login/login.component.css'],
})
export class ChangeForgetPasswordComponent implements OnInit {
  public captcha: boolean = false;
  private link: string;
  private sub: Subscription;
  hide = true;

  password_regex = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.password_regex),
    Validators.minLength(8),
    Validators.maxLength(30)
  ]);

  password2FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.password_regex),
    Validators.minLength(8),
    Validators.maxLength(30)
  ]);

  public model: any = {};


  constructor(private route: ActivatedRoute,private obj: ChangeForgetPasswordService,private _nav: Router) { }

  ngOnInit() {
    this.sub = this.route
      .params
      .subscribe(params => {
        this.link = params.link || '';
        // alert(this.link);
      });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
    this.captcha= true;
  }
  onSubmit(f: NgForm) {
    if(this.model.password!=this.model.password2){
      ChangeForgetPasswordComponent.PasswordMissMatch();
    }
    // alert("this.model.password "+this.model.password);
    // alert("this.model.password2 "+this.model.password2);
    // alert("this.link "+this.link);
    if(this.link!=''){
      this.obj.change_password(this.model.password, this.model.password2, this.link).subscribe(
        data => {
          if(data['status']===false){
            ChangeForgetPasswordComponent.showFailure(data['message']);
          }else{
            ChangeForgetPasswordComponent.showSuccess();
            this._nav.navigate(['/login']);
          }
        }
      );

    }
  }
  static showSuccess() {
     swal.fire({
      type: 'success',
      title: 'Congratulations! <br> Your CourseFrenzy Account Password Changed Successfully! ',
      width: '512px',
      timer: 2000
    })
  }

  static showFailure(message) {
     swal.fire({
      type: 'error',
      title: 'Oops! <br> Failed to Change Password Due to ' + message,
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }
  static PasswordMissMatch() {
     swal.fire({
      type: 'error',
      title: "Oops! <br> Conform Password did't match with current password ",
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

}
