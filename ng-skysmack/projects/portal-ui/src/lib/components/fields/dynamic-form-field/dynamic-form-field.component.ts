import { Component, Input } from '@angular/core';
import { FormHelper, Field, FormRule, FieldTypes } from '@skysmack/ng-ui';

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
