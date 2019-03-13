import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, NgForm, FormControl} from '@angular/forms';
import {UploadCoursesService} from '../upload-courses/upload-courses.service';
import {Config} from '../Config';
import {CourseCheckoutService} from "./course-checkout.service";
import {GlobalService} from "../global.service";
import swal from 'sweetalert2';
import { PaymentmethodsService } from '../paymentmethods/paymentmethods.service';
import { Response } from '@angular/http';
@Component({
  selector: 'app-course-checkout',
  templateUrl: './course-checkout.component.html',
  styleUrls: ['./course-checkout.component.css', '../events/add-event.component.css']
})
export class CourseCheckoutComponent implements OnInit {
  public model: any = {};
  public coursesList: any;
  public loaded = false;
  public ImageUrl = Config.ImageUrl;
  public GlobalCartCourses: any=[];
  public emptyCart: boolean;
  public total: number = 0;
  public totalflag: boolean=false;
  public data: boolean=false;
  var_get_status;
  var_get_id;
  CCV: FormGroup;
  card_opeation=[
    {value: 'Visa', viewValue: 'Visa Card'},
    {value: 'Mastercard', viewValue: 'Master Card'},
    {value: 'American Express', viewValue: 'American Express'},
    {value: 'Discover', viewValue: 'Discover'}
    
    ];
  CardNumber = '^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$';
  ExpiryDate= '([0-9]{2}[/]?){2}';
  
  ExpiryDateForm = new FormControl('', [
    Validators.required,
    Validators.pattern('(0[1-9]|10|11|12)/[0-9]{2}$'),
  ]);

  CardNumberForm = new FormControl('', [
    Validators.required,
  ]);

  CardCodeForm = new FormControl('', [
    Validators.required,
  
  ]);
  Holdername = new FormControl('', [
    Validators.required
  ]);
  CardtypeForm = new FormControl('', [
    Validators.required,
    
  ]);
  Carddefault = new FormControl('', [
   
    
  ]);
  // TotalAmountForm = new FormControl('', [
  //   Validators.required
  // ]);
  expirydate;
  chek(val){
    
    this.expirydate=val.toString().slice(3,5);
  
  }
  public mask=function(rawValue) {
    if (rawValue && rawValue.length > 0) {
        if (rawValue[0] == '0' || rawValue[5] == '1') {
            return [/[01]/, /[1-9]/, '/',  /[0-9]/, /[0123456789]/];
        } else {
            return [/[01]/, /[0-2]/, '/',  /[0-9]/, /[0123456789]/];
        }
    }
    return [/[01]/, /[0-9]/, '/',  /[0-9]/, /[0123456789]/];
    
}
  endRequest ;
  public ccvmask =[/[0-9]/, /\d/, /\d/];
  public cardmask =[/[0-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(private obj: UploadCoursesService,private obj_payment_service:PaymentmethodsService, private obj2: CourseCheckoutService, private global: GlobalService, private formBuilder: FormBuilder ) {
   
    this.global.GlobalCartCourses$.subscribe(
      data => {
        if(data.length===0){
          this.GlobalCartCourses = [];
        }else{
          this.GlobalCartCourses = data;
          this.totalcarts=data.totalItems;
          this.seeTotal();
        }

      });

    this.global.emptyCartGlobal$.subscribe(
      data => {
        this.emptyCart = data;
      
      });

  }
  totalcarts;
  ShowButton(var_type_atm) {
    if (var_type_atm == "American Express") {
     this.cardmask = [/[3]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]
     this.ccvmask=[/[0-9]/, /\d/, /\d/,/\d/]
    }
    else if (var_type_atm == "Visa") {
     this.cardmask=[/[4]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
     this.ccvmask=[/[0-9]/, /\d/, /\d/]
    }
    else if (var_type_atm == "Mastercard") {
      this.cardmask=[/[5]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      this.ccvmask=[/[0-9]/, /\d/, /\d/]
     } else{
      this.cardmask=[/[6]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      this.ccvmask=[/[0-9]/, /\d/, /\d/]
     }
  }
 
  getcart(){
    
      this.obj2.get_checkout_courses().subscribe(response => {
        if(response.hasOwnProperty("status")) {
          this.emptyCart = response.status;
          this.GlobalCartCourses = [];

        }
        else {
          this.GlobalCartCourses = response;
          this.totalcarts=response.totalItems
          this.global.getGolbalCartCourses(this.GlobalCartCourses);
          this.emptyCart = false;
        }
      });
    
  }
  ngOnInit() {
 
    if(this.GlobalCartCourses.length > 0) {
      this.emptyCart = false;
    }
    return this.obj_payment_service.showCards().subscribe(Response =>{
          this.res=Response;
    })
  }
  
  seeTotal(){
      this.total = 0;
      for(let list of this.GlobalCartCourses.courses) {
        console.log(list.course.actual_price);
        if(list.promocode === null) {
        this.total = this.total + list.course.actual_price;

        }
        else {
          this.total = this.total + Number(list.promocode.actual);
        }
        console.log(this.total);
      }
      this.totalflag = !this.totalflag;
  }
 
  removeFromCart(index, course_id) {
    console.log(index);
    console.log(course_id);
     swal.fire({
      title: 'Are you sure you want to remove this course from cart? <br> You will not be able to revert this!',
      type: 'question',
      showCancelButton: true,
      width: '512px',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.value) {
        this.obj2.removeFromCart(course_id).subscribe(
          data => {
            console.log(data);
            this.getcart();
            this.seeTotal();
            CourseCheckoutComponent.removeFromCartSuccess();
          },
          error => {
            // console.log(error);
            CourseCheckoutComponent.removeFromCartError();
          }
        );
      }
    })
  }


  static removeFromCartSuccess() {
     swal.fire({
      type: 'success',
      title: 'Course Removed From Cart Successfully',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static removeFromCartError() {
     swal.fire({
      type: 'error',
      title: 'Oops <br> Failed to remove from cart!',
      // text: 'Failed to approve course!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }
  status;
  res;

updefault;
isright:boolean=false;
set_default:boolean=false;
Add_new(){
if(this.set_default==true){
  this.isright=false;
}else if(this.set_default==false){
this.isright=true;

}
}
onSubmit() {
  if(this.isright){
    this.obj2.add_payment(this.isright,this.model.cardNumber.split('-').join(''), this.model.expirationdate.split('/').join(''), this.model.cardcod, this.model.amount,this.var_get_id,this.var_get_status,this.model.cardtype,this.model.holdername).subscribe( data => {
     
      if(data.status==false){
         swal.fire({
          type: 'error',
          title: 'Oops <br> Something Went Worng!',
          // text: 'Failed to approve course!',
          showConfirmButton: false,
          width: '512px',
          timer: 2500
        })
      }else{
         swal.fire({
          type: 'success',
          title: 'Payment Successfully Done',
          showConfirmButton: false,
          width: '512px',
          timer: 2500
        })
      }
    });
    
  }else if(!this.isright){
    this.obj2.add_payment(this.isright,this.model.defaultcard, this.model.expirationdate, this.model.cardcod, this.model.amount,this.var_get_id,this.var_get_status,this.model.cardtype,this.model.holdername).subscribe(data => {
      if(data.status==false){
         swal.fire({
          type: 'error',
          title: 'Oops <br> Something Went Worng!',
          // text: 'Failed to approve course!',
          showConfirmButton: false,
          width: '512px',
          timer: 2500
        })
      }else{
         swal.fire({
          type: 'success',
          title: 'Payment Successfully Done',
          showConfirmButton: false,
          width: '512px',
          timer: 2500
        })
      }
    });
    
  }
 
}


}
