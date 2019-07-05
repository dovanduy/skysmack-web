import { Component } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { Field } from '@skysmack/ng-dynamic-forms';

@Component({
  selector: 'ss-decimal-field',
  templateUrl: './decimal-field.component.html'
})
export class DecimalFieldComponent extends FieldBaseComponent<Field> {
}
