import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapchaComponent } from './recapcha.component';

describe('RecapchaComponent', () => {
  let component: RecapchaComponent;
  let fixture: ComponentFixture<RecapchaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecapchaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecapchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
