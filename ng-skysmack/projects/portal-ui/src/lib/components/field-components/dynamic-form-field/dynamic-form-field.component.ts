import { Component, Input } from '@angular/core';
import { FormHelper, Field, FormRule, FieldTypes } from '@skysmack/ng-ui';
import { Observable } from 'rxjs';

@Component({
  selector: 'ss-dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html'
})
export class DynamicFormFieldComponent {
  @Input() fh: FormHelper;
  @Input() fieldType: FieldTypes;
  @Input() fieldKey: string;
  @Input() fields$: Observable<Field[]>;
  @Input() rules: FormRule[];

  public fieldTypeConstants = FieldTypes;
}
