import { TestBed, inject } from '@angular/core/testing';

import { PaymentmethodsService } from './paymentmethods.service';

describe('PaymentmethodsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentmethodsService]
    });
  });

  it('should be created', inject([PaymentmethodsService], (service: PaymentmethodsService) => {
    expect(service).toBeTruthy();
  }));
});
