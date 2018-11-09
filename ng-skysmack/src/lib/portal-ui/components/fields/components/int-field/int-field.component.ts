import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from 'lib/portal-ui/fields/field-base-component';

@Component({
  selector: 'ss-int-field',
  templateUrl: './int-field.component.html',
  styleUrls: ['./int-field.component.scss']
})
export class IntFieldComponent extends FieldBaseComponent implements OnInit {
  ngOnInit() {
    super.ngOnInit();
    this.fh.form.valueChanges.subscribe(() => {
      const itemValue = this.getFieldValue();
      if (itemValue !== undefined && itemValue !== null) {
        const value = itemValue.toString();
        const newValue = value.replace(/[^0-9]/g, '');
        this.setFieldValue(Number(newValue));
      }
    });
  }
}
