import { Component, OnInit } from '@angular/core';
import {EventsService} from "../events/events.service";
import {GlobalService} from "../global.service";

@Component({
  selector: 'app-become-instructor',
  templateUrl: './become-instructor.component.html',
  styleUrls: ['./become-instructor.component.css']
})
export class BecomeInstructorComponent implements OnInit {
  public AllEvents;
  loaded = false;
  public userRole: string;
  constructor(private obj: EventsService, private global: GlobalService) {
    this.global.checkingUserRole$.subscribe(
      data => {
        this.userRole = data;
        // alert('Checking Role in Header' + data);
      });
  }

  ngOnInit() {
    this.obj.get_events(1).subscribe(response => {
      this.AllEvents = response;
      // console.log(this.AllEvents);
      this.loaded = true;
    });
  }

}
