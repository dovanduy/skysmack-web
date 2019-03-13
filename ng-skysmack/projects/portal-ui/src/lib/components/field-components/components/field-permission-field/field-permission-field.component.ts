import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { FieldAccessPermission, AccessTypes } from '@skysmack/framework';
import { FieldHelpers } from '@skysmack/ng-ui';
import { Field } from '@skysmack/ng-ui';

@Component({
  selector: 'ss-field-permission-field',
  templateUrl: './field-permission-field.component.html',
  styleUrls: ['./field-permission-field.component.scss']
})
export class FieldPermissionFieldComponent extends FieldBaseComponent implements OnInit {

  public accessTypes: { value: number, displayName: string }[];
  public permission: FieldAccessPermission;

  public get selectedAccessType(): AccessTypes {
    return this.permission && this.permission.access;
  }
  public set selectedAccessType(accessType: AccessTypes) {
    if (accessType === AccessTypes.authenticated) {
      this.permission.roles = []
    } else {
      this.permission.roles = undefined;
    }
    this.permission.access = accessType;
  }

  constructor() { super(); }

  ngOnInit() {
    super.ngOnInit();
  }

  public init(fields: Field[]) {
    console.log('init field permission');
    this.setAccessTypes();
    this.setPermission();
  }

  public trackByRoleId(item: { roleId: number, checked: boolean }) {
    return item && item.roleId;
  }

  public toggleIncludeRoles() {
    this.permission.includeRoles = !this.permission.includeRoles;
  }

  public selectedRoleIds(ids: number[]) {
    this.permission.roles = ids;
  }

  private setAccessTypes() {
    this.accessTypes = FieldHelpers.getFieldOptionsOfEnum(AccessTypes, true).map(accessType => {
      accessType.displayName = accessType.displayName.charAt(0).toUpperCase() + accessType.displayName.slice(1);
      return accessType;
    });
  }

  private setPermission() {
    if (!this.field.value) {
      this.permission = new FieldAccessPermission({
        access: AccessTypes.both,
        includeRoles: false
      });
    } else {
      this.permission = this.field.value;
    }

    this.setFieldValue(this.permission);
  }
}
