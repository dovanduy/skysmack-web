import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialSignUpComponent } from './commercial-sign-up.component';

describe('CommercialSignUpComponent', () => {
  let component: CommercialSignUpComponent;
  let fixture: ComponentFixture<CommercialSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommercialSignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommercialSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
