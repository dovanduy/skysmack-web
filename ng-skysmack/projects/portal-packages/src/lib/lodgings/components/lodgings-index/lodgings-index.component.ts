import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, DocumentRecordIndexComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore, NgLodgingsFieldsConfig } from '@skysmack/ng-packages';
import { LodgingsAppState, LODGINGS_AREA_KEY } from '@skysmack/packages-lodgings';
import { Lodging } from '@skysmack/packages-lodgings';
import { NgLodgingsActions } from '@skysmack/ng-packages';
import { NgLodgingsStore } from '@skysmack/ng-packages';
import { NgLodgingsMenu } from './../../ng-lodgings-menu';
import { EntityAction } from '@skysmack/ng-ui';
import { NgFieldActions, NgFieldStore } from '@skysmack/ng-redux';


@Component({
  selector: 'ss-lodgings-index',
  templateUrl: './lodgings-index.component.html',
  styleUrls: ['./lodgings-index.component.scss']
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
    public fieldActions: NgFieldActions,
    public fieldStore: NgFieldStore
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, fieldActions, fieldStore);
  }


  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}
