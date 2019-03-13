import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinbidUserComponent } from './winbid-user.component';

describe('WinbidUserComponent', () => {
  let component: WinbidUserComponent;
  let fixture: ComponentFixture<WinbidUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinbidUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinbidUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
