import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route} from '@angular/router';
import {Http} from '@angular/http';
import {Config} from '../Config';
import {isPlatformBrowser} from '@angular/common';
import {Inject, PLATFORM_ID} from '@angular/core';
import swal from 'sweetalert2'


@Injectable()
export class AuthGuard implements CanActivate {
  // ServerUrl =  'https://dhaardb.herokuapp.com/user/';
  constructor(private _http: Http , private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  verify_tokenWithNoRedirict() {
    if (isPlatformBrowser(this.platformId)) {
      return this._http.post(Config.api + 'api-token-verify/', {'token': localStorage.getItem('Authorization')})
        .map(response => {
          const token = response.json() && response.json().token;
          if(token) {
            return true;
            // return Observable.of(true);
          } else {
            return false;
            // return Observable.of(false);
          }
        });
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('Authorization')) {
        // logged in so return true
        return true;
      }
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
    this.loginMessage();
    return false;
  }

  loginMessage() {
     swal.fire({
      type: 'warning',
      title: 'Authentication required <br> Please Login or Signup first.',
      showConfirmButton: false,
      width: '512px',
      timer: 1500
    })
  }

}
