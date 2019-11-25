import { Component, OnInit } from '@angular/core';
import { Field } from '@skysmack/ng-dynamic-forms';
import { FieldBaseComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-json-field',
  templateUrl: './json-field.component.html'
})
export class JSONFieldComponent extends FieldBaseComponent<Field> implements OnInit {

  public error: string;

  ngOnInit() {
    super.ngOnInit();
  }

  public setValue(value: any) {
    const textAreaString = value.target.value;
    if (textAreaString && textAreaString.length > 0) {
      try {
        this.error = null;
        const processed = textAreaString.replace(/\n/g, '');
        this.setFieldValue(JSON.parse(processed));
      } catch {
        this.error = 'Formatting not correct. Please use valid JSON format.';
      }
    } else {
      this.error = null;
      this.setFieldValue(null);
    }
  }
}
