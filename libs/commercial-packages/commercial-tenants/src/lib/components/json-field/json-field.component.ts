import { Component, OnInit } from '@angular/core';
import { Field } from '@skysmack/ng-dynamic-forms';
import { FieldBaseComponent } from '@skysmack/portal-fields';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'ss-json-field',
  templateUrl: './json-field.component.html'
})
export class JSONFieldComponent extends FieldBaseComponent<Field> implements OnInit {
  ngOnInit() {
    super.ngOnInit();
  }

  public setValue(value: any) {
    // TODO: TURN INTO VALID JSON!
    this.setFieldValue(value.target.value);
  }
}
