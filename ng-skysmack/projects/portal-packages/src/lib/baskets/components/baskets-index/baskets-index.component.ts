import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, DocumentRecordIndexComponet } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgBasketsActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { NgBasketsStore } from '@skysmack/ng-packages';
import { Basket, BasketsAppState } from '@skysmack/packages-baskets';
import { NgBasketsMenu } from './../../ng-baskets-menu';
import { EntityAction } from '@skysmack/ng-ui';


@Component({
  selector: 'ss-baskets-index',
  templateUrl: './baskets-index.component.html',
  styleUrls: ['./baskets-index.component.scss']
})
export class BasketsIndexComponent extends DocumentRecordIndexComponet<BasketsAppState, Basket, number> implements OnInit {

  public displayedColumns = ['firstName', 'lastName'];
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgBasketsActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgBasketsStore,
    public sidebarMenu: NgBasketsMenu
  ) {
    super(router, activatedRoute, actions, redux, store);

  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}
