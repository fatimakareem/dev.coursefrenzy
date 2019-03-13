import { Component, OnInit } from '@angular/core';
// import { AgmCoreModule } from '@agm/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SingleEventService} from './single-event.service';
import {Subscription} from 'rxjs/Subscription';
import {Config} from '../Config';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  lat: any = 51.678418;
  lng: any = 7.809007;
  public SingleEvent: any;
  private EventId: number;
  loaded = false;
  private sub: Subscription;
  public ImageUrl = Config.api;
  public Image:any;

  constructor (private obj: SingleEventService, private route: ActivatedRoute,
               private router: Router) {}

  ngOnInit () {

    this.sub = this.route.params.subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.EventId = +params['query'] || 1;
        this.obj.get_event(this.EventId).subscribe(response => {
          this.SingleEvent = response;
          this.Image =this.ImageUrl + 'media/' + this.SingleEvent.EventImage;
        //  console.log(this.SingleEvent);
          // alert(this.SingleEvent.Latitude);
          // alert(this.SingleEvent.Longitude);
          this.lat = parseFloat(this.SingleEvent.Latitude);
          this.lng = parseFloat(this.SingleEvent.Longitude);
          // alert(this.lat);
          // alert(this.lng);
          this.loaded = true;
        });
      });
  }
}

