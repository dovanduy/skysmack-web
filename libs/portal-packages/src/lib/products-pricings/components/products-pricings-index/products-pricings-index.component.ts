import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { EntityComponentPageTitle } from '@skysmack/portal-ui';
import { BaseComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-products-pricings-index',
  templateUrl: './products-pricings-index.component.html'
})
export class ProductsPricingsIndexComponent extends BaseComponent<any, any> implements OnInit {
  public static COMPONENT_KEY = 'products-pricings-index';
  public componentKey = ProductsPricingsIndexComponent.COMPONENT_KEY;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public title: EntityComponentPageTitle
  ) { 
    super(router, activatedRoute, skysmackStore, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
