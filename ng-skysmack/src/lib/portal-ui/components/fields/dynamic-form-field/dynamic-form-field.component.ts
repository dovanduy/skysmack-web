import { Component, Input } from '@angular/core';

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
