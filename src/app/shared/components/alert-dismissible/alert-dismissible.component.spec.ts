import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDismissibleComponent } from './alert-dismissible.component';

describe('AlertDismissibleComponent', () => {
  let component: AlertDismissibleComponent;
  let fixture: ComponentFixture<AlertDismissibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertDismissibleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertDismissibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
