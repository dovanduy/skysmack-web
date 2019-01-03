import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, DocumentRecordIndexComponet } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-packages';
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
export class LodgingTypesIndexComponent extends DocumentRecordIndexComponet<LodgingTypesAppState, LodgingType, number> implements OnInit {
  public displayedColumns = ['name'];
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
    public sidebarMenu: NgLodgingTypesMenu
  ) {
    super(router, activatedRoute, actions, redux, store);
  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}
