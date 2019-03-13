import { Component, OnInit, ElementRef, NgZone, ViewChild, EventEmitter } from '@angular/core';
import {FormControl, NgModel, Validators, ReactiveFormsModule} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent} from '@angular/material';
import {NgForm} from '@angular/forms';
// import { AgmCoreModule } from '@agm/core';

import { MapsAPILoader } from '@agm/core';
import {EventsService} from './events.service';
import {Config} from '../Config';
import swal from 'sweetalert2';
import {GlobalService} from '../global.service';
import {PagerService} from "../paginator.service";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const NAME_REGEX = /^[a-zA-Z0-9 _-]+$/;

declare const $: any;

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})


export class EventsComponent implements OnInit {
  MainSearch: number;

  pager: any = {};
  public model: any = {};
  public AllEvents: any;
  loaded = false;
  // mainSearch = 0;
  public query: any;
  public Events: any;
  searchSlider: string;
  searchCourses: string;
  public selected: any;
  public ImageUrl = Config.api;
  p = 1;
  // search: string;
  searchEvent: string;
  public userRole: string;
  search: string;
  constructor(public dialog: MatDialog, private obj: EventsService, private global2: GlobalService, private pagerService: PagerService) {
    // this.MainSearch = global2.mainSearch;

    // this.global2.openSearch$.subscribe(
    //   data => {
    //     this.search = data;
    //     // alert("events "+this.search);
    //   });
    this.global2.checkingUserRole$.subscribe(
      data => {
        this.userRole = data;
      });
    this.global2.openSearch$.subscribe(
      data => {
        this.search = data;
      });

    this.global2.openSliderSearch$.subscribe(
      data => {
        this.searchSlider = data;
      });
  }

  ngOnInit() {
    this.setPage(1);
  }


  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.obj.get_events(page).subscribe(response => {
      this.AllEvents = response;
      // console.log(this.AllEvents.events);
      this.pager = this.pagerService.getPager(this.AllEvents['totalItems'], page,5);
      this.loaded = true;
    });
  }
  closeSearch() {
    if(this.searchCourses === '1' || this.searchSlider === '1') {
      this.searchCourses = '0';
      this.searchSlider = '0';
      this.search = '0';
      this.global2.searchSlider('0');
      this.global2.search('0');
      this.query = '';
      this.Events = '';
    }
  }

  openSearchEvent() {
    this.global2.searchSlider('1');
    this.global2.search('1');
    this.searchCourses = '1';
    this.search = '1';
    setTimeout(function () {
      $('#textsearch2').focus();
    },200);
  }

  filterss(query) {
    if (this.query !== '') {
      this.obj.search_keyword(this.query).subscribe(response => {
        this.Events = response;
        // console.log(this.Events);
        this.loaded = true;
      });
    }
  }

  select(item) {
    this.selected = item;
    this.query = '';
    this.Events = '';
    $('#wrapper').removeClass('search-active');
  }


  private Suggestions(query: any, number: number) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddEventComponent, {
      width: '500px',
      height: '600px',
      data: this.AllEvents
    });
  }
}

@Component({
  selector: 'app-add-event',
  templateUrl: '../events/add-event.component.html',
  styleUrls: ['../events/add-event.component.css']
})
export class AddEventComponent implements OnInit {
  public model: any = {};
  // latitude = 51.678418;
  // longitude = 7.809007;


  time = new Date("00:00:00 GMT-0500 (EST)");

  location;

  public Address= '';
  ImageUrl = Config.api;

