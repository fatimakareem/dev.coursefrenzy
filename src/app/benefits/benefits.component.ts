import {Component, Inject, OnInit} from '@angular/core';
import {HomeService} from '../home/home.service';
import {Config} from '../Config';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {NgForm} from '@angular/forms';
import {GlobalService} from '../global.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html'
})
export class BenefitsComponent implements OnInit {
  public Specialities: any;
  public UserRole: any;
  loaded = false;
  public ImageUrl = Config.api;
  private userRole: string;

  constructor(private obj: HomeService, public dialog: MatDialog, private  global: GlobalService) {
    this.global.checkingUserRole$.subscribe(
      data => {
        this.userRole = data;
      });
  }

  ngOnInit() {

    this.obj.get_specialities().subscribe(response => {
      this.Specialities = response;
      this.loaded = true;
    });
  }

  openDialog(index): void {
    console.log(this.Specialities[index]);
    const dialogRef = this.dialog.open(EditBenefitsComponent, {
      width: '500px',
       data: {benefit_data: this.Specialities[index]},
    });
  }
}


@Component({
  selector: 'app-edit-benefits',
  templateUrl: '../benefits/edit-benefits.component.html',
  styleUrls: ['../events/add-event.component.css']
})

export class EditBenefitsComponent implements OnInit {
  public model: any = {};
  private loaded = false;
  public benefits: any;
  public ImageUrl = Config.api;
  public id;

  name: any;
  page: number;
  PictureCheck = false;
  MaxPictureCheck = false;
  ShowPictureError = false;
  arrayIndex = 0;
  private base64textString = '';
  private base64textString1 = '';
  sizeLimit = 2000000;
  Fixed = true;
  base64textStringforPic: any [];
  ALLbase64textStringforPic = {0: 'dfghjk'};

  Addbestoffer = false;
  Auction = true;
  file: any;
  file1: any;
  files: FileList;

  clicked = false;
  color = 'accent';
  checked = false;
  disabled = false;

  constructor(private obj: HomeService, public dialogRef: MatDialogRef<EditBenefitsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any ) { }

  ngOnInit() {
    // this.obj.get_single_benefit(this.data.benefit_id).subscribe(response => {
    //   this.benefits = response;
      // console.log(this.benefits);
      // this.loaded = true;
      console.log(this.data.benefit_data.heading);
      this.model.heading = this.data.benefit_data.heading;
      this.model.description = this.data.benefit_data.description;
      this.model.icon = this.data.benefit_data.icon;
    // });
  }

  onSubmit(f: NgForm) {
    this.obj.update_benefits(this.data.benefit_data.id, this.model.heading, this.model.description, this.base64textString).subscribe(
      data => {
   //     console.log(data);
        this.dialogRef.close();
        this.EditSuccess();
      },
      error => {
        // console.log(error);
      }
    );
  }


  EditSuccess() {
     swal.fire({
      type: 'success',
      title: 'Success! <br> Changes Saved!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onChange(event: EventTarget) {
    const eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    this.files = target.files;
    if (this.files.length >= 0 && this.files.length < 5) {

      this.MaxPictureCheck = false;
      this.file = this.files[0];

      this.PictureCheck = true;
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(this.file);

      if (this.files.length > 0 && this.files.length < 5) {

        for (let a = 1; a < (this.files.length); a++) {
          this.file1 = this.files[a];
          const reader1 = new FileReader();
          reader1.onload = (e: any) => {
            this._handleReaderLoadedforALl(e, a - 1);
          };
          reader1.readAsBinaryString(this.file1);
        }
        // console.log('Done change');
        // console.log(this.ALLbase64textStringforPic);
      }
    } else {
      this.MaxPictureCheck = true;
    }

  }

  _handleReaderLoadedforALl(readerEvt, index) {
    const binaryString = readerEvt.target.result;
    this.ALLbase64textStringforPic[index] = btoa(binaryString);
    // console.log(this.ALLbase64textStringforPic);
    this.arrayIndex += 1;
  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);

  }

}
