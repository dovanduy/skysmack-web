import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { SelectField } from '@skysmack/ng-ui';

@Component({
  selector: 'ss-roles-select-field',
  templateUrl: './roles-select-field.component.html',
  styleUrls: ['./roles-select-field.component.scss']
})
export class RolesSelectFieldComponent extends FieldBaseComponent implements OnInit {

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