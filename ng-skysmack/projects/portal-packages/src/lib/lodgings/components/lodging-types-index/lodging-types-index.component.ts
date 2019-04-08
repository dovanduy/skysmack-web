import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, DocumentRecordIndexComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { LodgingTypesAppState, LodgingType, LODGING_TYPES_AREA_KEY } from '@skysmack/packages-lodgings';
import { NgLodgingTypesStore } from '@skysmack/ng-packages';
import { NgLodgingTypesActions } from '@skysmack/ng-packages';
import { EntityAction } from '@skysmack/ng-ui';
import { NgLodgingTypesMenu } from './../../ng-lodging-types-menu';
import { NgFieldActions } from '@skysmack/ng-redux';
import { NgLodgingTypesFieldsConfig } from '../../ng-lodging-types-fields-config';

@Component({
  selector: 'ss-lodging-types-index',
  templateUrl: './lodging-types-index.component.html'
})
export class LodgingTypesIndexComponent extends DocumentRecordIndexComponent<LodgingTypesAppState, LodgingType, number> implements OnInit {
  public area: string = LODGING_TYPES_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgLodgingTypesActions,
    public skysmackStore: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgLodgingTypesStore,
    public sidebarMenu: NgLodgingTypesMenu,
    public fieldsConfig: NgLodgingTypesFieldsConfig,
    public fieldActions: NgFieldActions
  ) {
    super(router, activatedRoute, actions, skysmackStore, store, fieldsConfig, fieldActions);
  }


  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}
