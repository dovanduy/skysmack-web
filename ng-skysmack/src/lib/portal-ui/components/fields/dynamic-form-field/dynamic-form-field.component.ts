import { Component, Input } from '@angular/core';
import { FormHelper } from 'lib/portal-ui/forms/form-helper';
import { Field } from 'lib/portal-ui/fields/field';
import { FormRule } from 'lib/portal-ui/forms/form-rule';
import { FieldTypes } from 'lib/portal-ui/fields/field-types';

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
