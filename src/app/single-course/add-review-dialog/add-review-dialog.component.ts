import {Component, Inject, OnInit} from '@angular/core';
import swal from 'sweetalert2';
import {Config} from "../../Config";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {UploadCoursesService} from "../../upload-courses/upload-courses.service";
import {HeaderService} from "../../header/header.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-add-review-dialog',
  templateUrl: './add-review-dialog.component.html',
  styleUrls: ['../single-course.component.css']
})
export class AddReviewDialogComponent implements OnInit {
  public course_image: string;
  public ImageUrl = Config.ImageUrl;
  private EditCourseData: any = [];
  public isEditForm: boolean = false;
  name: any;
  page: number;
  public isLinear = true;
  skill: string;
  public Categories;
  public SubCategories;
  public loaded = false;

  Auction = true;
  file: any;
  file1: any;
  files: File;
  input;
  clicked = false;
  public model: any = {};
  color = 'accent';
  checked = false;
  disabled = false;

  formGroup: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  Name = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9_.+-, !@#$%^&*()<>{}|=~]+?')]);

  Price = new FormControl('', [
    Validators.required,
    Validators.pattern('NUMBER_REGEX')]);



  Discount = new FormControl('', [
    Validators.required,
    Validators.pattern('NUMBER_REGEX')]);


  constructor(private obj: UploadCoursesService, private obj2: HeaderService, public dialogRef: MatDialogRef<AddReviewDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private _formBuilder: FormBuilder) {
    if(data.course_data){
      this.EditCourseData = data.course_data;
      this.isEditForm = data.isEditForm;
      console.log('Edit Course Data',this.EditCourseData);
      console.log(this.isEditForm);
      // this.model = data.course_data;
      this.model.course_image = this.EditCourseData.course_image;
      this.model.Name = this.EditCourseData.name;
      this.model.Price = this.EditCourseData.actual_price;
      this.model.Discount = this.EditCourseData.discounted_price;
      this.model.category = this.EditCourseData.Categories[0].id;
      console.log(this.model.category);

      this.obj2.get_sub_categories(this.model.category).subscribe(response => {
        this.SubCategories = response;
        // console.log(this.SubCategories);
        this.loaded = true;
      });
      this.model.sub_category = this.EditCourseData.SubCategory[0].id;

      console.log(this.model.sub_category);

      this.model.skill = this.EditCourseData.skill;
    }

  }

  ngOnInit () {
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
  }
  getValueq(event) {
    // this.strap = event;
  }

  onNoClick(): void {
    this.dialogRef.close(1);
  }

  onSubmit(f: NgForm) {
  }


  selected(cat_id) {
    this.obj2.get_sub_categories(cat_id).subscribe(response => {
      this.SubCategories = response;
      // console.log(this.SubCategories);
      this.loaded = true;
    });
  }

  static CourseSuccess() {
     swal.fire({
      type: 'success',
      title: 'Course Added Successfully! <br> Request is sent to admin you will be notified after approval.',
      width: '512px'
    })
  }

  static CourseFailure() {
     swal.fire({
      type: 'error',
      title: 'Oops! <br>Failed to add course. Inccorrect Information!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static greaterDiscout() {
     swal.fire({
      type: 'error',
      title: 'Please review form! <br>Discount amount can not be greater than course price!',
      // showConfirmButton: false,
      width: '512px',
      // timer: 2500
    })
  }
}
