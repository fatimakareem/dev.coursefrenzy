import { Component, OnInit } from '@angular/core';
import {ChatComponent} from '../chat/chat.component';
import {MatDialog} from '@angular/material';
import {GlobalService} from "../global.service";
import {FormControl, NgForm, Validators} from "@angular/forms";
import {FooterService} from "./footer.service";
import swal from 'sweetalert2'


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public Categories: any;
  public model : any;
  loaded = false;
  email_regex = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.email_regex),
    Validators.maxLength(100)
  ]);

  constructor(
    public dialog: MatDialog,
    private obj: FooterService,
    private global: GlobalService) {

    this.global.Categories$.subscribe(
      data => {
        this.Categories = data;
        console.log(this.Categories)
      });
  }
  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ChatComponent, {
      width: '400px',
      height: '530px'
    });
  }

  onSubmit(email) {
    this.obj.subscribe_us(email).subscribe(
      data => {
        console.log(data);
        FooterComponent.contactSuccess();
      },
      error => {

      }
    );

  }
  static contactSuccess() {
     swal.fire({
      type: 'success',
      title: 'Thanks For Subscription!',
      text: 'Now You will Recieve all Coursefrenzy news and letters!',
      showConfirmButton: false,
      timer: 2500
    })
  }

}
