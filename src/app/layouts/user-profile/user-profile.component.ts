import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Http} from '@angular/http';
import {UserProfileService} from '../../user-profile/user-profile.service';
import { OnDestroy, ViewChild, HostListener, AfterViewInit, ViewContainerRef, PLATFORM_ID, Inject } from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {ChatComponent} from '../../chat/chat.component';
import {MatDialog} from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import {GlobalService} from '../../global.service';
import {isPlatformBrowser} from "@angular/common";
import {Config} from '../../Config';
import {BasicInfoService} from '../../basic-info/basic-info.service';

declare const $: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [UserProfileService]
})
export class UserProfileComponent implements OnInit {
  public model: any = {};
  name: any;
  page: number;
  GlobalChatVar: number;
  LoggedIn: number;
  MainSearch: number;
  title = 'app';
  chatVar = 0;
  Logedin: any = '0';
  IsLogedIn: boolean;
  PictureCheck = false;
  MaxPictureCheck = false;
  ShowPictureError = false;
  arrayIndex = 0;
  private base64textString= '';
  private base64textString1= '';
  sizeLimit = 2000000;
  Fixed = true;
  base64textStringforPic: any [];
  ALLbase64textStringforPic= {0: 'dfghjk'};
  public uname;
  public ImageUrl = Config.staticStorageImages;
  Addbestoffer = false;
  Auction = true;
  file: any;
  file1: any;
  files: FileList;
  public ProfileData: any;
  private loaded = false;
  islogin: boolean;

  constructor(public dialog: MatDialog, private router: Router,
              vRef: ViewContainerRef, private global2: GlobalService, @Inject(PLATFORM_ID) private platformId: Object, private obj: UserProfileService, private obj2: BasicInfoService) {


    // this.LoggedIn = global2.logedin;
    this.islogin = this.isAuthenticated();



    // this.GlobalChatVar = global2.globalChatVar;
    // this.global2.caseNumber$.subscribe(
    //   data => {
    //     // console.log('Sibling1Component-received from sibling2: ' + data);
    //     this.GlobalChatVar = data;
    //     this.LoggedIn = data;
    //     // alert("normal layout "+this.GlobalChatVar);
    //   });

  }


  ngAfterViewInit() {
    // console.log('show page  ',window.location);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ChatComponent, {
      width: '400px',
      height: '530px',
      // data: {name: this.name, animal: this.animal}
    });
  }
  openNav() {
    document.getElementById("mySidenav").style.display = "block";
  }
  
  closeNav() {
    document.getElementById("mySidenav").style.display = "none";
  }
  ngOnInit() {
    this.fun_get_user_profile_pic();
   
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    if (isPlatformBrowser(this.platformId)) {
      this.Logedin = localStorage.getItem("loged_in");
      // alert("normal layout "+this.Logedin);
    }
    this.global2.caseNumber$.subscribe(
      data => {
        // console.log('Sibling1Component-received from sibling2: ' + data);
        this.Logedin = data;
        // alert("header "+this.Logedin);
      });
  }

fun_get_user_profile_pic()
{
  this.obj2.get_profile().subscribe(response => {
    this.ProfileData = response;
    this.loaded = true;
    this.model.profilePhoto = this.ProfileData.profilePhoto;
  });
}
  openChat() {
    if (this.chatVar === 1) {
      this.chatVar = 0;
    } else {
      this.chatVar = 1;
    }
  }
  isAuthenticated() {
    // alert("dsfd")
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('username');
      this.uname = user;
      // console.log(this.uname)
      if (user !== '' && user) {
        return this.IsLogedIn = true;
      } else {
        return this.IsLogedIn = false;
      }
    }
  }
}
