import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { EntityComponentPageTitle } from '@skysmack/portal-ui';
import { NgReservationsPricingsMenu } from '../../ng-reservations-pricings-menu';

@Component({
  selector: 'ss-reservations-pricings-index',
  templateUrl: './reservations-pricings-index.component.html'
})
export class ReservationsPricingsIndexComponent implements OnInit {


  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public sidebarMenu: NgReservationsPricingsMenu
  ) { }

  ngOnInit() {
    this.title.setTitle('Reservation pricings');
  }

}
