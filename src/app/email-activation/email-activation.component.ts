import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from "rxjs/Subscription";
import swal from 'sweetalert2';
import {EmailActivationService} from "./email-activation.service";

@Component({
  selector: 'app-email-activation',
  templateUrl: './email-activation.component.html',
  styleUrls: ['./email-activation.component.scss']
})
export class EmailActivationComponent implements OnInit {
  private link: string;
  private sub: Subscription;

  constructor(private route: ActivatedRoute, private _service: EmailActivationService,private _nav: Router) { }

  ngOnInit() {

    this.sub = this.route
      .params
      .subscribe(params => {
        this.link = params.abc || '';
      });

    this._service.email_activate(this.link).subscribe(
      data => {
        if(data['status']){
          EmailActivationComponent.EmailActivationSuccess();
          this._nav.navigate(['/']);
        }else{
          EmailActivationComponent.EmailActivationFailure();
        }
      });
  }
  static EmailActivationSuccess() {
     swal.fire({
      type: 'success',
      title: 'Email Conformed! <br> Thanks For Conformation your Email. Click Bellow Button to Subscribe Courses.',
      width: '512px'
    })
  }

  static EmailActivationFailure() {
     swal.fire({
      type: 'error',
      title: 'Oops! <br>Failed To Activate Email! Click link Bellow to Resend Email.',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
