import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, EntityAction, DocumentRecordIndexComponet } from 'lib/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgLodgingsActions } from 'lib/ng-packages/lodgings/redux/ng-lodgings-actions';
import { NgSkysmackRedux } from 'lib/ng-packages/skysmack';
import { NgLodgingsStore, NgLodgingsMenu } from 'lib/ng-packages/lodgings';
import { Lodging, LodgingsAppState } from '@skysmack/packages-lodgings';


@Component({
  selector: 'ss-lodging-types-index',
  templateUrl: './lodging-types-index.component.html',
  styleUrls: ['./lodging-types-index.component.scss']
})
export class LodgingTypesIndexComponent extends DocumentRecordIndexComponet<LodgingsAppState, Lodging, number> implements OnInit {

  public displayedColumns = ['name'];
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgLodgingsActions,
    public redux: NgSkysmackRedux,
    public title: EntityComponentPageTitle,
    public store: NgLodgingsStore,
    public sidebarMenu: NgLodgingsMenu
  ) {
    super(router, activatedRoute, actions, redux, store);

  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}
