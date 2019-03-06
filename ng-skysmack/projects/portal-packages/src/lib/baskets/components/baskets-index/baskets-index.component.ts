import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, DocumentRecordIndexComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgBasketsActions, NgBasketsFieldsConfig } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { NgBasketsStore } from '@skysmack/ng-packages';
import { Basket, BasketsAppState } from '@skysmack/packages-baskets';
import { NgBasketsMenu } from './../../ng-baskets-menu';
import { EntityAction } from '@skysmack/ng-ui';
import { NgFieldActions, NgFieldStore } from '@skysmack/ng-redux';


@Component({
  selector: 'ss-baskets-index',
  templateUrl: './baskets-index.component.html',
  styleUrls: ['./baskets-index.component.scss']
})
export class BasketsIndexComponent extends DocumentRecordIndexComponent<BasketsAppState, Basket, number> implements OnInit {

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
    public sidebarMenu: NgBasketsMenu,
    public fieldsConfig: NgBasketsFieldsConfig,
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
