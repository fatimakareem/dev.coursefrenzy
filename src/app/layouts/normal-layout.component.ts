import {
  Component, OnInit, OnDestroy, ViewChild, HostListener, AfterViewInit, ViewContainerRef,
  PLATFORM_ID, Inject
} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {ChatComponent} from '../chat/chat.component';
import {MatDialog} from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import {GlobalService} from '../global.service';
import {isPlatformBrowser} from "@angular/common";

declare const $: any;

@Component({
  selector: 'app-layout',
  templateUrl: './normal-layout.component.html'
})

export class NormalLayoutComponent implements OnInit {
  GlobalChatVar: number;
  LoggedIn: number;
  MainSearch: number;
  title = 'app';
  chatVar = 0;
  Logedin: any = '0';
  public chat;

  // ishome = localStorage.getItem('home');
  // islogin = localStorage.getItem('login');

  constructor(public dialog: MatDialog, private router: Router,
               vRef: ViewContainerRef, private global2: GlobalService, @Inject(PLATFORM_ID) private platformId: Object) {

    this.global2.openChat$.subscribe(
      data => {
        this.chat = data;
      });
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

  openChat() {
    if (this.chat === 1) {
      this.chat = 0;
    } else {
      this.chat = 1;
    }
  }

}
