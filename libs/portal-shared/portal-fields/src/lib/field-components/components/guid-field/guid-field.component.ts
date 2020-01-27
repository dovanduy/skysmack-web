import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { Field } from '@skysmack/ng-dynamic-forms';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'ss-guid-field',
  templateUrl: './guid-field.component.html'
})
export class GuidFieldComponent extends FieldBaseComponent<Field> implements OnInit {

  public

  ngOnInit() {
    super.ngOnInit();
  }

  public generateGuid() {
    const newGuid = Guid.create().toString();
    this.setFieldValue(newGuid);
  }
}
