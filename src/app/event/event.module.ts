import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {EventComponent} from "./event.component";
import { AgmCoreModule } from '@agm/core';
import {LoaderModule} from "../loader/loader.module";


const eventRoutes: Routes = [
  { path: '', component: EventComponent }
];


@NgModule({
  declarations: [
    EventComponent
  ],

  imports: [
    CommonModule,
    AgmCoreModule,
    RouterModule.forChild(eventRoutes),
    LoaderModule
  ],

  providers: [],
  exports: []

})

export class EventModule {

}

