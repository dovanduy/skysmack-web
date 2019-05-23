import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityAction } from '@skysmack/ng-ui';
import { getFieldStateKey, LocalObject, FieldSchemaViewModel } from '@skysmack/framework';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { EntityComponentPageTitle } from './../../../models/entity-component-page-title';
import { NgFieldsMenu } from '../../ng-fields-menu';
import { RecordIndexComponent } from '../../../base-components/record-components/record-index-component';
import { NgFieldActions, NgFieldStore } from '@skysmack/ng-framework';
import { NgFieldsConfig } from '../../ng-fields-config';
import { map, take } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { EntityActionProviders } from '../../../entity-actions/entity-action-providers';
import { ENTITY_ACTIONS_EDIT, ENTITY_ACTIONS_DELETE } from '../../../constants/entity-action-translation-constants';

@Component({
  selector: 'ss-fields-index',
  templateUrl: './fields-index.component.html'
})
export class FieldsIndexComponent extends RecordIndexComponent<any, any, any> implements OnInit {
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', ENTITY_ACTIONS_EDIT, 'edit'),
    new EntityAction().asEventAction(ENTITY_ACTIONS_DELETE, this.delete, 'delete', this)
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
    public injector: Injector,
    public entityActionProviders: EntityActionProviders
  ) {
    super(router, activatedRoute, actions, skysmackStore, store, fieldsConfig, entityActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
    combineLatest(
      this.loadedPackage$,
      this.activatedRoute.data
    ).pipe(
      map(([loadedPackage, data]) => this.title.setTitle(loadedPackage._package.name, data.areaKey ? `${data.areaKey.toUpperCase()}.INDEX.FIELDS_TITLE` : undefined)),
      take(1)
    ).subscribe()
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
