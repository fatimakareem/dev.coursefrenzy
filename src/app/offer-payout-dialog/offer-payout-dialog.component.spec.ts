import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferPayoutDialogComponent } from './offer-payout-dialog.component';

describe('OfferPayoutDialogComponent', () => {
  let component: OfferPayoutDialogComponent;
  let fixture: ComponentFixture<OfferPayoutDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferPayoutDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferPayoutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
