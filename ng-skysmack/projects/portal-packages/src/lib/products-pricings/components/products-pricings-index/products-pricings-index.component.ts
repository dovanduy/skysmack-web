import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { EntityComponentPageTitle } from '@skysmack/portal-ui';
import { NgProductsPricingsMenu } from '../../ng-products-pricings-menu';

@Component({
  selector: 'ss-products-pricings-index',
  templateUrl: './products-pricings-index.component.html',
  styleUrls: ['./products-pricings-index.component.scss']
})
export class ProductsPricingsIndexComponent implements OnInit {


  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public sidebarMenu: NgProductsPricingsMenu
  ) { }

  ngOnInit() {
    this.title.setTitle('Products pricings');
  }

}
