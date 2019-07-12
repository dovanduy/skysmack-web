import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { Field } from '@skysmack/ng-dynamic-forms';

@Component({
  selector: 'ss-hidden-field',
  templateUrl: './hidden-field.component.html'
})
export class HiddenFieldComponent extends FieldBaseComponent<Field> implements OnInit {
  ngOnInit() { super.ngOnInit(); }
}
