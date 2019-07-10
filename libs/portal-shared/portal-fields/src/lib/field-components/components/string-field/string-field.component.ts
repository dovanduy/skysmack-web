import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { Field } from '@skysmack/ng-dynamic-forms';

@Component({
  selector: 'ss-string-field',
  templateUrl: './string-field.component.html'
})
export class StringFieldComponent extends FieldBaseComponent<Field> implements OnInit {
  ngOnInit() {
    super.ngOnInit();
  }

  public focusLost() {
    this.runRules();
  }
}
