import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { NgRolesStore, NgRolesActions } from '@skysmack/ng-packages';
import { PagedQuery, FieldAccessPermission, AccessTypes } from '@skysmack/framework';
import { FieldHelpers } from '@skysmack/ng-ui';
import { map } from 'rxjs/operators';

class RoleCheckBox {
  public name: string;
  public id: number;
  public checked: boolean;

  constructor(values: Partial<RoleCheckBox>) {
    Object.assign(this, values);
  }
}

@Component({
  selector: 'ss-field-permission-field',
  templateUrl: './field-permission-field.component.html',
  styleUrls: ['./field-permission-field.component.scss']
})
export class FieldPermissionFieldComponent extends FieldBaseComponent implements OnInit {

  public packagePath: string;
  public accessTypes: { value: number, displayName: string }[];
  public roleCheckBoxes: RoleCheckBox[];
  public permission: FieldAccessPermission;

  public get selectedAccessType(): AccessTypes {
    return this.permission.access;
  }
  public set selectedAccessType(accessType: AccessTypes) {
    if (accessType === AccessTypes.authenticated) {
      this.permission.roles = []
    } else {
      this.permission.roles = undefined;
    }
    this.permission.access = accessType;
  }


  constructor(
    public rolesStore: NgRolesStore,
    public rolesActions: NgRolesActions
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setAccessTypes();
    this.setPermission();
    this.setRoleCheckboxes();
  }

  public trackByRoleId(item: { roleId: number, checked: boolean }) {
    return item && item.roleId;
  }

  public toggleIncludeRoles() {
    this.permission.includeRoles = !this.permission.includeRoles;
  }

  public changeRoleInclusion(role: RoleCheckBox) {
    const foundRoleId = this.permission.roles.find(roleId => roleId === role.id);
    foundRoleId ? this.permission.roles = this.permission.roles.filter(roleId => roleId !== foundRoleId) : this.permission.roles.push(role.id);
  }

  private setRoleCheckboxes() {
    this.rolesActions.getPaged('identities', new PagedQuery());
    this.subscriptions.push(this.rolesStore.get('identities').pipe(
      map(roles => this.roleCheckBoxes = roles.map(role => {
        const foundRoleId = this.permission.roles && this.permission.roles.find(permissionRoleId => permissionRoleId === role.object.id);
        const checked = foundRoleId ? true : false;
        return new RoleCheckBox({
          id: role.object.id,
          name: role.object.name,
          checked
        });
      }))
    ).subscribe());
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
