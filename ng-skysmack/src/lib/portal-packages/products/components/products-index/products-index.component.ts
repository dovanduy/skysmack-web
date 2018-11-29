import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, EntityAction, DocumentRecordIndexComponet } from 'lib/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgProductsActions } from 'lib/ng-packages/products/redux/ng-products-actions';
import { NgSkysmackRedux } from 'lib/ng-packages/skysmack';
import { NgProductsStore, NgProductsMenu } from 'lib/ng-packages/products';
import { Product, ProductsAppState } from '@skysmack/packages-products';


@Component({
  selector: 'ss-products-index',
  templateUrl: './products-index.component.html',
  styleUrls: ['./products-index.component.scss']
})
export class ProductsIndexComponent extends DocumentRecordIndexComponet<ProductsAppState, Product, number> implements OnInit {

  public displayedColumns = ['name'];
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgProductsActions,
    public redux: NgSkysmackRedux,
    public title: EntityComponentPageTitle,
    public store: NgProductsStore,
    public sidebarMenu: NgProductsMenu
  ) {
    super(router, activatedRoute, actions, redux, store);

  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.path);
  }
}
