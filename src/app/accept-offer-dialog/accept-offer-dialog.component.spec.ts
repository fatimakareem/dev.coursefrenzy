import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptOfferDialogComponent } from './accept-offer-dialog.component';

describe('AcceptOfferDialogComponent', () => {
  let component: AcceptOfferDialogComponent;
  let fixture: ComponentFixture<AcceptOfferDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptOfferDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptOfferDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
