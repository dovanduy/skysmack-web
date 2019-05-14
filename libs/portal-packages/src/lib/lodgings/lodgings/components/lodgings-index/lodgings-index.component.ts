import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, DocumentRecordIndexComponent, EntityActionProviders, ENTITY_ACTIONS_EDIT, ENTITY_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { LodgingsAppState, LODGINGS_AREA_KEY } from '@skysmack/packages-lodgings';
import { Lodging } from '@skysmack/packages-lodgings';
import { NgLodgingsActions } from '@skysmack/ng-packages';
import { NgLodgingsStore } from '@skysmack/ng-packages';
import { NgLodgingsMenu } from '../../ng-lodgings-menu';
import { EntityAction } from '@skysmack/ng-ui';
import { NgFieldActions } from '@skysmack/ng-redux';
import { NgLodgingsFieldsConfig } from '../../ng-lodgings-fields-config';


@Component({
  selector: 'ss-lodgings-index',
  templateUrl: './lodgings-index.component.html',
})
export class LodgingsIndexComponent extends DocumentRecordIndexComponent<LodgingsAppState, Lodging, number> implements OnInit {

  public areaKey: string = LODGINGS_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', ENTITY_ACTIONS_EDIT, 'edit'),
    new EntityAction().asEventAction(ENTITY_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgLodgingsActions,
    public redux: NgSkysmackStore,
    public store: NgLodgingsStore,
    public sidebarMenu: NgLodgingsMenu,
    public fieldsConfig: NgLodgingsFieldsConfig,
    public fieldActions: NgFieldActions,
    public title: EntityComponentPageTitle,
    public entityActionProviders: EntityActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, fieldActions, entityActionProviders, title);
  }


  ngOnInit() {
    super.ngOnInit();
  }
}
