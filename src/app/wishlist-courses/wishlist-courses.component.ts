import { Component, OnInit } from '@angular/core';
import {CoursesService} from '../course/courses.service';
import {Config} from '../Config';
import {GlobalService} from "../global.service";
import swal from 'sweetalert2';
@Component({
  selector: 'app-wishlist-courses',
  templateUrl: './wishlist-courses.component.html',
  styleUrls: ['../popular-courses/popular-courses.component.css']

})
export class WishlistCoursesComponent implements OnInit {
  public page = 1;
  public wishlistCourses: any;
  public ImageUrl = 'https://storage.coursefrenzy.com/final/';
  loaded: boolean;
  public GlobalWishListCourses: any=[];
  public emptyWishlist: boolean = true;

  constructor(private obj: CoursesService, private global: GlobalService) {
    this.global.GlobalWishListCourses$.subscribe(
      data => {
        if (data.length===0){
          this.GlobalWishListCourses = [];
        }else {
          this.GlobalWishListCourses = data;
        }
      });

    // this.global.emptyWishlistGlobal$.subscribe(
    //   data => {
    //     this.emptyWishlist = data;
    //     console.log('Wish List component:'+this.emptyWishlist);
    //   });
  }

  ngOnInit() {
    // this.obj.get_wishlist_courses(this.page).subscribe(response => {
    //   this.wishlistCourses = response;
    //   console.log(this.wishlistCourses);
    //   this.loaded = true;
    //   this.global.getGolbalWishListCourses(this.wishlistCourses);
    // });
    console.log(this.GlobalWishListCourses.length);
    console.log(this.emptyWishlist);
    if(this.GlobalWishListCourses.length>0) {
      this.emptyWishlist = false;
    }
  }


  removeFromWishlist(index, course_id) {
    console.log(index);
    console.log(course_id);
     swal.fire({
      title: 'Are you sure you want to remove this course from wishlist? <br> You will not be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      width: '512px',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.value) {
        this.obj.removeFromWishlist(course_id).subscribe(
          data => {
            console.log(data);
            console.log('index' + index);
            this.GlobalWishListCourses.splice(this.GlobalWishListCourses.indexOf(this.GlobalWishListCourses[index]),1);
            console.log(this.GlobalWishListCourses);
            this.removeFromWishlistSuccess();
          },
          error => {
            // console.log(error);
            this.removeFromWishlistError();
          }
        );
      }
    })
  }


  removeFromWishlistSuccess() {
     swal.fire({
      type: 'success',
      title: 'Course Removed From Wishlist Successfully',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

  removeFromWishlistError() {
     swal.fire({
      type: 'error',
      title: 'Oops <br> Failed to remove from wishlist!',
      // text: 'Failed to approve course!',
      showConfirmButton: false,
      width: '512px',
      timer: 2500
    })
  }

}
