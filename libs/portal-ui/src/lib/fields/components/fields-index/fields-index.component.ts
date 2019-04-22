import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityAction } from '@skysmack/ng-ui';
import { getFieldStateKey, LocalObject, FieldSchemaViewModel } from '@skysmack/framework';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { EntityComponentPageTitle } from './../../../models/entity-component-page-title';
import { NgFieldsMenu } from '../../ng-fields-menu';
import { RecordIndexComponent } from '../../../base-components/record-components/record-index-component';
import { NgFieldActions, NgFieldStore } from '@skysmack/ng-redux';
import { NgFieldsConfig } from '../../ng-fields-config';

@Component({
  selector: 'ss-fields-index',
  templateUrl: './fields-index.component.html'
})
export class FieldsIndexComponent extends RecordIndexComponent<any, any, any> implements OnInit {
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public title: EntityComponentPageTitle,
    public actions: NgFieldActions,
    public store: NgFieldStore,
    public skysmackStore: NgSkysmackStore,
    public sidebarMenu: NgFieldsMenu,
    public fieldsConfig: NgFieldsConfig,
    public injector: Injector
  ) {
    super(router, activatedRoute, actions, skysmackStore, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(`${this.packagePath} ${this.additionalPaths.join(' ')} fields`);
  }

  protected storeGet() {
    return this.store.get(getFieldStateKey(this.packagePath, this.additionalPaths));
  }

  protected storeGetPages() {
    return this.store.getPages(getFieldStateKey(this.packagePath, this.additionalPaths));
  }

  protected actionsGetPaged() {
    this.actions.getPaged(this.packagePath, this.pagedQuery, this.additionalPaths);
  }

  protected delete(value: LocalObject<FieldSchemaViewModel, string>, _this: FieldsIndexComponent) {
    _this.actions.delete([value], _this.packagePath, _this.additionalPaths);
  }
}
