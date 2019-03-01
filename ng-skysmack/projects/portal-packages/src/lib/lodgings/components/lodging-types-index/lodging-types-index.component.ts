import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, DocumentRecordIndexComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore, NgLodgingTypesFieldsConfig } from '@skysmack/ng-packages';
import { LodgingTypesAppState, LodgingType } from '@skysmack/packages-lodgings';
import { NgLodgingTypesStore } from '@skysmack/ng-packages';
import { NgLodgingTypesActions } from '@skysmack/ng-packages';
import { EntityAction } from '@skysmack/ng-ui';
import { NgLodgingTypesMenu } from './../../ng-lodging-types-menu';


@Component({
  selector: 'ss-lodging-types-index',
  templateUrl: './lodging-types-index.component.html',
  styleUrls: ['./lodging-types-index.component.scss']
})
export class LodgingTypesIndexComponent extends DocumentRecordIndexComponent<LodgingTypesAppState, LodgingType, number> implements OnInit {
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgLodgingTypesActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgLodgingTypesStore,
    public sidebarMenu: NgLodgingTypesMenu,
    public fieldsConfig: NgLodgingTypesFieldsConfig
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}
