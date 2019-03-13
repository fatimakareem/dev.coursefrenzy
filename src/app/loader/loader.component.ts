import { Component, OnInit } from '@angular/core';
import { PreloaderService } from '../serv/preloader-service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor(public preloaderService: PreloaderService) {

  }
  ngOnInit() {
  }

}
