import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, EntityAction, DocumentRecordIndexComponet } from 'lib/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackRedux } from 'lib/ng-packages/skysmack';
import { LodgingsAppState } from '@skysmack/packages-lodgings/lib/redux/Lodgings-reducer';
import { Lodging } from '@skysmack/packages-lodgings';
import { NgLodgingsActions } from 'lib/ng-packages/lodgings/redux/ng-lodgings-actions';
import { NgLodgingsStore } from 'lib/ng-packages/lodgings/redux/ng-lodgings-store';
import { NgLodgingsMenu } from 'lib/ng-packages/lodgings/ng-lodgings-menu';


@Component({
  selector: 'ss-lodgings-index',
  templateUrl: './lodgings-index.component.html',
  styleUrls: ['./lodgings-index.component.scss']
})
export class LodgingsIndexComponent extends DocumentRecordIndexComponet<LodgingsAppState, Lodging, number> implements OnInit {

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
