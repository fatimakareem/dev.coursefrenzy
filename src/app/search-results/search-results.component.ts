import { Component, OnInit } from '@angular/core';
import {HeaderService} from '../header/header.service';
import {Router,ActivatedRoute} from '@angular/router';
import { Config } from '../Config';
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  constructor(private obj: HeaderService, private nav: Router,private route: ActivatedRoute) { }
  public StaticImageUrl = Config.ImageUrl;

  ngOnInit() {
this.onPaginateChange()
  }
  item;
  courses;
 onPaginateChange() {
        // this.route.params
        // .subscribe(params => {
          
        // //   console.log(params); // {order: "popular"}
  
        //   this.cat = params['query'];
        //   console.log(this.cat)
        // this._shareData.returnCategory().subscribe(
        //     data => {
        //         this.cat = data;
       
            this.route.queryParams
                .subscribe(params => {
                    this.item = params.keyword
                    
                this.obj.searchresults(this.item).subscribe(
                    data => {
                        this.courses = data.results;
                        // this.item = data.totalItems
                        // this.pager = this.pagerService.getPager(data['totalItems'], page,this.pageSize);
                        // alert(this.item)
//                        this._serv.toalsearchrecord(this.cat).subscribe(
//                             data => {
//                                 this.item = data.totalItems
//                                 this.length = this.item;
// 
//                             })

                    },
                    error => {
                        console.log(error);
                    })
            })
        // const startIndex = event.pageIndex * event.pageSize;
    //    this.endRequest= this._serv.searchrfprecord(this.cat, this.pageSize, page).subscribe(
    //         data => {
    //             this.record = data.results;
    //         this.pager = this.pagerService.getPager(data['totalItems'], page);
    //         },
    //         error => {
    //             // console.log(error);
    //         });
        // })
    }
}
