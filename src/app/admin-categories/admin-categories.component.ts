import {Component, Inject, OnInit} from '@angular/core';
import {GlobalService} from "../global.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {NgForm} from "@angular/forms";
import swal from 'sweetalert2';
import {AdminCategoriesService} from "./admin-categories.service";
import {HttpClient} from "@angular/common/http";
import {Config} from "../Config";
import {FormControl, NgModel, Validators, ReactiveFormsModule} from '@angular/forms';
import {HeaderService} from "../header/header.service";

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']

})
export class AdminCategoriesComponent implements OnInit {
  public Categories: any;


  constructor(private global: GlobalService, public dialog: MatDialog, private obj: AdminCategoriesService,
              private _headerService: HeaderService) {
    this.global.Categories$.subscribe(
      data => {
        this.Categories = data;
      });
  }

  ngOnInit() {
    // this.global.getCategories(this.Categories);
    this._headerService.get_categories().subscribe(response => {
      this.Categories = response;
      // this.UserRole = this.getingRoleData.Role;
      // alert('Home Role' + this.UserRole);
      this.global.getCategories(this.Categories);
      // this.loaded = true;
    });
  }

  openAddCategoryDialog() {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '500px',
      data: {
        Categories: this.Categories
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 1) {
        this.Categories.push(result);
        console.log(this.Categories);
      }
    });
  }

  openAddSubCategoryDialog(index) {
    // console.log(this.Categories[index]);
    const dialogRef = this.dialog.open(AddSubCategoryComponent, {
      width: '500px',
      data: {
        Categories: this.Categories[index]
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 1) {
        this.Categories[index].category.push(result);
        console.log(this.Categories[index].category);
      }
    });
  }


  openEditCategoryDialog(index) {
    // console.log(id);
    console.log(this.Categories[index]);
    const dialogRef = this.dialog.open(EditCategoryComponent, {
      width: '500px',
      data: {
        categoryDetails: this.Categories[index],
        Categories: this.Categories
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 1) {
        this.Categories[index] = result;
      }
    });
  }

  openEditSubCategoryDialog(catIndex, subCatIndex) {
    // console.log(catIndex);
    // console.log(subCatIndex);
    // console.log(this.Categories[catIndex].category[subCatIndex]);
    // console.log(this.Categories[catIndex].id);
    const dialogRef = this.dialog.open(EditSubCategoryComponent, {
      width: '500px',
      data: {
        subCategoryDetails: this.Categories[catIndex].category[subCatIndex]
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.Categories[index].category.push(result);
      console.log(result);
      if (result !== 1) {
        this.Categories[catIndex].category[subCatIndex] = result;
      }
      // console.log(this.AllChapters);
    });
  }

  static deleteCategorySuccess()
  {
     swal.fire({
      type: 'success',
      title: 'Category Deleted Successfully',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static deleteCategoryError()
  {
     swal.fire({
      type: 'error',
      title: 'Error <br> Failed to delete category!',
      // text: 'Failed to approve course!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static deleteSubCategorySuccess()
  {
     swal.fire({
      type: 'success',
      title: 'Sub Category Deleted Successfully',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static deleteSubCategoryError()
  {
     swal.fire({
      type: 'error',
      title: 'Error <br> Failed to delete sub category!',
      // text: 'Failed to approve course!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  deleteCategory(id, index) {
    console.log(id);
     swal.fire({
      title: 'Are you sure you want to delete this category? <br> You will not be able to revert this!',
      type: 'question',
      showCancelButton: true,
      width: '512px',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.obj.deleteCategory(id).subscribe(
          data => {
            console.log(data);
            console.log('index' + index);
            this.Categories.splice(this.Categories.indexOf(this.Categories[index]), 1);
            console.log(this.Categories);
            AdminCategoriesComponent.deleteCategorySuccess();
          },
          error => {
            // console.log(error);
            AdminCategoriesComponent.deleteCategoryError();
          }
        );
      }
  })
}

  deleteSubCategory(indexofCat, indexofSubCat, subCatId) {
   swal.fire({
    title: 'Are you sure you want to delete this sub category? <br> You will not be able to revert this!',
    type: 'question',
    showCancelButton: true,
    width: '512px',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
      this.obj.deleteSubCategory(subCatId).subscribe(
        data => {
          console.log(data);
          // this.Categories.splice(this.Categories[index]);
          this.Categories[indexofCat].category.splice(this.Categories[indexofCat].category.indexOf(this.Categories[indexofCat].category[indexofSubCat]), 1);
          // this.Categories.splice(this.Categories.indexOf(this.Categories[index]),1);
          AdminCategoriesComponent.deleteSubCategorySuccess();
        },
        error => {
          // console.log(error);
          AdminCategoriesComponent.deleteSubCategoryError();
        }
      );
    }
  })
}


}

@Component({
  selector: 'add-category-dialog',
  templateUrl: 'add-category-dialog.html',
  styleUrls: ['../events/add-event.component.css']
})

export class AddCategoryComponent implements OnInit {
  input: any;
  input2: any;
  public model: any = {};
  public category: any;
  public categoryName: any;
  public categoryIcon: any;
  public categoryWebImage: string;
  public categoryIosImage: string;

  constructor(public dialogRef: MatDialogRef<AddCategoryComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              private obj: AdminCategoriesService, private http: HttpClient) {
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close(1);
  }

  onSubmit(f: NgForm) {
    this.http.post(
      Config.ImageUploadUrl,
      this.input, {responseType: 'text'}).subscribe(data => {
      this.categoryIosImage = data;
      // alert(this.categoryIosImage);
      this.addIosImage();
    });
  }

  addIosImage() {
    this.http.post(
      Config.ImageUploadUrl,
      this.input2, {responseType: 'text'}).subscribe(data => {
      this.categoryWebImage = data;
      // alert(this.categoryWebImage);
      this.ifImageUpload();
    });
  }

  private ifImageUpload() {
    this.obj.addCategory(this.model.categoryName, this.model.categoryIcon, this.categoryIosImage, this.categoryWebImage).subscribe(
      data => {
        console.log(data[0]['json'].json());
        this.dialogRef.close(data[0]['json'].json());
        AddCategoryComponent.addSuccess();
      },
      error => {
        AddCategoryComponent.addError();
      }
    );
  }

  onChange(event: EventTarget) {
    this.input = new FormData();
    const eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    this.input.append('fileToUpload', target.files[0]);
  }

  onChange2(event: EventTarget) {
    this.input2 = new FormData();
    const eventObj2: MSInputMethodContext = <MSInputMethodContext> event;
    const target2: HTMLInputElement = <HTMLInputElement> eventObj2.target;
    this.input2.append('fileToUpload', target2.files[0]);
  }

  static addSuccess() {
     swal.fire({
      type: 'success',
      title: 'Success! <br> Category added successfully',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static addError() {
     swal.fire({
      type: 'error',
      title: 'Oops! <br> Failed to add category!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

}

@Component({
  selector: 'add-subcategory-dialog',
  templateUrl: 'add-subcategory-dialog.html',
  styleUrls: ['../events/add-event.component.css']
})

export class AddSubCategoryComponent implements OnInit {
  subCategoryWebImage: string;
  subCategoryIosImage: string;
  public model: any = {};
  input: any;
  input2: any;
  public category: any;
  public categoryName: any;
  public categoryIcon: any;

  constructor(public dialogRef: MatDialogRef<AddSubCategoryComponent>, private http: HttpClient,
              @Inject(MAT_DIALOG_DATA) public data: any, private obj: AdminCategoriesService) {
  }

  ngOnInit() {
    // this.catId = this.data.Categoy
  }

  onNoClick(): void {
    this.dialogRef.close(1);
  }

  onSubmit(f: NgForm) {
    this.http.post(
      Config.ImageUploadUrl,
      this.input, {responseType: 'text'}).subscribe(data => {
      this.subCategoryIosImage = data;
      // alert(this.subCategoryIosImage);
      this.addIosImage();
    });
  }

  addIosImage() {
    this.http.post(
      Config.ImageUploadUrl,
      this.input2, {responseType: 'text'}).subscribe(data => {
      this.subCategoryWebImage = data;
      // alert(this.subCategoryWebImage);
      this.ifImageUpload();
    });
  }

  private ifImageUpload() {
    this.obj.addSubCategory(this.data.Categories.id, this.model.subcategoryName, this.subCategoryIosImage, this.subCategoryWebImage).subscribe(
      data => {
        console.log(data[0]['json'].json());
        this.dialogRef.close(data[0]['json'].json());
        AddSubCategoryComponent.addSuccess();
      },
      error => {
        AddSubCategoryComponent.addError();
      }
    );
  }

  onChange(event: EventTarget) {
    this.input = new FormData();
    const eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    this.input.append('fileToUpload', target.files[0]);
  }

  onChange2(event: EventTarget) {
    this.input2 = new FormData();
    const eventObj2: MSInputMethodContext = <MSInputMethodContext> event;
    const target2: HTMLInputElement = <HTMLInputElement> eventObj2.target;
    this.input2.append('fileToUpload', target2.files[0]);
  }

  static addSuccess() {
     swal.fire({
      type: 'success',
      title: 'Success! <br> Sub Category added successfully',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static addError() {
     swal.fire({
      type: 'error',
      title: 'Oops! <br> Failed to add sub category!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

}


@Component({
  selector: 'edit-category-dialog',
  templateUrl: 'edit-category-dialog.html',
  styleUrls: ['../events/add-event.component.css']
})

export class EditCategoryComponent implements OnInit {
  categoryWebImage: string;
  categoryIosImage: string;
  public model: any = {};
  public category: any;
  public categoryName: any;
  public categoryIcon: any;
  public ImageUrl = Config.ImageUrl;
  input: any;
  input2: any;

  categoryNameControl = new FormControl('', [
    Validators.required
  ]);

  categoryIconControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(public dialogRef: MatDialogRef<EditCategoryComponent>, private obj: AdminCategoriesService,
              @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) {
  }

  ngOnInit() {
    this.category = this.data.categoryDetails;
    // console.log("dialog"+this.category);
    this.model.categoryName = this.category.name;
    this.model.categoryIcon = this.category.icon;
    this.model.iosImage = this.category.image_icon_ios;
    this.model.webImage = this.category.icon_Web_Home;
  }

  onNoClick(): void {
    this.dialogRef.close(1);
  }

  onSubmit(f: NgForm) {
    this.ImagesUpload();
  }
  ImagesUpload(){
    if(this.input){
      this.http.post(
        Config.ImageUploadUrl,
        this.input, {responseType: 'text'}).subscribe(data => {
        if(data==="Sorry, not a valid Image.Sorry, only JPG, JPEG, PNG & GIF files are allowed.Sorry, your file was not uploaded."){
          EditCategoryComponent.ImageUploadError();
        }else{
          this.categoryIosImage = data;
          this.model.iosImage = data;
          if(!this.input2){
            this.postData();
          }
        }
      });
    }
    if(this.input2){
      this.http.post(
        Config.ImageUploadUrl,
        this.input2, {responseType: 'text'}).subscribe(data => {
        if(data==="Sorry, not a valid Image.Sorry, only JPG, JPEG, PNG & GIF files are allowed.Sorry, your file was not uploaded."){
          EditCategoryComponent.ImageUploadError();
        }else{
          this.categoryWebImage = data;
          this.model.webImage = data;
        }
        this.postData();
      });
    }
  }

  private postData() {
    this.obj.editCategory(this.category.id, this.model.categoryName, this.model.categoryIcon, this.model.iosImage, this.model.webImage).subscribe(
      data => {
        if(data.hasOwnProperty("status")){
          EditCategoryComponent.editError();
        }else{
          console.log('displying Response From Category Edit');
          console.log(data[0]['json'].json());
          this.dialogRef.close(data[0]['json'].json());
          EditCategoryComponent.editSuccess();
        }
      },
      error => {
        EditCategoryComponent.editError();
      }
    );
  }

  onChange(event: EventTarget) {
    this.input = new FormData();
    const eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    this.input.append('fileToUpload', target.files[0]);
  }

  onChange2(event: EventTarget) {
    this.input2 = new FormData();
    const eventObj2: MSInputMethodContext = <MSInputMethodContext> event;
    const target2: HTMLInputElement = <HTMLInputElement> eventObj2.target;
    this.input2.append('fileToUpload', target2.files[0]);
  }


  static editSuccess() {
     swal.fire({
      type: 'success',
      title: 'Success! <br> Category edited',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static editError() {
     swal.fire({
      type: 'error',
      title: 'Oops! <br> Failed to edit category!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static ImageUploadError() {
     swal.fire({
      type: 'error',
      title: 'Oops! <br> Failed to Upload Image! Please Try Again!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

}

@Component({
  selector: 'edit-subcategory-dialog',
  templateUrl: 'edit-subcategory-dialog.html',
  styleUrls: ['../events/add-event.component.css']
})

export class EditSubCategoryComponent implements OnInit {
  // catId: any;
  input: any;
  input2: any;
  public model: any = {};
  public subCategory: any;
  public subCategoryName: any;
  public subCategoryIcon: any;
  public ImageUrl = Config.ImageUrl;
  categoryIosImage: string;
  categoryWebImage: string;

  constructor(public dialogRef: MatDialogRef<EditSubCategoryComponent>, private http: HttpClient, private obj: AdminCategoriesService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.subCategory = this.data.subCategoryDetails;
    // console.log("dialog"+this.subCategory);
    // console.log("dialog orig"+this.data.subCategoryDetails);
    this.model.subCategoryName = this.subCategory.name;
    this.model.subCategoryIosIcon = this.subCategory.image_icon_ios;
    this.model.subCategoryWebIcon = this.subCategory.image_web;
  }

  onNoClick(): void {
    this.dialogRef.close(1);
  }

  onSubmit(f: NgForm) {
    if(this.input){
      this.http.post(
        Config.ImageUploadUrl,
        this.input, {responseType: 'text'}).subscribe(data => {
        if(data==="Sorry, not a valid Image.Sorry, only JPG, JPEG, PNG & GIF files are allowed.Sorry, your file was not uploaded."){
          EditCategoryComponent.ImageUploadError();
        }else{
          this.categoryIosImage = data;
          this.model.subCategoryIosIcon = data;
          if(!this.input2){
            this.postData();
          }
        }
      });
    }
    if(this.input2){
      this.http.post(
        Config.ImageUploadUrl,
        this.input2, {responseType: 'text'}).subscribe(data => {
        if(data==="Sorry, not a valid Image.Sorry, only JPG, JPEG, PNG & GIF files are allowed.Sorry, your file was not uploaded."){
          EditCategoryComponent.ImageUploadError();
        }else{
          this.categoryWebImage = data;
          this.model.subCategoryWebIcon = data;
          this.postData();
        }
      });
    }
  }

  private postData() {
    this.obj.editSubCategory(this.subCategory.category, this.subCategory.id, this.model.subCategoryName, this.model.subCategoryIosIcon, this.model.subCategoryWebIcon).subscribe(
      data => {
        console.log(data[0]['json'].json());
        this.dialogRef.close(data[0]['json'].json());
        EditSubCategoryComponent.editSuccess();
      },
      error => {
        EditSubCategoryComponent.editError();
      }
    );
  }

  onChange(event: EventTarget) {
    this.input = new FormData();
    const eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    this.input.append('fileToUpload', target.files[0]);
  }

  onChange2(event: EventTarget) {
    this.input2 = new FormData();
    const eventObj2: MSInputMethodContext = <MSInputMethodContext> event;
    const target2: HTMLInputElement = <HTMLInputElement> eventObj2.target;
    this.input2.append('fileToUpload', target2.files[0]);
  }

  static editSuccess() {
     swal.fire({
      type: 'success',
      title: 'Success! <br> Sub Category edited',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  static editError() {
     swal.fire({
      type: 'error',
      title: 'Oops! <br> Failed to edit sub category!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

}
