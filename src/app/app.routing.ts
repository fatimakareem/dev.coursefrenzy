  import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './auth-guard/auth-guard.service';
import {NormalLayoutComponent} from './layouts/normal-layout.component';
import {UserProfileComponent} from './layouts/user-profile/user-profile.component';
import {AdminLayoutComponent} from './layouts/admin/admin-layout.component';
  import {WinbidModule} from './winbid/winbid.module';
  import {WinbidUserModule} from './winbid-user/winbid-user.module';
// import {Page404Module} from './page404/page404.module';
// import {BecomeInstructorComponent} from "./become-instructor/become-instructor.component";
//   import {InstructorModule} from './instructor/instructor.module';
import { WinbidDialogComponent } from './winbid-dialog/winbid-dialog.component';

import {HomeComponent} from "./home/home.component";


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    component: NormalLayoutComponent,
    children: [
      { path: 'chatbox', loadChildren: './chatbox/chatbox.module#ChatboxModule'},
     
      { path: 'login', loadChildren: './login/login.module#LoginModule' },
      { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
      { path: 'what-is-coursefrenzy', loadChildren: './about/about.module#AboutModule' },
      { path: 'contact', loadChildren: './contact-us/contact-us.module#ContactUsModule' },
      { path: 'categories', loadChildren: './categories/categories.module#CategoriesModule' },
      { path: 'partnership', loadChildren: './partnership/partnership.module#PartnershipModule' },
      { path: 'checkout', loadChildren: './course-checkout/course-checkout.module#CourseCheckoutModule', canActivate: [AuthGuard] },
      { path: 'privacy-policy', loadChildren: './privacy-policy/privacy-policy.module#PrivacyPolicyModule' },
      { path: 'faqs', loadChildren: './faqs/faqs.module#FaqsModule' },
      { path: 'who-are-we', loadChildren: './who-are-we/who-are-we.module#WhoAreWeModule' },
      { path: 'terms', loadChildren: './terms/terms.module#TermsModule' },
      { path: 'intellectual-property', loadChildren: './intellectual-property/intellectual-property.module#IntellectualPropertyModule' },

      { path: 'model', loadChildren: './model/model.module#ModelModule' },

        { path: 'user-profile/:query', loadChildren: './profile/profile.module#ProfileModule' },
       
        { path: 'trending-now-courses', loadChildren: './courses-all/trending-now-courses/trending-now-courses.module#TrendingNowCoursesModule' },
        { path: 'recently-viewed-courses', loadChildren: './courses-all/recently-viewed-courses/recently-viewed-courses.module#RecentlyViewedCoursesModule' },
        { path: 'recommended-courses', loadChildren: './courses-all/recommended-courses/recommended-courses.module#RecommendedCoursesModule' },
      { path: 'courses/top-rated', loadChildren: './courses/top-rated-courses-all/top-rated-courses-all.module#TopRatedCoursesAllModule' },
      { path: 'courses', loadChildren: './course/courses.module#CoursesModule' },
      { path: 'wishlist', loadChildren: './wishlist-courses/wishlist-courses.module#WishlistCoursesModule', canActivate: [AuthGuard] },
      { path: 'courses/:query', loadChildren: './course/courses.module#CoursesModule' },
      { path: 'courses/sub/:query2', loadChildren: './course/courses.module#CoursesModule' },
      { path: 'courses/single/:query', loadChildren: './single-course/single-course.module#SingleCourseModule' },
      { path: 'courses/single/:query/:instructor', loadChildren: './single-course/single-course.module#SingleCourseModule' },
      { path: 'mycourses', loadChildren: './upload-courses/upload-courses.module#UploadCoursesModule', canActivate: [AuthGuard] },
      { path: 'events', loadChildren: './events/events.module#EventsModule' },
      { path: 'event/:query', loadChildren: './event/event.module#EventModule' },
      { path: 'FilterSearch', loadChildren: './filter-search/filter-search.module#FilterSearchModule'},
      { path: 'bid_history/:bid_id', loadChildren: './bid-history/bid-history.module#BidHistoryModule' },
      { path: 'business', loadChildren: './business/business.module#BusinessModule' },
      // { path: '**', loadChildren: './page404/page404.module#Page404Module' },
      { path: 'reset/:code', loadChildren: './reset-password/reset-password.module#ResetPasswordModule' },

      { path: 'become_instructor', loadChildren: './become-instructor/become-instructor.module#BecomeInstructorModule'},
      { path: 'how-it-works', loadChildren: './how-it-works/how-it-works.module#HowItWorksModule'},
      { path: 'results', loadChildren: './search-results/search-results.module#SearchresultsModule'},

      { path: 'cat_courses/:cat_id', loadChildren: './category-courses/category-courses.module#CategoryCoursesModule'},

      { path: 'courses/subcat_courses/:subcat_id', loadChildren: './sub-category-courses/sub-category-courses.module#SubCategoryCoursesModule'},
      { path: 'courses/nestedsubcat_courses/:nestedsubcat_id', loadChildren: './nestedsub-cat-courses/nestedsub-cat-courses.module#NestedSubCategoryCoursesModule'},

      { path: 'become_instructor_questions', loadChildren: './become-instructor-questions/become-instructor-questions.module#BecomeInstructorQuestionsModule', canActivate: [AuthGuard] },

      { path: 'users/activate/:abc', loadChildren: './email-activation/email-activation.module#EmailActivationModule' },
      { path: 'changeforgetpassword/:link', loadChildren: './change-forget-password/change-forget-password.module#ChangeForgetPasswordModule' },

      // { path: 'teaches_by_teacher', loadChildren: './single-course/teaches-by-teacher/teaches-by-teacher.module#TeachesByTeacherModule' },

      { path: 'users/conform-subscription/:link', loadChildren: './subscription-confirmation/subscription-confirmation.module#SubscriptionConfirmationModule' },
      {path : 'winbid', loadChildren: './winbid/winbid.module#WinbidModule'},
      {path : 'winbidUser', loadChildren: './winbid-user/winbid-user.module#WinbidUserModule'},
      {path : 'accept-offer-activity', loadChildren: './accept-offer-activity/accept-offer-activity.module#AcceptOfferActivityModule'},

      { path: 'bid-courses', loadChildren: './courses-all/courses-on-bid/courses-on-bid.module#CoursesOnBidModule' },

    ]
  },
  // {
  //   path: '**',
  //   component: Page404Module
  // },
  // { path: 'become_instructor', component: BecomeInstructorComponent},

  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', loadChildren: './admin-panel/admin-panel.module#AdminPanelModule', canActivate: [AuthGuard] },
      { path: 'contacts', loadChildren: './admin-contacts/admin-contacts.module#AdminContactsModule', canActivate: [AuthGuard] },
      { path: 'partners', loadChildren: './admin-partnership/admin-partnership.module#AdminPartnershipModule', canActivate: [AuthGuard] },
      { path: 'add_subadmin', loadChildren: './admin-subadmin/admin-subadmin.module#AdminSubadminModule', canActivate: [AuthGuard] },
      { path: 'add_categories', loadChildren: './admin-categories/admin-categories.module#AdminCategoriesModule', canActivate: [AuthGuard] },
      { path: 'add_faqs', loadChildren: './admin-faqs/admin-faqs.module#AdminFaqsModule', canActivate: [AuthGuard] },
      {path: 'instructor', loadChildren: './instructor/instructor.module#InstructorModule', canActivate: [AuthGuard]},
      {path : 'winbid', loadChildren: './winbid/winbid.module#WinbidModule', canActivate: [AuthGuard]}

    ]
  },

  { path: 'profile', component: UserProfileComponent,
    children: [
      { path: '', loadChildren: './basic-info/basic-info.module#BasicInfoModule', canActivate: [AuthGuard] },
      { path: 'basic_info', loadChildren: './basic-info/basic-info.module#BasicInfoModule', canActivate: [AuthGuard] },
      { path: 'account', loadChildren: './account/account.module#AccountModule', canActivate: [AuthGuard] },
      { path: 'payout', loadChildren: './paymentmethods/paymentmethods.module#PaymentmethodsModule', canActivate: [AuthGuard] },
      { path: 'privacy', loadChildren: './privacy/privacy.module#PrivacyModule', canActivate: [AuthGuard] }
    ],
    canActivate: [AuthGuard]
  },
  { path: '**', loadChildren: './page404/page404.module#Page404Module' },
];

export const AppRoutingProvider: any[] = [];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
