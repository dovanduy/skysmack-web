import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, DocumentRecordIndexComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgProductsActions, NgProductsFieldsConfig } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { NgProductsStore } from '@skysmack/ng-packages';
import { Product, ProductsAppState } from '@skysmack/packages-products';
import { NgProductsMenu } from '../../ng-products-menu';
import { EntityAction } from '@skysmack/ng-ui';
import { NgFieldActions, NgFieldReduxStore } from '@skysmack/ng-redux';


@Component({
  selector: 'ss-products-index',
  templateUrl: './products-index.component.html',
  styleUrls: ['./products-index.component.scss']
})
export class ProductsIndexComponent extends DocumentRecordIndexComponent<ProductsAppState, Product, number> implements OnInit {

  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgProductsActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgProductsStore,
    public sidebarMenu: NgProductsMenu,
    public fieldsConfig: NgProductsFieldsConfig,
    public fieldActions: NgFieldActions,
    public fieldStore: NgFieldReduxStore
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, fieldActions, fieldStore);
  }


  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}
