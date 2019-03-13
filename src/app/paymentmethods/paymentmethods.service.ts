import { Headers } from '@angular/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Config } from '../Config';
import { HttpService } from "../serv/http-service";
@Injectable()
export class PaymentmethodsService {
  currentUser;
  constructor(private http: HttpService, @Inject(PLATFORM_ID) private platformId: Object) {
  }

  addCard(cardno, ccv, expiryDate, cardnickname, card_type, defaultCheck) {
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }
    headers.append('Content-Type', 'application/json');
    return this.http.post(Config.api + 'courses/addcard/',
  {

        "cardNumber": cardno,
        "ccv": ccv,
        "expiryDate": expiryDate,
        "nickname": cardnickname,
        "card_type": card_type,
        "default": defaultCheck

      },
      { headers: headers }).map((response: Response) => response.json());
  }

  showCards() {
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'courses/getcards/', { headers: headers }).map((response: Response) => response.json());
  }

  singleCard(id) {
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }
    headers.append('Content-Type', 'application/json');
    return this.http.get(Config.api + 'courses/editdeletecard/' + id, { headers: headers }).map((response: Response) => response.json());
  }

  updateCard(cardnickname, defaultCheck, id) {
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }
    headers.append('Content-Type', 'application/json');
    return this.http.put(Config.api + 'courses/editdeletecard/' + id,
      JSON.stringify({
        
        // "cardNumber": cardno,
        // "ccv": ccv,
        // "expiryDate": expiryDate,
        "nickname": cardnickname,
        "default": defaultCheck
        // "card_type":card_type
      }),
      { headers: headers }).map((response: Response) => response.json());
  }
  deleteCard(id) {
    const headers = new Headers();
    if (isPlatformBrowser(this.platformId)) {
      headers.append('Authorization', 'JWT ' + localStorage.getItem('Authorization'));
    }
    headers.append('Content-Type', 'application/json');
    return this.http.delete(Config.api + 'courses/editdeletecard/' + id, { headers: headers }).map((response: Response) => response.json());
  }
}
