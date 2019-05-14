import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { EntityComponentPageTitle, BaseComponent } from '@skysmack/portal-ui';
import { NgReservationsPricingsMenu } from '../../ng-reservations-pricings-menu';

@Component({
  selector: 'ss-reservations-pricings-index',
  templateUrl: './reservations-pricings-index.component.html'
})
export class ReservationsPricingsIndexComponent extends BaseComponent<any, any> implements OnInit {

  constructor(
    public skysmackStore: NgSkysmackStore,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public title: EntityComponentPageTitle,
    public sidebarMenu: NgReservationsPricingsMenu
  ) {
    super(router, activatedRoute, skysmackStore, title);
   }

  ngOnInit() {
    super.ngOnInit();
  }
}
