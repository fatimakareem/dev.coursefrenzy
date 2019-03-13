import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Config} from '../Config';
import {NgForm} from '@angular/forms';
import {BiddingService} from './bidding.service';
import {FormControl, NgModel, Validators, ReactiveFormsModule} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';
import {AuthGuard} from "../auth-guard/auth-guard.service";
import swal from 'sweetalert2';

@Component({
  selector: 'app-bidding-dialog',
  templateUrl: './bidding-dialog.component.html',
  styleUrls: ['../events/add-event.component.css']
})
export class BiddingDialogComponent implements OnInit {

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
              public dialogRef: MatDialogRef<BiddingDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any ) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    this.add_bid_confirmation();
  }
  err;
  add_bid_confirmation() {
     swal.fire({
      title: 'Are you sure you want to add bid on this course? <br> You will not be able to revert this!',
      type: 'question',
      showCancelButton: true,
      width: '512px',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText:'No'
    }).then((result) => {
      if (result.value) {
        this.obj.add_bid(this.model.bid_amount, this.data.bid_id).subscribe(
          data => {
            this.BidSuccess();
            this.dialogRef.close();
          },
          (error) => {
           
//             if(error.status==404){
//               this.bidclosed();
// }
if(error.status == 403){
  this.err=error.json()
  console.log(this.err.bidamount ,this.err,'kkkkkk')
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
      title: 'Added Bid Successfully',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  // BidError() {
  //    swal.fire({
  //     type: 'error',
  //     title: 'Error <br> Failed to add bid!',
  //     // text: 'Failed to approve course!',
  //     showConfirmButton: false,
  //     width: '512px',
  //     timer: 2500
  //   })
  // }
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
