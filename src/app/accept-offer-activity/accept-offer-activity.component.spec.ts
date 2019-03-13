import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptOfferActivityComponent } from './accept-offer-activity.component';

describe('AcceptOfferActivityComponent', () => {
  let component: AcceptOfferActivityComponent;
  let fixture: ComponentFixture<AcceptOfferActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptOfferActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptOfferActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
