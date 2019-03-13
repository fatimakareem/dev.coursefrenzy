import {
  Component, OnInit, OnDestroy, ViewChild, HostListener, AfterViewInit, ViewContainerRef,
  PLATFORM_ID, Inject
} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {ChatComponent} from '../../chat/chat.component';
import {MatDialog} from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import {GlobalService} from '../../global.service';
import {isPlatformBrowser} from "@angular/common";
import {FormBuilder, FormGroup} from '@angular/forms';

declare const $: any;

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})

export class AdminLayoutComponent implements OnInit {
  options: FormGroup;

  // constructor(fb: FormBuilder) {
  //   this.options = fb.group({
  //     bottom: 0,
  //     fixed: false,
  //     top: 0
  //   });
  // }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  GlobalChatVar: number;
  LoggedIn: number;
  MainSearch: number;
  title = 'app';
  chatVar = 0;
  Logedin: any = '0';
  public isClassVisible = false;
  // ishome = localStorage.getItem('home');
  // islogin = localStorage.getItem('login');

  constructor(public dialog: MatDialog, private router: Router,
              vRef: ViewContainerRef, private global2: GlobalService, @Inject(PLATFORM_ID) private platformId: Object, private fb: FormBuilder) {
    // this.LoggedIn = global2.logedin;



    // this.GlobalChatVar = global2.globalChatVar;
    // this.global2.caseNumber$.subscribe(
    //   data => {
    //     // console.log('Sibling1Component-received from sibling2: ' + data);
    //     this.GlobalChatVar = data;
    //     this.LoggedIn = data;
    //     // alert("normal layout "+this.GlobalChatVar);
    //   });

    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0
    });

  }
  openNav() {
    document.getElementById("mySidenav").style.display = "block";
  }
  
  closeNav() {
    document.getElementById("mySidenav").style.display = "none";
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


  ngOnInit() {
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

  changefunction() {
    this.isClassVisible = true;
  }

  // openChat(): void {
  //   if(this.btnChat)
  //     this.btnChat = false;
  //   else
  //     this.btnChat = true;
  // }



  openChat() {
    if (this.chatVar === 1) {
      this.chatVar = 0;
    } else {
      this.chatVar = 1;
    }
  }

}
