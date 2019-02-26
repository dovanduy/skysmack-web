import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';

@Component({
  selector: 'ss-validators-field',
  templateUrl: './validators-field.component.html',
  styleUrls: ['./validators-field.component.scss']
})
export class ValidatorsFieldComponent extends FieldBaseComponent implements OnInit {

  public validators: any[] = [];

  public validatorOptions = [
    {
      value: {},
      displayName: 'required'
    },
    {
      value: {
        minimum: 0,
        maximum: 0
      },
      displayName: 'range'
    }
  ];

  constructor() { super(); }

  ngOnInit() {
    super.ngOnInit();
  }

  public addValidator() {
    this.validators.push('string');
  }

  public removeValidator() {
    this.validators.pop();
  }
}
