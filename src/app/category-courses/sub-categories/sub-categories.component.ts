import { Component, OnInit } from '@angular/core';
import {GlobalService} from "../../global.service";
import {HeaderService} from "../../header/header.service";
import {Config} from "../../Config";
declare const $: any;
@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.scss']
})
export class SubCategoriesComponent implements OnInit {

  public sub_categories: any=[];
  public catImageUrl = 'https://storage.coursefrenzy.com/images/';
  public loaded_subcategory: boolean  = false;
  public category: any; 
  constructor(private global: GlobalService,private obj2: HeaderService,) { }

  ngOnInit() {
    this.global.catName$.subscribe(
      data => {
        this.category = data;

        this.obj2.get_sub_categories(this.category.id).subscribe(response => {
          this.sub_categories = response;
          this.loaded_subcategory = true;
          $('.homeSlider').fadeOut(0);
          if (this.sub_categories) {
            setTimeout(function () {
              $('.homeSlider').not('.slick-initialized').slick({
                infinite: true,
                slidesToShow: 4,
                slidesToScroll: 1,
                autoplay: true,
                prevArrow: '<button class="leftRs">&lt;</button>',
                nextArrow: '<button class="rightRs">&lt;</button>',
                responsive: [
                  {
                    breakpoint: 1024,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 3,
                      infinite: true,
                      dots: true
                    }
                  },
                  {
                    breakpoint: 600,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2
                    }
                  },
                  {
                    breakpoint: 480,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1
                    }
                  }

                ]
              });
            }, 250);
          }
          $('.homeSlider').fadeIn(700).delay(500);
        });

      });
  }

}
