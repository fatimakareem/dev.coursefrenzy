import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinbidComponent } from './winbid.component';

describe('WinbidComponent', () => {
  let component: WinbidComponent;
  let fixture: ComponentFixture<WinbidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinbidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinbidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
