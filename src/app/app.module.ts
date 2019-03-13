import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/////////////components//////////////////
import { NormalLayoutComponent } from "./layouts/normal-layout.component";
import { UserProfileComponent } from './layouts/user-profile/user-profile.component';
import {HomeComponent} from "./home/home.component";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BiddingDialogComponent } from "./bidding-dialog/bidding-dialog.component";
import { AdminLayoutComponent } from "./layouts/admin/admin-layout.component";
import { WinbidDialogComponent } from './winbid-dialog/winbid-dialog.component';
import { AddCourseDialogComponent } from './upload-courses/upload-courses.component';
import { BuynowDialogComponent } from './buynow-dialog/buynow-dialog.component';
import { AcceptOfferDialogComponent } from './accept-offer-dialog/accept-offer-dialog.component';
import { OfferPayoutDialogComponent } from './offer-payout-dialog/offer-payout-dialog.component';
///////////////service////////////////////
import { SignUpservice } from './signup/signup.service';
import { PaymentmethodsService } from './paymentmethods/paymentmethods.service';
import { RecapchaService } from './recapcha/recapcha.service';
import { AuthGuard } from './auth-guard/auth-guard.service';
import { LoginService } from './login/login.service';
import { LogoutService } from './logout/logout.service';
import { UploadCoursesService } from './upload-courses/upload-courses.service';
import { CoursesService } from './course/courses.service';
import { ChangePasswordService } from './change-password/change-password.service';
import { SingleCourseService } from './single-course/single-course.service';
import { GlobalService } from './global.service';
import { PartnershipService } from './partnership/partnership.service';
import { BasicInfoService } from './basic-info/basic-info.service';
import { BiddingService } from './bidding-dialog/bidding.service';
import { EventsService } from './events/events.service';
import { ContactUsService } from './contact-us/contact-us.service';
// import { ChatComponent } from './chat/chat.component';
import { HomeService } from './home/home.service';
import { SingleEventService } from './event/single-event.service';
import { WebSocketService } from 'angular2-websocket-service';
import { ServerSocket } from './single-course/server-socket.service';
import { HeaderService } from './header/header.service';
import { InstructorService } from "./become-instructor-questions/instructor.service";
import { PagerService } from "./paginator.service";
import { AccountService } from "./account/account.service";
import { AdminPanelService } from "./admin-panel/admin-panel.service";
import { CourseCheckoutService } from "./course-checkout/course-checkout.service";
import { WebsocketService } from "./websocket.service";
import { SingleCourseGlobalService } from "./singleCourse.global.service";
import { ProfileService } from "./profile/profile.service";
import { AdminCategoriesService } from "./admin-categories/admin-categories.service";
import { AdminFaqsService } from "./admin-faqs/admin-faqs.service";
import { HeadersService } from "./headers.service";
import { EmailActivationService } from "./email-activation/email-activation.service";
import { ChangeForgetPasswordService } from "./change-forget-password/change-forget-password.service";
import { FooterService } from "./footer/footer.service";
import { SubscriptionConfirmationService } from "./subscription-confirmation/subscription-confirmation.service";
import { BuyNowService } from "./BuyNow.service";
import { FollowUnfollowService } from "./Follow-Unfollow.service";
import { ChatboxService } from "./chatbox/chatbox.service";
////////////libraries/////////////////////
import { MatFormFieldModule } from '@angular/material/form-field';
import { TextMaskModule } from 'angular2-text-mask';

import {
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatTabsModule,
 
} from '@angular/material';

import { Routing, AppRoutingProvider } from './app.routing';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { SlickModule } from 'ngx-slick';
import { RatingModule } from "ng2-rating";



import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";




import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';



import { SimpleGlobal } from 'ng2-simple-global';

import { LoaderModule } from "./loader/loader.module";


let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("494272768782-co69j2gbh9vrci7a7frhgh37l9rlpbhv.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("219249381809488")
  }
]);

export function provideConfig() {
  return config;
}
@NgModule({
  declarations: [
    NormalLayoutComponent,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UserProfileComponent,
    AdminLayoutComponent,
    HomeComponent,
    WinbidDialogComponent,
    BiddingDialogComponent,
    BuynowDialogComponent,
    AcceptOfferDialogComponent,
    OfferPayoutDialogComponent,
  ],
  imports: [
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAH0kHXWGjjeBCjG3PNiBBmMi9usTLuW1c',
      libraries: ['geometry', 'places']
    }),
    HttpClientModule,
    SlickModule, RatingModule,
    SocialLoginModule,
    BrowserModule,
    CommonModule,
    Routing,
    FormsModule,
    HttpModule,
    TextMaskModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatCardModule,
    MatTabsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    LoaderModule,
  
  ],
  entryComponents: [ 
    WinbidDialogComponent, BuynowDialogComponent, BiddingDialogComponent,AcceptOfferDialogComponent,OfferPayoutDialogComponent
  ],
  providers: [ {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  },
  AppRoutingProvider,
  SignUpservice, PaymentmethodsService, RecapchaService,
  SimpleGlobal,
  AuthGuard,
  LoginService,
  LogoutService,
  UploadCoursesService,
  // UploadChaptersService,
  HeaderService,
  ChangePasswordService,
  SingleCourseService,
  BasicInfoService,
  CoursesService,
  BiddingService,
  EventsService,
  ContactUsService,
  HomeService,
  SingleEventService,
  WebSocketService,
  ServerSocket,
  GlobalService,
  PartnershipService,
  InstructorService,
  PagerService,
  AccountService,
  AdminPanelService,
  CourseCheckoutService,
  WebsocketService,
  SingleCourseGlobalService,
  ProfileService,
  AdminCategoriesService,
  AdminFaqsService,
  HeadersService,
  EmailActivationService,
  ChangeForgetPasswordService,
  FooterService,
  SubscriptionConfirmationService,
  BuyNowService,
  FollowUnfollowService,
  ChatboxService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
