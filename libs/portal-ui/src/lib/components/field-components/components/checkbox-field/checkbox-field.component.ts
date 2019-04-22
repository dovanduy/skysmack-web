import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { Field } from '@skysmack/ng-ui';

@Component({
  selector: 'ss-checkbox-field',
  templateUrl: './checkbox-field.component.html'
})
export class CheckboxFieldComponent extends FieldBaseComponent<Field> implements OnInit {
  ngOnInit() {
    super.ngOnInit();
  }
}
