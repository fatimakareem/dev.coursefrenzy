import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {AboutComponent} from "./about.component";
import {BenefitsModule} from "../benefits/benefits.module";


const aboutRoutes: Routes = [
  {path: '', component: AboutComponent},
];


@NgModule({
  declarations: [
    AboutComponent
  ],

  imports: [
    CommonModule,
    RouterModule.forChild(aboutRoutes),
    BenefitsModule
  ],

})

export class AboutModule {

}

