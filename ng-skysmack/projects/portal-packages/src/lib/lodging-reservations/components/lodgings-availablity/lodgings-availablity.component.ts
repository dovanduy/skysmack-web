import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RecordIndexTimePagedComponent, EntityComponentPageTitle } from '@skysmack/portal-ui';
import { NgSkysmackStore, NgLodgingReservationsStore, NgLodgingReservationsActions } from '@skysmack/ng-packages';
import { LodgingReservationsAppState, LodgingReservation } from '@skysmack/packages-lodging-reservations';
import { NgReservationsMenu } from '../../ng-reservations-menu';

@Component({
  selector: 'ss-lodgings-availablity',
  templateUrl: './lodgings-availablity.component.html',
  styleUrls: ['./lodgings-availablity.component.scss'],

})
export class LodgingsAvailablityComponent extends RecordIndexTimePagedComponent<LodgingReservationsAppState, LodgingReservation, number> implements OnInit {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public store: NgLodgingReservationsStore,
    public actions: NgLodgingReservationsActions,
    public pageTitle: EntityComponentPageTitle,
    public sidebarMenu: NgReservationsMenu
  ) {
    super(router, activatedRoute, actions, skysmackStore, store);
    pageTitle.setTitle('Availability');
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
