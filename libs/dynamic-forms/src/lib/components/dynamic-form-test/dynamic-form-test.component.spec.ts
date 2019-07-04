import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormTestComponent } from './dynamic-form-test.component';

describe('DynamicFormTestComponent', () => {
  let component: DynamicFormTestComponent;
  let fixture: ComponentFixture<DynamicFormTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFormTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
