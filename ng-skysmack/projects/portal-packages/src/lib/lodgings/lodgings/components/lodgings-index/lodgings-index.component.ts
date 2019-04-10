import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, DocumentRecordIndexComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-packages';
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

  public area: string = LODGINGS_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgLodgingsActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgLodgingsStore,
    public sidebarMenu: NgLodgingsMenu,
    public fieldsConfig: NgLodgingsFieldsConfig,
    public fieldActions: NgFieldActions
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, fieldActions);
  }


  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}
