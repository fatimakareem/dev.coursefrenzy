import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {AdminFaqsService} from "./admin-faqs.service";
import {HttpClient} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Config} from "../Config";
import swal from 'sweetalert2';

@Component({
  selector: 'app-admin-faqs',
  templateUrl: './admin-faqs.component.html',
  styleUrls: ['./admin-faqs.component.css']
})

export class AdminFaqsComponent implements OnInit{
  public loaded: boolean = false;
  public faqsList: any;
  constructor(public dialog: MatDialog, private obj: AdminFaqsService){

  }
  ngOnInit() {
    this.obj.get_all_faqs().subscribe(response => {
      this.faqsList = response;
      console.log(this.faqsList);
      this.loaded = true;
    });
  }

  openAddFaqDialog() {
    const dialogRef = this.dialog.open(AddFaqDialog, {
      width: '500px',
      data: {
        faqsList: this.faqsList
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 1) {
        this.faqsList.push(result);
        console.log(this.faqsList);
      }
    });
  }

  openEditFaqDialog(index) {
    // console.log(id);
    console.log(this.faqsList[index]);
    const dialogRef = this.dialog.open(EditFaqComponent, {
      width: '500px',
      data: {
        faqDetails: this.faqsList[index],
        faqsList: this.faqsList
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.Categories.push(result);
      if (result !== 1) {
        this.faqsList[index] = result;
      }
    });
  }


  deleteFaq(index, id) {
    console.log(id);
     swal.fire({
      title: 'Are you sure you want to delete this FAQ? <br> You will not be able to revert this!',
      type: 'question',
      showCancelButton: true,
      width: '512px',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.obj.deleteFaq(id).subscribe(
          data => {
            console.log(data);
            console.log('index' + index);
            this.faqsList.splice(this.faqsList.indexOf(this.faqsList[index]), 1);
            console.log(this.faqsList);
            this.deleteFaqSuccess();
          },
          error => {
            // console.log(error);
            this.deleteFaqError();
          }
        );
      }
    })
  }



  deleteFaqSuccess()
  {
     swal.fire({
      type: 'success',
      title: 'FAQ Deleted Successfully',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  deleteFaqError()
  {
     swal.fire({
      type: 'error',
      title: 'Error <br> Failed to delete FAQ!',
      // text: 'Failed to approve course!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }


}

@Component({
  selector: 'app-admin-faqs-dialog',
  templateUrl: './add-faqs-dialog.html',
  styleUrls: ['../events/add-event.component.css']
})

export class AddFaqDialog implements OnInit {
  loaded: boolean;
  public faqsList: any;
  input: any;
  input2: any;
  public model: any = {};

  constructor(public dialogRef: MatDialogRef<AddFaqDialog>, @Inject(MAT_DIALOG_DATA) public data: any,
              private obj: AdminFaqsService, private http: HttpClient) {
  }

  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close(1);
  }

  onSubmit(f: NgForm) {
    this.obj.addFaq(this.model.question, this.model.answer).subscribe(
      data => {
        console.log(data[0]['json'].json());
        this.dialogRef.close(data[0]['json'].json());
        this.addSuccess();
      },
      error => {
        this.addError();
      }
    );
  }

  addSuccess() {
     swal.fire({
      type: 'success',
      title: 'Success! <br> FAQ added successfully',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  addError() {
     swal.fire({
      type: 'error',
      title: 'Oops! <br> Failed to add FAQ!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

}


@Component({
  selector: 'app-edit-faqs-dialog',
  templateUrl: './edit-faqs-dialog.html',
  styleUrls: ['../events/add-event.component.css']
})

export class EditFaqComponent implements OnInit {
  loaded: boolean;
  public faqsList: any;
  input: any;
  input2: any;
  public model: any = {};
  public faq: any;

  constructor(public dialogRef: MatDialogRef<EditFaqComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              private obj: AdminFaqsService, private http: HttpClient) {
  }

  ngOnInit() {
    this.faq = this.data.faqDetails;
    // console.log("dialog"+this.category);
    this.model.question = this.faq.question;
    this.model.answer = this.faq.answer;
  }

  onNoClick(): void {
    this.dialogRef.close(1);
  }

  onSubmit(f: NgForm) {
    this.obj.editFaq(this.faq.id, this.model.question, this.model.answer).subscribe(
      data => {
        console.log(data[0]['json'].json());
        this.dialogRef.close(data[0]['json'].json());
        this.editSuccess();
      },
      error => {
        this.editError();
      }
    );
  }

  editSuccess() {
     swal.fire({
      type: 'success',
      title: 'Success! <br> FAQ added successfully',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  editError() {
     swal.fire({
      type: 'error',
      title: 'Oops! <br> Failed to add FAQ!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

}
