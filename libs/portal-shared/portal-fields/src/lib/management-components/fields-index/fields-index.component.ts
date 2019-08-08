import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from '@skysmack/framework';
import { getFieldStateKey, LocalObject, FieldSchemaViewModel } from '@skysmack/framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { EntityComponentPageTitle } from '@skysmack/portal-ui';
import { NgFieldActions, NgFieldStore } from '@skysmack/ng-framework';
import { NgFieldsConfig } from '../../ng-fields-config';
import { map, take } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { MenuItemActionProviders } from '@skysmack/portal-ui';
import { MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { RecordIndexComponent } from '../../base-components/record-components/record-index-component';

@Component({
  selector: 'ss-fields-index',
  templateUrl: './fields-index.component.html'
})
export class FieldsIndexComponent extends RecordIndexComponent<any, any, any> implements OnInit {
  public static COMPONENT_KEY = 'fields-index';
  public componentKey = FieldsIndexComponent.COMPONENT_KEY;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public title: EntityComponentPageTitle,
    public actions: NgFieldActions,
    public store: NgFieldStore,
    public skysmackStore: NgSkysmackStore,
    public fieldsConfig: NgFieldsConfig,
    public injector: Injector,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, skysmackStore, store, fieldsConfig, menuItemActionProviders, title);
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

  protected delete(_this: FieldsIndexComponent, value: LocalObject<FieldSchemaViewModel, string>) {
    _this.actions.delete([value], _this.packagePath, _this.additionalPaths);
  }
}
