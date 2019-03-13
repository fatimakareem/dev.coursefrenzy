import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Config} from '../Config';
import {NgForm} from '@angular/forms';
import {BiddingService} from '../bidding-dialog/bidding.service';
import {FormControl, NgModel, Validators, ReactiveFormsModule} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';
import {AuthGuard} from "../auth-guard/auth-guard.service";
import swal from 'sweetalert2';
@Component({
  selector: 'app-accept-offer-dialog',
  templateUrl: './accept-offer-dialog.component.html',
  styleUrls: ['./accept-offer-dialog.component.scss']
})
export class AcceptOfferDialogComponent implements OnInit {

  public model: any = {};

  private SingleCourse: any;
  private BidId: number;
  private sub: Subscription;
  public bids: any;
  public route_instructor: number;

  bid_amount = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9_.]+?')]);

  constructor(private obj: BiddingService, private route: ActivatedRoute,
              public dialogRef: MatDialogRef<AcceptOfferDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any ) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    this.add_bid_confirmation();
  }
  err;
  add_bid_confirmation() {
     swal.fire({
      title: 'Are you sure you want to add Offer on this course? <br> You will not be able to revert this!',
      type: 'question',
      showCancelButton: true,
      width: '512px',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add it!'
    }).then((result) => {
      if (result.value) {
        this.obj.offernow(this.model.bid_amount, this.data.id).subscribe(
          data => {
         if(data.message=="Your offer is already accepted "){
           swal.fire({
            type: 'error',
            title: 'Your offer is already accepted',
            showConfirmButton: false,
            width: '512px',
            timer: 2500
          });
         }
         else if(data.message=="Your offer is accepted"){
           swal.fire({
            type: 'success',
            title: 'Your offer is accepted',
            showConfirmButton: false,
            width: '512px',
            timer: 2500
          });
         }
         else if(data.message=="Your offer is not accepted"){
           swal.fire({
            type: 'error',
            title: 'Your offer is not accepted',
            html: 'no of chances left :'+ data.count_of_offer,
            showConfirmButton: true,
            width: '512px',
          
          });
         } else if(data.message=="You already posted for 3 times"){
           swal.fire({
            type: 'success',
            title: 'You already posted for 3 times',
            showConfirmButton: true,
            width: '512px',
          
          });
         }
            this.dialogRef.close();
          },
          (error) => {
           

if(error.status == 403){
  this.err=error.json()
   swal.fire({
    type: 'error',
    title: 'Bid Higher than ' + '$'+ this.err.bidamount,
    showConfirmButton: true,
    width: '512px',
   
  });
}

          }
          );
      }
    });
  }

  BidSuccess() {
     swal.fire({
      type: 'success',
      title: 'Added Offer Successfully',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

 
  bidclosed()
  {

     swal.fire({
      type: 'error',
      title: 'Bid is Closed',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onlyNumberKey(event){
    let charCode = (event.query) ? event.query : event.keyCode;
    // console.log(charCode);
    if (charCode > 31
      && (charCode < 48 || charCode > 57))
      return false;

    return true;
  }


}

