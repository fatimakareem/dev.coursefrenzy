import { Component, OnInit } from '@angular/core';
import {AdminPanelService} from '../admin-panel/admin-panel.service';
import {Config} from '../Config';
@Component({
  selector: 'app-winbid',
  templateUrl: './winbid.component.html',
  styleUrls: ['./winbid.component.scss']
})
export class WinbidComponent implements OnInit {
  public winingList;
  number: any = [];
  finalResult = [];
  public ImageUrl = Config.ImageUrl;
  constructor(private obj2: AdminPanelService) { }

  ngOnInit() {
    this.getWinner();
  }


  getWinner()
  {
    this.obj2.getWinning().subscribe(data => {
      // this.Win = data.TotalWinners;
      this.winingList = data['Win Bids'];
    });

    //
    // this.obj2.getWinning().subscribe(data => {
    //   this.winingList = data;
    //   for(let arr in this.winingList){
    //     for(let arr2 in this.winingList[arr])
    //       for(let arr3 in this.winingList[arr][arr2]) {
    //         this.finalResult.push(this.winingList[arr][arr2][arr3]);
    //         console.log(this.finalResult);
    //       }
    //   }
    //   console.log( this.winingList);
    // });
  }

}
