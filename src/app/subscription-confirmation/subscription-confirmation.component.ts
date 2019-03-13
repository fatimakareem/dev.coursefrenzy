import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from "rxjs/Subscription";
import swal from 'sweetalert2';
import {SubscriptionConfirmationService} from "./subscription-confirmation.service";

@Component({
  selector: 'app-subscription-confirmation',
  templateUrl: './subscription-confirmation.component.html',
  styleUrls: ['./subscription-confirmation.component.scss']
})
export class SubscriptionConfirmationComponent implements OnInit {

  private email: string;
  private sub: Subscription;

  constructor(private route: ActivatedRoute, private _service: SubscriptionConfirmationService,private _nav: Router) { }

  ngOnInit() {

    this.sub = this.route
      .params
      .subscribe(params => {
        this.email = params.link || '';
        // alert(this.email);

        
        this._service.conform_subscribe(this.email).subscribe(
          data => {
            if(data['status']){
              SubscriptionConfirmationComponent.EmailActivationSuccess();
              this._nav.navigate(['/']);
            }else{
              SubscriptionConfirmationComponent.EmailActivationFailure();
            }
          });

      });


  }
  static EmailActivationSuccess() {
     swal.fire({
      type: 'success',
      title: 'Email Conformed! <br> Thanks For Conformation your Email. Now You Will Recieve all News and Subscriptions',
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
