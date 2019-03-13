import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AdminPanelService} from "../admin-panel/admin-panel.service";


@Component({
  selector: 'app-admin-partnership',
  templateUrl: './admin-partnership.component.html',
  styleUrls:['./admin-partnership.css']
})
export class AdminPartnershipComponent implements OnInit {
  public partnerRequests: any;
  public loaded: boolean;

  displayedColumns = ['name', 'email', 'company', 'message', 'action'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private obj: AdminPanelService) {
    this.dataSource = new MatTableDataSource(this.partnerRequests);
  }

  ngOnInit() {
    this.obj.get_partnership_request().subscribe(response => {
      this.partnerRequests = response;
      // console.log(this.partnerRequests);
      this.loaded = true;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}

export interface UserData {
  name: string;
  email: string;
  company: string;
  message: string;
}

