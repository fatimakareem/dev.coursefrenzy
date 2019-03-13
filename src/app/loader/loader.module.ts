import {CommonModule } from '@angular/common'
import { NgModule } from '@angular/core';


import {RequestOptions, XHRBackend} from "@angular/http";
import {PreloaderService} from "../serv/preloader-service";
import {HttpService} from "../serv/http-service";
import {LoaderComponent} from "./loader.component";

export function httpServiceFactory(backend: XHRBackend, defaultOptions: RequestOptions, preloaderService: PreloaderService) {
  return new HttpService(backend, defaultOptions, preloaderService);
}


@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    PreloaderService,
    {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions, PreloaderService]
    }],
  exports:[
    LoaderComponent
  ]
})
export class LoaderModule { }
