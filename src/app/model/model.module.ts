import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ModelComponent} from "./model.component";
import {VgBufferingModule} from "videogular2/buffering";
import {VgCoreModule} from "videogular2/core";
import {VgOverlayPlayModule} from "videogular2/overlay-play";
import {VgControlsModule} from "videogular2/controls";
import {LoaderModule} from "../loader/loader.module";


const modelRoutes: Routes = [
  { path: '', component: ModelComponent }
];


@NgModule({
  declarations: [
    ModelComponent
  ],

  imports: [
    CommonModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    RouterModule.forChild(modelRoutes),
    LoaderModule
  ],

  providers: [],
  exports: []

})

export class ModelModule {

}

