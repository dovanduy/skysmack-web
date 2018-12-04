import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, EntityAction, DocumentRecordIndexComponet } from 'lib/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackRedux } from 'lib/ng-packages/skysmack';
import { NgProductTypesMenu } from 'lib/ng-packages/products';
import { ProductTypesAppState, ProductType } from '@skysmack/packages-products';
import { NgProductTypesActions } from 'lib/ng-packages/products/redux/ng-product-types-actions';
import { NgProductTypesStore } from 'lib/ng-packages/products/redux/ng-product-types-store';


@Component({
  selector: 'ss-product-types-index',
  templateUrl: './product-types-index.component.html',
  styleUrls: ['./product-types-index.component.scss']
})
export class ProductTypesIndexComponent extends DocumentRecordIndexComponet<ProductTypesAppState, ProductType, number> implements OnInit {
  public displayedColumns = ['name'];
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgProductTypesActions,
    public redux: NgSkysmackRedux,
    public title: EntityComponentPageTitle,
    public store: NgProductTypesStore,
    public sidebarMenu: NgProductTypesMenu
  ) {
    super(router, activatedRoute, actions, redux, store);

  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}