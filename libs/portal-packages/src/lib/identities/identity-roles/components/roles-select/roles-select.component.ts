import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SubscriptionHandler, PagedQuery, Package } from '@skysmack/framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { map, tap } from 'rxjs/operators';
import { MatSelectChange } from '@angular/material/select';
import { NgRolesStore, NgRolesActions } from '@skysmack/ng-identities';

@Component({
  selector: 'ss-roles-select',
  templateUrl: './roles-select.component.html'
})
export class RolesSelectComponent implements OnInit, OnDestroy {

  public identityRoles: any[];
  public value: any;
  public subscriptionHander = new SubscriptionHandler();

  @Input() public currentlySelectedIds: number[] = [];
  @Input() public selectType: 'single' | 'multiple' = 'multiple';
  @Output() public selectedIds = new EventEmitter<number | number[]>();


  constructor(
    public rolesStore: NgRolesStore,
    public rolesActions: NgRolesActions,
    public skysmackStore: NgSkysmackStore
  ) { }

  ngOnInit() {
    this.getRoles();
  }

  ngOnDestroy() {
    this.subscriptionHander.unsubscribe();
  }

  public selectionChanged(change: MatSelectChange) {
    this.selectedIds.emit(change.value);
  }

  private getRoles() {
    this.subscriptionHander.register(this.skysmackStore.getIdentityPackages().pipe(
      map((identityPackages: Package[]) => {
        // GET
        identityPackages.forEach(_package => {
          this.rolesActions.getPaged(_package.path, new PagedQuery());
        });

        // SET
        this.identityRoles = identityPackages.map(_package => {
          return {
            name: _package.name,
            roles: this.rolesStore.get(_package.path)
          };
        });
        this.value = this.currentlySelectedIds;
      })
    ).subscribe());
  }
}
