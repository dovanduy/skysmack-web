import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { Field } from '@skysmack/ng-ui';

@Component({
  selector: 'ss-int-field',
  templateUrl: './int-field.component.html'
})
export class IntFieldComponent extends FieldBaseComponent<Field> implements OnInit {
  ngOnInit() {
    super.ngOnInit();
    this.subscriptionHandler.register(this.fh.form.valueChanges.subscribe(() => {
      const itemValue = this.getFieldValue();
      if (itemValue !== undefined && itemValue !== null) {
        const value = itemValue.toString();
        const newValue = value.replace(/[^0-9]/g, '');
        this.setFieldValue(Number(newValue));
      }
    }));
  }
}
