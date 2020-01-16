import { Component, OnInit } from '@angular/core';
import { EditorNavService, EntityComponentPageTitle } from '@skysmack/portal-ui';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { DetailsBaseComponent } from '@skysmack/portal-fields';
import { LocalObject } from '@skysmack/framework';
import { NgLodgingReservationsFieldsConfig } from '../../ng-lodging-reservations-fields-config';
import { LodgingsReservationsIndexComponent } from '../lodgings-reservations-index/lodgings-reservations-index.component';
import { NgLodgingReservationsActions, NgLodgingReservationsStore } from '@skysmack/ng-lodging-reservations';
import { toDateString } from '@skysmack/ng-framework';
import { LodgingReservationsAppState, LodgingReservation } from '@skysmack/packages-lodging-reservations';

@Component({
  selector: 'ss-lodgings-reservations-details',
  templateUrl: './lodgings-reservations-details.component.html'
})
export class LodgingsReservationsDetailsComponent extends DetailsBaseComponent<LodgingReservationsAppState, number> implements OnInit {

  public componentKey = LodgingsReservationsIndexComponent.COMPONENT_KEY;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public actions: NgLodgingReservationsActions,
    public store: NgLodgingReservationsStore,
    public fieldsConfig: NgLodgingReservationsFieldsConfig,
    public editorNavService: EditorNavService,
    public title: EntityComponentPageTitle
  ) {
    super(router, activatedRoute, skysmackStore, actions, store, fieldsConfig, editorNavService, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  protected getTitle(record: LocalObject<LodgingReservation, number>): string {
    const checkIn = toDateString(record.object.checkIn);
    const checkOut = toDateString(record.object.checkOut);
    return `${checkIn} - ${checkOut}`;
  }
}
