import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SubscriptionHandler, PagedQuery } from '@skysmack/framework';
import { NgRolesStore, NgRolesActions } from '@skysmack/ng-packages';
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
  selector: 'ss-roles-select',
  templateUrl: './roles-select.component.html',
  styleUrls: ['./roles-select.component.scss']
})
export class RolesSelectComponent implements OnInit, OnDestroy {

  public roleCheckBoxes: RoleCheckBox[];
  public subscriptionHander = new SubscriptionHandler();

  @Input() public currentlySelectedIds: number[] = [];
  @Input() public selectType: 'single' | 'multiple' = 'multiple';
  @Output() public selectIds = new EventEmitter<number | number[]>();

  constructor(
    public rolesStore: NgRolesStore,
    public rolesActions: NgRolesActions
  ) { }

  ngOnInit() {
    this.getRoles();
  }

  ngOnDestroy() {
    this.subscriptionHander.unsubscribe();
  }

  private getRoles() {
    this.rolesActions.getPaged('identities', new PagedQuery());
    this.subscriptionHander.register(this.rolesStore.get('identities').pipe(
      map(roles => this.roleCheckBoxes = roles.map(role => {
        const foundRoleId = this.currentlySelectedIds && this.currentlySelectedIds.find(permissionRoleId => permissionRoleId === role.object.id);
        const checked = foundRoleId ? true : false;
        return new RoleCheckBox({
          id: role.object.id,
          name: role.object.name,
          checked
        });
      }))
    ).subscribe());
  }


  public changeRoleInclusion(role: RoleCheckBox) {
    const foundRoleId = this.currentlySelectedIds.find(roleId => roleId === role.id);
    foundRoleId ? this.currentlySelectedIds = this.currentlySelectedIds.filter(roleId => roleId !== foundRoleId) : this.currentlySelectedIds.push(role.id);
    this.selectIds.emit(this.currentlySelectedIds);
  }
}
