import { Component, Input } from '@angular/core';
import { FormHelper } from './../../../forms/form-helper';
import { Field } from './../../../fields/field';
import { FormRule } from './../../../forms/form-rule';
import { FieldTypes } from './../../../fields/field-types';

@Component({
  selector: 'ss-dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.scss'],
})
export class DynamicFormFieldComponent {
  @Input() fh: FormHelper;
  @Input() field: Field;
  @Input() fields: Field[];
  @Input() rules: FormRule[];

  public fieldTypeConstants = FieldTypes;
}
