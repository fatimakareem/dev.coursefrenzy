import {Component, OnInit} from '@angular/core';
import {NgForm, FormControl, Validators} from '@angular/forms';
import {BasicInfoService} from './basic-info.service';
import {Config} from '../Config';
import swal from 'sweetalert2';
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css', '../events/add-event.component.css']
})
export class BasicInfoComponent implements OnInit {
  input: any;
  public model: any = {};
  public ImageUrl = Config.staticStorageImages;
  name: any;
  page: number;
  constructor(private obj: BasicInfoService,private http: HttpClient,) { }

  public ProfileData: any;
  private loaded = false;
  ngOnInit() {
    this.user_info();
  }
  user_info()
  {
    this.obj.get_profile().subscribe(response => {
      this.ProfileData = response;
      this.loaded = true;
      this.model.firstName = this.ProfileData.user.first_name;
      this.model.lastName = this.ProfileData.user.last_name;
      this.model.profilePhoto = this.ProfileData.profilePhoto;
      this.model.headLine = this.ProfileData.headLine;
      this.model.biography = this.ProfileData.biography;
      this.model.language = this.ProfileData.language;
      this.model.website = this.ProfileData.website;
      this.model.Git = this.ProfileData.Git;
      this.model.twitter = this.ProfileData.twitter;
      this.model.facebook = this.ProfileData.facebook;
      this.model.linkedIn = this.ProfileData.linkedIn;
      this.model.youtube = this.ProfileData.youtube;
    });
  }
  onChange(event: EventTarget) {
    this.input = new FormData();
    const eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    this.input.append('fileToUpload', target.files[0]);
  }


  onSubmit(f: NgForm) {
    if(this.input){
      this.http.post(
        Config.ImageUploadUrl,
        this.input, {responseType: 'text'}).subscribe(data => {
        if(data==="Sorry, not a valid Image.Sorry, only JPG, JPEG, PNG & GIF files are allowed.Sorry, your file was not uploaded."){
          BasicInfoComponent.ImageUploadFailer();
        }else{
          this.model.profilePhoto = data;
          this.ifImageUpload();
        }
      });
    }else {
      this.ifImageUpload();
    }


  }
  static ImageUploadFailer() {
     swal.fire({
      type: 'error',
      title: 'Oops! <br>Something Went Wrong Please try Again!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }
  static ProfileSuccess() {
     swal.fire({
      type: 'success',
      title: 'Profile Updated Successfully! <br> You can Re-edit Your Profile any Time.',
      width: '512px',
      timer: 2500
    })
  }

  static ProfileFailure() {
     swal.fire({
      type: 'error',
      title: 'Oops! <br>Failed to Update Profile.Incorrect Information!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  private ifImageUpload() {
    this.obj.user_profile(this.model.firstName, this.model.lastName, this.model.profilePhoto, this.model.headLine
      , this.model.biography, this.model.language, this.model.website, this.model.Git, this.model.twitter
      , this.model.facebook, this.model.linkedIn, this.model.youtube).subscribe(
      data => {
        BasicInfoComponent.ProfileSuccess();
        this.user_info();
      },
      error => {
        BasicInfoComponent.ProfileFailure();
      }
    );
  }


}
