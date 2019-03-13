import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public captcha: boolean =false;
  password_regex = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.password_regex),
    Validators.minLength(8),
    Validators.maxLength(30)
  ]);

  constructor() { }

  ngOnInit() {
  }
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
    this.captcha= true;
    // console.log('recap', this.captcha);
    // alert('recap'+this.captcha);
  }
}
