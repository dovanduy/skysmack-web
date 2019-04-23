import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, DocumentRecordIndexComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgProductTypesActions, NgProductTypesStore } from '@skysmack/ng-packages';
import { ProductTypesAppState, ProductType, PRODUCT_TYPES_AREA_KEY } from '@skysmack/packages-products';
import { NgProductTypesMenu } from '../../ng-product-types-menu';
import { EntityAction } from '@skysmack/ng-ui';
import { NgFieldActions } from '@skysmack/ng-redux';
import { NgProductTypesFieldsConfig } from '../../ng-product-types-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-core';

@Component({
  selector: 'ss-product-types-index',
  templateUrl: './product-types-index.component.html'
})
export class ProductTypesIndexComponent extends DocumentRecordIndexComponent<ProductTypesAppState, ProductType, number> implements OnInit {

  public area: string = PRODUCT_TYPES_AREA_KEY;
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
    public sidebarMenu: NgProductTypesMenu,
    public fieldsConfig: NgProductTypesFieldsConfig,
    public fieldActions: NgFieldActions
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, fieldActions);
  }


  ngOnInit() {
    super.ngOnInit();
    const title = this.additionalPaths.length > 0 ? this.packagePath + ' ' + this.additionalPaths.join(' ') : this.packagePath;
    this.title.setTitle(title);
  }
}