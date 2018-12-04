import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, EntityAction, DocumentRecordIndexComponet } from 'lib/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackRedux } from 'lib/ng-packages/skysmack';
import { NgLodgingTypesMenu } from 'lib/ng-packages/lodgings';
import { LodgingTypesAppState, LodgingType } from '@skysmack/packages-lodgings';
import { NgLodgingTypesStore } from 'lib/ng-packages/lodgings/redux/ng-lodgings-types-store';
import { NgLodgingTypesActions } from 'lib/ng-packages/lodgings/redux/ng-lodging-types-actions';


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
    public redux: NgSkysmackRedux,
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
