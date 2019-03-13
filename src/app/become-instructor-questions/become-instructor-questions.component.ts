import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl, NgForm} from '@angular/forms';
import {InstructorService} from "./instructor.service";
import {Router} from '@angular/router';
import swal from 'sweetalert2';
@Component({
  selector: 'app-become-instructor-questions',
  templateUrl: './become-instructor-questions.component.html',
  styleUrls: ['./become-instructor-questions.component.css']
})
export class BecomeInstructorQuestionsComponent implements OnInit {
  isLinear = true;
  video: string;
  formGroup: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  // get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }
  constructor(private router: Router, private _formBuilder: FormBuilder, private obj: InstructorService) { }

  ngOnInit() {
    this.formGroup  = this._formBuilder.group({
      firstCtrl: ['']
    });
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['']
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['']
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['']
    });
  }

  onClick() {
    this.obj.add_instructor().subscribe(
      data => {

        this.instructorSuccess();
        this.router.navigate(['/mycourses']);
      },
      error => {
        // console.log(error);
      }
    );

  }

  instructorSuccess() {
     swal.fire({
      type: 'success',
      title: 'Congratulations <br> Now you can add your own courses on CourseFrenzy',
      width: '512px',
      showConfirmButton: true
    })
  }



}
