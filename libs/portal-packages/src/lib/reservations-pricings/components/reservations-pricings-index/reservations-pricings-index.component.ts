import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { EntityComponentPageTitle } from '@skysmack/portal-ui';
import { NgReservationsPricingsMenu } from '../../ng-reservations-pricings-menu';
import { BaseComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-reservations-pricings-index',
  templateUrl: './reservations-pricings-index.component.html'
})
export class ReservationsPricingsIndexComponent extends BaseComponent<any, any> implements OnInit {
  public static COMPONENT_KEY = 'reservations-pricings-index';
  public componentKey = ReservationsPricingsIndexComponent.COMPONENT_KEY;

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
