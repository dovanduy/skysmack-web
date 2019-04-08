import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { Field } from '@skysmack/ng-ui';

@Component({
  selector: 'ss-double-field',
  templateUrl: './double-field.component.html'
})
export class DoubleFieldComponent extends FieldBaseComponent<Field> implements OnInit {
  ngOnInit() {
    super.ngOnInit();
  }
}
