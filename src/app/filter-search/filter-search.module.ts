import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WatchedCoursesModule} from "../watched-courses/watched-courses.module";
import {TrendingNowCoursesModule} from "../courses-all/trending-now-courses/trending-now-courses.module";
import {TopRatedCoursesModule} from "../courses-all/top-rated-courses/top-rated-courses.module";
import {CoursesOnBidModule} from "../courses-all/courses-on-bid/courses-on-bid.module";
import {LoaderModule} from "../loader/loader.module";
import {RecommendedCoursesModule} from "../courses-all/recommended-courses/recommended-courses.module";
import {RecentlyViewedCoursesModule} from "../courses-all/recently-viewed-courses/recently-viewed-courses.module";
import {FilterSearchComponent} from './filter-search.component';
import {Routes, RouterModule} from '@angular/router';
import {MatInputModule} from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material';
import {MatDialogModule} from '@angular/material';

const FilterSearch: Routes = [
  { path: '', component: FilterSearchComponent },
  // { path: 'courses/:query', component: CourseComponent },
  // { path: 'courses/sub/:query2', component: CourseComponent },
];

@NgModule({
  imports: [
    CommonModule,
    LoaderModule,
    RecommendedCoursesModule,
    RecentlyViewedCoursesModule,
    CoursesOnBidModule,
    TopRatedCoursesModule,
    TrendingNowCoursesModule,
    WatchedCoursesModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    RouterModule.forChild(FilterSearch),
  ],
  declarations: [FilterSearchComponent],

})
export class FilterSearchModule { }