  public latitude;
  public longitude;
  public searchControl: FormControl;
  public zoom: number;

// Image upload variables
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
  imageChangedEvent: any = '';
  croppedImage: any = '';


  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9_.+-, !@#$%^&*()<>{}|=~]+?')
  ]);

  dateFormControl = new FormControl('', [
    Validators.required,
  ]);

  startTimeFormControl = new FormControl('', [
    Validators.required,
  ]);

  endTimeFormControl = new FormControl('', [
    Validators.required,
  ]);

  priceFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9.]+?')
  ]);

  addressFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9_.+-, !@#$%^&*()<>{}|=~]+?')
  ]);

  timeFormControl = new FormControl('', [
    Validators.required
  ]);

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(public dialogRef: MatDialogRef<AddEventComponent>, private obj: EventsService,
              private ngZone: NgZone, private mapsAPILoader: MapsAPILoader) { }

  ngOnInit() {
    // set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    // create search FormControl
    this.searchControl = new FormControl();

    // set current position
    this.setCurrentPosition();

    //  load Places Autocomplete
    // this.mapsAPILoader.load().then(() => {
    //   const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
    //     types: ['address']
    //   });
    //   autocomplete.addListener('place_changed', () => {
    //     this.ngZone.run(() => {
    //       // get the place result
    //       const place: google.maps.places.PlaceResult = autocomplete.getPlace();

    //       // verify result
    //       if (place.geometry === undefined || place.geometry === null) {
    //         return;
    //       }

    //       this.Address = place.formatted_address;

    //       // set latitude, longitude and zoom
    //       this.latitude = place.geometry.location.lat();
    //       this.longitude = place.geometry.location.lng();
    //       this.zoom = 12;
    //     });
    //   });
    // });

  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // chg(address) {
  //   this.obj.location(address).subscribe(Response => {
  //     this.location = Response;
  //     console.log(this.location.results[0].geometry.location.lat);
  //     this.latitude = this.location.results[0].geometry.location.lat;
  //     this.longitude = this.location.results[0].geometry.location.lng;
  //     this.Address = this.location.results[0].formatted_address;
  //     alert(this.Address);
  //   });
  // }

  getAddress(address) {
    this.obj.location(address).subscribe(Response => {
      this.location = Response;
      // console.log(this.location.results[0].geometry.location.lat);
      this.latitude = this.location.results[0].geometry.location.lat;
      this.longitude = this.location.results[0].geometry.location.lng;
      this.Address = this.location.results[0].formatted_address;
      // alert(this.Address);
      // alert(this.latitude);
      // alert(this.longitude);
    });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(image: string) {
    this.croppedImage = image;
    // console.log(this.croppedImage.slice(22));
  }
  notSupported() {
    // alert('Seriously? Why you are not uploading this type of file?');
  }

  onSubmit(f: NgForm) {
    // this.obj.location(this.model.address).subscribe(Response => {
    //   this.location = Response;
    //   console.log(this.location.results[0].geometry.location.lat);
    //   this.latitude = this.location.results[0].geometry.location.lat;
    //   alert(this.latitude);
    //   this.longitude = this.location.results[0].geometry.location.lng;
    //   alert(this.longitude);
    //   this.Address = this.location.results[0].formatted_address;
    //   alert(this.Address);
    // });
    // alert(this.model.startTime);

    this.obj.add_event(this.model.eventname, this.model.detail, this.model.date, this.model.startTime,
      this.model.endTime, this.model.price, this.longitude, this.latitude, this.Address, this.croppedImage.slice(22)).subscribe(
      data => {
        // console.log(data);
        this.dialogRef.close();
        this.EventSuccess();
      },
      error => {
        // console.log(error);
      }
    );
  }

  EventSuccess() {
     swal.fire({
      type: 'success',
      title: 'Success! <br> Event Added!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  onlyNumberKey(event){
    let charCode = (event.query) ? event.query : event.keyCode;
    // console.log(charCode);
    if (charCode > 31
      && (charCode < 48 || charCode > 57))
      return false;

    return true;
  }



  // Image upload functions
  onChange(event: EventTarget) {
    this.imageChangedEvent = event;

    const eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    this.files = target.files;
    if (this.files.length >= 1 && this.files.length < 5) {

      this.MaxPictureCheck = false;
      this.file = this.files[0];

      this.PictureCheck = true;
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(this.file);

      if (this.files.length > 1 && this.files.length < 5) {

        for (let a = 1; a < (this.files.length); a++) {
          // alert(a);
          this.file1 = this.files[a];
          const reader1 = new FileReader();
          reader1.onload = (e: any) => {
            this._handleReaderLoadedforALl(e, a - 1);
          };
          // this._handleReaderLoadedforALl.bind(this.file1, a-1);
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
    // console.log('attt  ',index);
    const binaryString = readerEvt.target.result;
    // console.log('123456');
    // console.log('asdfghjk   ',btoa(binaryString))
    // // this.arrayIndex=0;

    this.ALLbase64textStringforPic[index] = btoa(binaryString);
    // console.log(this.ALLbase64textStringforPic);
    this.arrayIndex += 1;


  }


  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
  }

  // imageCropped(image: string) {
  //   this.croppedImage = image;
  // }


}
