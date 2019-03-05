import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityAction } from '@skysmack/ng-ui';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { EntityComponentPageTitle } from './../../../models/entity-component-page-title';
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
    this.nextPageSize = 10;
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
