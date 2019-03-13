import { Component, OnInit } from '@angular/core';
import {FormControl, NgForm, Validators} from '@angular/forms';
import {PartnershipService} from './partnership.service';
import swal from 'sweetalert2'
import { Router } from '@angular/router';

const NAME_REGEX = /^[a-zA-Z _.]+$/;
const PHONE_REGEX = /^[0-9]+$/;

@Component({
  selector: 'app-partnership',
  templateUrl: './partnership.component.html',
  styleUrls: ['./partnership.component.css']
})
export class PartnershipComponent implements OnInit {
  username;
  password;
  email_regex = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';
  public model: any = {};
  public Contacts: any;
  loaded = false;
  lat = 31.514538;
  lng = 74.34482;

  usernameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(NAME_REGEX)
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.email_regex)
  ]);

  companyFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(NAME_REGEX)
  ]);
  // Validators.pattern('[a-zA-Z]+?')

  messageFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(NAME_REGEX)
  ]);
  public captcha: boolean = false;


  constructor(private obj: PartnershipService,private _nav: Router) { }

  ngOnInit() {

  }

  onSubmit(f: NgForm) {
    this.obj.add_partner(this.model.name, this.model.email, this.model.company, this.model.message).subscribe(
      data => {
        // console.log(data);
        this.partnershipSuccess();
        this._nav.navigate(['/']);
        f.reset();
      },
      error => {
        // console.log(error);
      }
    );
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
    this.captcha= true;
    // console.log('recap', this.captcha);
    // alert('recap'+this.captcha);
  }


  partnershipSuccess() {
     swal.fire({
      type: 'success',
      title: 'Message Sent Successfully',
      text: 'We will get back to you soon!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

}
