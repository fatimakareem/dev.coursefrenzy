// import { Component, OnInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {HeaderService} from "../header/header.service";
import {Config} from "../Config";
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalService} from "../global.service";
@Component({
  selector: 'app-nestedsub-cat-courses',
  templateUrl: './nestedsub-cat-courses.component.html',
  styleUrls: ['./nestedsub-cat-courses.component.scss']
})
export class NestedsubCatCoursesComponent implements OnInit {

  private sub_category_id: number;
  private subcategory: any;

  constructor(private obj2: HeaderService,
              private route: ActivatedRoute,
              private global: GlobalService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.sub_category_id = +params['subcat_id'];

      this.obj2.get_single_sub_category(this.sub_category_id).subscribe(response => {
        this.subcategory = response;
        this.global.setSubCatName(this.subcategory);
      });
    });
  }

}

