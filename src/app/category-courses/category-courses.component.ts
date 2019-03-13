import { Component, OnInit } from '@angular/core';
import {HeaderService} from "../header/header.service";
import {Config} from "../Config";
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalService} from "../global.service";
import {CoursesService} from './../course/courses.service';


declare const $: any;

@Component({
  selector: 'app-category-courses',
  templateUrl: './category-courses.component.html',
  styleUrls: ['./category-courses.component.scss']
})
export class CategoryCoursesComponent implements OnInit {
  BidCourses;
  public page = 1 ;

  public sub_categories: any=[];
  public catImageUrl = Config.staticStorageImages;
  public loaded_subcategory: boolean  = false;
  public category_id: any;
  private category: any;
  public loaded: boolean;
  constructor(private obj: CoursesService,private obj2: HeaderService,
              private route: ActivatedRoute,
              private global: GlobalService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.category_id = +params['cat_id'] || 1;
      // this.obj.get_bid_courses_by_category(this.page,this.category_id).subscribe(response => {
      //   this.BidCourses = response;
      //   if(this.BidCourses.bids.length>0){
      //     this.loaded = true;
      //   }
      // });
  

      this.obj2.get_single_category(this.category_id).subscribe(response=>{
        this.category = response;
        this.global.setCatName(this.category);
      });
    });


  }


}
