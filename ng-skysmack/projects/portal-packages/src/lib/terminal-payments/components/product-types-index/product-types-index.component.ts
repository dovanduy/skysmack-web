import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, DocumentRecordIndexComponet } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore, NgProductTypesActions, NgProductTypesStore } from '@skysmack/ng-packages';
import { ProductTypesAppState, ProductType } from '@skysmack/packages-products';
import { NgProductTypesMenu } from '../../ng-product-types-menu';
import { EntityAction } from '@skysmack/ng-ui';


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
    public redux: NgSkysmackStore,
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
