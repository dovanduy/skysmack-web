import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalObject, DynamicFieldRouteData } from '@skysmack/framework';
import { DocumentRecordActionsBase } from '@skysmack/redux';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { EntityAction, FieldsConfig } from '@skysmack/ng-ui';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { EntityComponentPageTitle } from './../../../models/entity-component-page-title';
import { NgDocumentRecordReduxStore } from '@skysmack/ng-redux';
import { NgDynamicFieldsMenu } from '../../ng-dynamic-fields-menu';
import { RecordIndexComponent } from '../../../base-components/record-components/record-index-component';
import { NgFieldActions, NgFieldReduxStore } from '@skysmack/ng-redux';
import { NgDynamicFieldsFieldsConfig } from '../../ng-dynamic-fields-config';

@Component({
  selector: 'ss-dynamic-fields-index',
  templateUrl: './dynamic-fields-index.component.html',
  styleUrls: ['./dynamic-fields-index.component.scss']
})
export class DynamicFieldsIndexComponent extends RecordIndexComponent<any, any, any> implements OnInit {

  public entities$: Observable<LocalObject<any, any>[]>;
  public dynamicActions: DocumentRecordActionsBase<any, any>;
  public dynamicStore: NgDocumentRecordReduxStore<any, any, any>;
  public dynamicFieldsConfig: FieldsConfig<any, any, any>;

  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public title: EntityComponentPageTitle,
    public actions: NgFieldActions,
    public store: NgFieldReduxStore,
    public skysmackStore: NgSkysmackStore,
    public sidebarMenu: NgDynamicFieldsMenu,
    public fieldsConfig: NgDynamicFieldsFieldsConfig,
    public injector: Injector
  ) {
    super(router, activatedRoute, actions, skysmackStore, store, fieldsConfig);
  }

  ngOnInit() {
    this.subscriptionHandler.register(this.activatedRoute.data.pipe(
      map((data: DynamicFieldRouteData) => {
        this.store = this.dynamicStore = this.injector.get(data.storeToken);
        // this.actions = this.dynamicActions = this.injector.get(data.actionToken);
        // this.fieldsConfig = this.dynamicFieldsConfig = this.injector.get(data.fieldsConfigToken);

        this.dynamicActions.getFields(this.packagePath);
        this.entities$ = this.dynamicStore.getFields(this.packagePath);
        super.ngOnInit();
      }),
      take(1)
    ).subscribe());
  }

  public actionEvent(event: { action: Function, value: LocalObject<any, any>, _this: any }) {
    event.action(event.value, event._this);
  }

  // _this: any should be _this: DynamicFieldsIndexComponent
  protected delete(value: LocalObject<any, any>, _this: any) {
    _this.dynamicActions.deleteFields([value], _this.packagePath);
  }
}
