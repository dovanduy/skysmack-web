import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { SelectField } from '@skysmack/ng-ui';
import { Field } from '@skysmack/ng-ui';

@Component({
  selector: 'ss-roles-select-field',
  templateUrl: './roles-select-field.component.html'
})
export class RolesSelectFieldComponent extends FieldBaseComponent<Field> implements OnInit {

  public currentRoleIds: number[] = [];
  public selectType = 'single';

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.selectType = (this.field as SelectField).selectType;
    this.currentRoleIds = this.field.value;
  }

  public selectedRoleIds(ids: number[]) {
    this.setFieldValue(ids);
  }
}
