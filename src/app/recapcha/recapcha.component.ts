import { Component, OnInit } from '@angular/core';
import { RecapchaService } from './recapcha.service';

@Component({
  selector: 'app-recapcha',
  templateUrl: './recapcha.component.html',
  styleUrls: ['./recapcha.component.scss']
})
export class RecapchaComponent implements OnInit {

  constructor(private recapchaService: RecapchaService) { }
  imgName
  capchaText

  ngOnInit() {
    this.recapchaService.resetImg()
    this.recapchaService.img.subscribe(res => { this.imgName = res; console.log(res) })
  }

  resetImg() {
    this.recapchaService.resetImg()
    this.recapchaService.img.subscribe(res => this.imgName = res)
    this.capchaText='';
  }

  checkChange() {
    // alert(this.capchaText)
    this.recapchaService.changeData(this.capchaText)
    console.log(this.capchaText)
  }
}