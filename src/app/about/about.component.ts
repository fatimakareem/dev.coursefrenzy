import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";
import {GlobalService} from "../global.service";
import {FormControl} from "@angular/forms";
import {HeaderService} from "../header/header.service";
import {Config} from "../Config";
declare const $: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public Logedin: string = '1';
  public Categories: any;
  loaded = false;
  public catImageUrl = Config.staticStorageImages;


  constructor(@Inject(PLATFORM_ID) private platformId: Object, private global: GlobalService, private obj2: HeaderService,
  ) {
    this.global.Categories$.subscribe(
      data => {
        this.Categories = data;
      });

    if (isPlatformBrowser(this.platformId)) {
      this.Logedin = localStorage.getItem("loged_in");
    }
    this.global.caseNumber$.subscribe(
      data => {
        this.Logedin = data;
      });
  }

  ngOnInit() {
    this.obj2.get_categories().subscribe(response => {
      this.Categories = response;
      this.loaded = true;
      $('.homeSlider').fadeOut(0);
      if (this.Categories) {
        setTimeout(function () {
          $('.homeSlider').slick({
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: true,
            prevArrow: '<button class="leftRs">&lt;</button>',
            nextArrow: '<button class="rightRs">&lt;</button>',
            responsive: [
              {
                breakpoint: 1027,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 3,
                  infinite: true
                }
              },
              {
                breakpoint: 769,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 2,
                  infinite: true
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  infinite: true
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  infinite: true
                }
              }

            ]
          });
        }, 250);
      }
      $('.homeSlider').fadeIn(700).delay(500);
    });
  }

}
