import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialLoginComponent } from './commercial-login.component';

describe('CommercialLoginComponent', () => {
  let component: CommercialLoginComponent;
  let fixture: ComponentFixture<CommercialLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommercialLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommercialLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
