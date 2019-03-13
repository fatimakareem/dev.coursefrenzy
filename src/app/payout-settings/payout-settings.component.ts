import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';
import * as moment from 'moment';
import { Subscription } from 'rxjs/Subscription';
import { Router } from "@angular/router";

import {UserProfileService} from '../user-profile/user-profile.service';
@Component({
  selector: 'app-payout-settings',
  templateUrl: './payout-settings.component.html',
  styleUrls: ['./payout-settings.component.scss']
})
export class PayoutSettingsComponent implements OnInit {

  public model: any = {};
  firstName = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z]+?')
  ]);
  form = new FormGroup({
    cardnumber: new FormControl('', [
      Validators.minLength(16),
      Validators.maxLength(16),
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    ccv: new FormControl('', [
      Validators.minLength(4),
      Validators.maxLength(4),
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    expirydate: new FormControl('', [
      Validators.required,
      Validators.pattern('(0[1-9]|10|11|12)/20[0-9]{2}$')
    ]),
    cardnickname: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.required
    ]),
    check: new FormControl(),
  });

  updateForm = new FormGroup({
    // cardnumber2: new FormControl('', [
    //   Validators.minLength(16),
    //   Validators.maxLength(16),
    //   Validators.required,
    //   Validators.pattern('^[0-9]*$')
    // ]),
    ccv2: new FormControl('', [
      Validators.minLength(4),
      Validators.maxLength(4),
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    expirydate2: new FormControl('', [
      Validators.required,
      Validators.pattern('(0[1-9]|10|11|12)/20[0-9]{2}$')
    ]),
    cardnickname2: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.required
    ]),
    check2: new FormControl(),
  });
  private productsSource;
  currentProducts;
  private sub: Subscription;
  flipclass = 'credit-card-box';
  date;
  res;
  cardid = "";
  card;
  constructor( private obj: UserProfileService, private route: ActivatedRoute,private router: Router ) { }


  ngOnInit() {
    this.form.controls['check'].setValue(false);
    this.getCards();
  }

  // onSubmit(f: NgForm) {
  //   // console.log(this.base64textString);
  //   this.obj.user_profile(this.model.firstName, this.model.lasttName, this.base64textString, this.model.headLine
  //     , this.model.biography, this.model.language, this.model.website, this.model.Git, this.model.twitter
  //     , this.model.facebook, this.model.linkedIn, this.model.youtube).subscribe(
  //     data => {
  //       // console.log(data);
  //     },
  //     error => {
  //       // console.log(error);
  //     }
  //   );
  // }
  // onChange(event: EventTarget) {
  //   const eventObj: MSInputMethodContext = <MSInputMethodContext> event;
  //   const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
  //   this.files = target.files;
  //   if (this.files.length >= 1 && this.files.length < 5) {
  //
  //     this.MaxPictureCheck = false;
  //     this.file = this.files[0];
  //
  //     this.PictureCheck = true;
  //     const reader = new FileReader();
  //     reader.onload = this._handleReaderLoaded.bind(this);
  //     reader.readAsBinaryString(this.file);
  //
  //     if (this.files.length > 1 && this.files.length < 5) {
  //
  //       for (let a = 1; a < (this.files.length); a++) {
  //         // alert(a);
  //         this.file1 = this.files[a];
  //         const reader1 = new FileReader();
  //         reader1.onload = (e: any) => {
  //           this._handleReaderLoadedforALl(e, a - 1);
  //         };
  //         // this._handleReaderLoadedforALl.bind(this.file1, a-1);
  //         reader1.readAsBinaryString(this.file1);
  //       }
  //       // console.log('Done change');
  //       // console.log(this.ALLbase64textStringforPic);
  //     }
  //   } else {
  //     this.MaxPictureCheck = true;
  //   }
  //
  // }
  // _handleReaderLoadedforALl(readerEvt, index) {
  //   // console.log('attt  ',index);
  //   const binaryString = readerEvt.target.result;
  //   // console.log('123456');
  //   // console.log('asdfghjk   ',btoa(binaryString))
  //   // // this.arrayIndex=0;
  //
  //   this.ALLbase64textStringforPic[index] = btoa(binaryString);
  //   // console.log(this.ALLbase64textStringforPic);
  //   this.arrayIndex += 1;
  // }
  //
  // _handleReaderLoaded(readerEvt) {
  //   const binaryString = readerEvt.target.result;
  //   this.base64textString = btoa(binaryString);
  // }

  getSingleCard(id) {
    this.obj.singleCard(id).subscribe(Data => {
      this.card = Data;

      let expDate = this.card.expiryDate;
      expDate = expDate.substring(0, expDate.length - 3);
      expDate = moment(expDate).format('MM/YYYY');

      this.cardid = this.card.id;
      this.updateForm.controls['cardnickname2'].setValue(this.card.nickname);
      this.updateForm.controls['expirydate2'].setValue(expDate);
      this.updateForm.controls['check2'].setValue(this.card.default);
      this.updateForm.controls['ccv2'].setValue(this.card.ccv);
      this.updateForm.controls['cardnumber2'].setValue(this.card.cardNumber);
    })
  }
  updateSingleCard(id) {

    this.date = this.updateForm.value['expirydate2'];
    this.date = moment(this.date).format('YYYY-MM') + '-01';

    if (this.updateForm.valid) {
      this.obj.updateCard(this.updateForm.value['ccv2'], this.date, this.updateForm.value['cardnickname2'], this.updateForm.value['check2'], id).subscribe(Data => {
           swal.fire({
            type: 'success',
            title: 'Credit card details are updated!',
            showConfirmButton: false,
            timer: 1500
          })
          this.getCards();

        },
        error => {
          if (error.status == 400) {
             swal.fire({
              type: 'error',
              title: 'Credit card details are not correct!',
              showConfirmButton: false,
              timer: 1500
            })
          }
          else if (error.status == 500) {
             swal.fire(
              'Sorry',
              'Server is under maintenance!',
              'error'
            )
          }
          else {
             swal.fire(
              'Sorry',
              'Some thing went worrng!',
              'error'
            )
          }
        })
    }
    else {
       swal.fire({
        type: 'error',
        title: 'Credit card details are not correct!',
        showConfirmButton: false,
        timer: 1500
      })
    }

  }
  deleteSingleCard(id) {
    this.obj.deleteCard(id).subscribe(Data => {
         swal.fire({
          type: 'success',
          title: 'Credit card is deleted!',
          showConfirmButton: false,
          timer: 1500
        })
        this.getCards();
      },
      error => {
        if (error.status == 204) {
           swal.fire({
            type: 'error',
            title: 'No credit card found!',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else if (error.status == 500) {
           swal.fire(
            'Sorry',
            'Server is under maintenance!',
            'error'
          )
        }
        else {
           swal.fire(
            'Sorry',
            'Some thing went worrng!',
            'error'
          )
        }
      })
  }
  add() {
    if (this.form.valid) {

      this.date = this.form.value['expirydate'];
      this.date = moment(this.date).format('YYYY-MM') + '-01';

      this.obj.addCard(this.form.value['cardnumber'], this.form.value['ccv'], this.date, this.form.value['cardnickname'], this.form.value['check']).subscribe(Data => {
           swal.fire({
            type: 'success',
            title: 'Payment method is listed!',
            showConfirmButton: false,
            timer: 1500
          })
          this.getCards();
        },
        error => {
          if (error.status == 404) {
             swal.fire({
              type: 'error',
              title: 'This card already exist!',
              showConfirmButton: false,
              timer: 1500
            })
          }
          else if (error.status == 400) {
             swal.fire({
              type: 'error',
              title: 'Please enter correct details!',
              showConfirmButton: false,
              timer: 1500
            })
          }
          else if (error.status == 500) {
             swal.fire(
              'Sorry',
              'Server is under maintenance!',
              'error'
            )
          }
          else {
             swal.fire(
              'Sorry',
              'Some thing went worrng!',
              'error'
            )
          }
        })
    }
    else {
       swal.fire({
        type: 'error',
        title: 'Please enter correct details!',
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }
  getCards() {
    this.obj.showCards().subscribe(Data => {
        this.res = Data;
      },
      error => {
        if (error.status == 404) {
           swal.fire({
            type: 'error',
            title: 'Credit card not found!',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else if (error.status == 500) {
           swal.fire(
            'Sorry',
            'Server is under maintenance!',
            'error'
          )
        }
      })
  }
}
