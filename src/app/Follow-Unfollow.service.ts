import {Injectable} from '@angular/core';
import {GlobalService} from "./global.service";
import {Router} from '@angular/router';
import {MessagesService} from "./Messages.service";
import {SingleCourseService} from "./single-course/single-course.service";

@Injectable()
export class FollowUnfollowService  {
  public GlobalCartCourses: any = [];

  constructor(
    private obj: SingleCourseService,
    private global: GlobalService,
    private nav: Router
  ){}
  Follow_Unfollow(user_id,Logedin): void {
    if (Logedin == '1') {
      this.obj.Follow(user_id).subscribe(response => {
        if (response.status===true){
          this.global.SetFollowing(true);
          MessagesService.SuccessMessage('You Followed this Teacher Successfully.')
        }
        if (response.status===false){
          this.global.SetFollowing(false);
          MessagesService.SuccessMessage(response.message)
        }
      });}
    else {
      MessagesService.AuthenticatMessage();
      this.nav.navigate(['login']);
    }
  }


}
