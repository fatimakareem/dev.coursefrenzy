import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from "./account.service";
import swal from 'sweetalert2';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  email;
  hide=true;
  password;
  newpassword1;
  newpassword2;
  emailFormControl = new FormControl('', [
    Validators.required,
  ]);
  // Validators.pattern('[a-zA-Z]+?')

  passwordFormControl = new FormControl('', [
    Validators.required]);
  public model: any = {};
  constructor(private obj: AccountService) { }

  ngOnInit() {
  }

  onSubmit(f) {
    if (this.model.newpassword1 != this.model.newpassword2) {
      this.passwordMatch();
    }
    else {
      this.obj.change_password(this.model.password, this.model.newpassword1, this.model.newpassword2).subscribe(
        data => {
           swal.fire({
            type: 'success',
            title: 'Your password has been successfully changed',
            showConfirmButton: false,
            timer: 1500
          })
        },
        error => {
           swal.fire({
            type: 'error',
            title: 'Your old password has been incorrect!',
            showConfirmButton: false,
            timer: 1500
          })
        }
        );
    }
  }

  passwordMatch() {
     swal.fire({
      type: 'error',
      title: 'Failed to change passwrod <br> Re-entered password does not match',
      showConfirmButton: false,
      width: '520px',
      timer: 1500
    });
  }
}
