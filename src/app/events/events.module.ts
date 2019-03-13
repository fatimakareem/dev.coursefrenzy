import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {EventsComponent} from "./events.component";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AddEventComponent } from './events.component';
import { MatDialogModule } from '@angular/material';
import {MatDatepickerModule} from '@angular/material';
import { ImageCropperModule } from 'ngx-image-cropper';
import {MatInputModule,MatNativeDateModule} from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { MapsAPILoader } from '@agm/core';
import {LoaderModule} from "../loader/loader.module";
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


const eventsRoutes: Routes = [
  { path: '', component: EventsComponent }
];


@NgModule({
  declarations: [
    EventsComponent,
    AddEventComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    // OwlDateTimeModule,
    // OwlNativeDateTimeModule,
    ImageCropperModule,MatNativeDateModule,
    MatInputModule,
    AgmCoreModule,
    RouterModule.forChild(eventsRoutes),
    LoaderModule
  ],

  providers: [],
  exports: [],
  entryComponents: [
    AddEventComponent,
  ],

})

export class EventsModule {

}

