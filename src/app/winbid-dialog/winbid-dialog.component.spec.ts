import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinbidDialogComponent } from './winbid-dialog.component';

describe('WinbidDialogComponent', () => {
  let component: WinbidDialogComponent;
  let fixture: ComponentFixture<WinbidDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinbidDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinbidDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
