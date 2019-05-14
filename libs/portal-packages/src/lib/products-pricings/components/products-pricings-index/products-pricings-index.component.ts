import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { EntityComponentPageTitle, BaseComponent } from '@skysmack/portal-ui';
import { NgProductsPricingsMenu } from '../../ng-products-pricings-menu';

@Component({
  selector: 'ss-products-pricings-index',
  templateUrl: './products-pricings-index.component.html'
})
export class ProductsPricingsIndexComponent extends BaseComponent<any, any> implements OnInit {


  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public sidebarMenu: NgProductsPricingsMenu
  ) { 
    super(router, activatedRoute, skysmackStore, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
