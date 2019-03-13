import { Component, OnInit } from '@angular/core';
import {FormControl, NgModel, Validators, ReactiveFormsModule} from '@angular/forms';
import {ChangePasswordService} from './change-password.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  email_regex = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';
  public model: any = {};
  passwordFormControl = new FormControl('', [
    Validators.required ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.email_regex)
  ]);
  constructor(private obj: ChangePasswordService) { }

  ngOnInit() {
  }

  onSubmit(f) {
    // console.log('previous' + this.model.oldPassword, + 'current' + this.model.newPassword);
    this.obj.change_password(this.model.firstname, this.model.password).subscribe(
      data => {
    //    console.log(data);
      },
      error => {
        // console.log(error);
      });
  }
}
