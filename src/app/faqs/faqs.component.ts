import { Component, OnInit } from '@angular/core';
import {AdminFaqsService} from "../admin-faqs/admin-faqs.service";

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {
  public faqsList: any;
  public loaded: boolean;

  constructor(private obj: AdminFaqsService) { }

  ngOnInit() {
    this.obj.get_all_faqs().subscribe(response => {
      this.faqsList = response;
      console.log(this.faqsList);
      this.loaded = true;
    });
  }

}
