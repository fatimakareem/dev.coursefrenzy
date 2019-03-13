import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {NgForm} from '@angular/forms';
import {ContactUsService} from './contact-us.service';
import swal from 'sweetalert2'
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


const NAME_REGEX = /^[a-zA-Z _.]+$/;
const PHONE_REGEX = /^[0-9+]+$/;

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css', '../events/add-event.component.css']
})
export class ContactUsComponent implements OnInit {
  username;
  password;
  email_regex = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';
  public model: any = {};
  public Contacts: any;
  loaded = false;
  lat = 32.9483505;
  lng = -96.82413;

  usernameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(NAME_REGEX)
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.email_regex)
  ]);

  phoneFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(PHONE_REGEX)
  ]);

  subjectFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9_.+-, !@#$%^&*()<>{}|=~]+?')
  ]);
  public captcha: boolean = false;

  constructor(private obj: ContactUsService) { }

  ngOnInit() {
   //  this.obj.get_contacts().subscribe(response => {
   //    this.Contacts = response;
   // //   console.log(this.Contacts);
   //    this.loaded = true;
   //  });
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
    this.captcha= true;
    // console.log('recap', this.captcha);
    // alert('recap'+this.captcha);
  }

  onlyNumberKey(event){
    let charCode = (event.query) ? event.query : event.keyCode;
    // console.log(charCode);
    if (charCode > 31
      && (charCode < 48 || charCode > 57))
      return false;

    return true;
  }


  onSubmit(f: NgForm) {
    // alert('Contact'+ this.model.name);
    this.obj.add_contact(this.model.name, this.model.email, this.model.phone, this.model.subject, this.model.message).subscribe(
      data => {
     //   console.log(data);
        this.contactSuccess();
         f.reset();
        // this.contactform.reset();
        // this.model.name = '';
        // this.model.email = '';
        // this.model.phone = '';
        // this.model.subject = '';
        // this.model.message = '';
      },
      error => {
        // console.log(error);
      }
    );
  }

  contactSuccess() {
     swal.fire({
      type: 'success',
      title: 'Contact Request Sent Successfully',
      text: 'We will get back to you soon!',
      showConfirmButton: false,
      timer: 2500
    })
  }
}
