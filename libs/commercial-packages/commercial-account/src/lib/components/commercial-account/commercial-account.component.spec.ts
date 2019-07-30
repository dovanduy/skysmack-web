import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialAccountComponent } from './commercial-account.component';

describe('CommercialAccountComponent', () => {
  let component: CommercialAccountComponent;
  let fixture: ComponentFixture<CommercialAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommercialAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommercialAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
