import { Component, OnInit } from '@angular/core';
import { FieldAccessPermission, AccessTypes } from '@skysmack/framework';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { SelectFieldOption, Field, FieldHelpers } from '@skysmack/ng-dynamic-forms';
import { FieldBaseComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-field-permission-field',
  templateUrl: './field-permission-field.component.html'
})
export class FieldPermissionFieldComponent extends FieldBaseComponent<Field> implements OnInit {

  public accessTypes: SelectFieldOption[];
  public permission: FieldAccessPermission;

  public get selectedAccessType(): AccessTypes {
    return this.permission && this.permission.access;
  }
  public set selectedAccessType(accessType: AccessTypes) {
    if (accessType === AccessTypes.authenticated) {
      this.permission.roles = [];
    } else {
      this.permission.roles = undefined;
    }
    this.permission.access = accessType;
  }

  constructor() { super(); }

  ngOnInit() {
    super.ngOnInit();
    this.setAccessTypes();
    this.setPermission();
  }

  public trackByRoleId(item: { roleId: number, checked: boolean }) {
    return item && item.roleId;
  }

  public toggleIncludeRoles(event: MatSlideToggleChange) {
    this.permission.includeRoles = event.checked;
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
