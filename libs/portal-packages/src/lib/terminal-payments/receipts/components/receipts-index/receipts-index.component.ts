import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, DocumentRecordIndexComponent, EntityActionProviders, ENTITY_ACTIONS_EDIT, ENTITY_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgReceiptsActions, NgReceiptsStore } from '@skysmack/ng-packages';
import { ReceiptsAppState, Receipt, RECEIPTS_AREA_KEY } from '@skysmack/packages-terminal-payments';
import { NgReceiptsMenu } from '../../ng-receipts-menu';
import { EntityAction } from '@skysmack/ng-ui';
import { NgFieldActions } from '@skysmack/ng-framework';
import { NgReceiptsFieldsConfig } from '../../ng-receipts-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-core';

@Component({
  selector: 'ss-receipts-index',
  templateUrl: './receipts-index.component.html'
})
export class ReceiptsIndexComponent extends DocumentRecordIndexComponent<ReceiptsAppState, Receipt, number> implements OnInit {
  public areaKey: string = RECEIPTS_AREA_KEY;
  public titleExtras = true;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', ENTITY_ACTIONS_EDIT, 'edit'),
    new EntityAction().asEventAction(ENTITY_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgReceiptsActions,
    public redux: NgSkysmackStore,
    public store: NgReceiptsStore,
    public sidebarMenu: NgReceiptsMenu,
    public fieldsConfig: NgReceiptsFieldsConfig,
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
