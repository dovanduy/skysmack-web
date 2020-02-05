import { Component } from '@angular/core';
import { LocalObject, toLocalObject } from '@skysmack/framework';
import { NgLodgingReservationsActions, NgLodgingReservationsStore } from '@skysmack/ng-lodging-reservations';
import { Router } from '@angular/router';
import { NgPassCodesActions, NgPassCodesStore } from '@skysmack/ng-pass-codes';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { PassCode } from '@skysmack/packages-pass-codes';
import { Observable, of } from 'rxjs';
import { SummaryBaseComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-pass-codes-lodging-reservations-summary',
  templateUrl: './pass-codes-lodging-reservations-summary.component.html'
})
export class PassCodesLodgingReservationsSummaryComponent extends SummaryBaseComponent<number> {

  public passCodes$: Observable<LocalObject<PassCode, number>[]>;
  public passCodesPackagePath$: Observable<string>;

  constructor(
    protected router: Router,
    protected skysmackStore: NgSkysmackStore,
    protected store: NgPassCodesStore,
    protected actions: NgPassCodesActions,
    protected reservationActions: NgLodgingReservationsActions,
    protected reservationStore: NgLodgingReservationsStore
  ) {
    super(router, skysmackStore);
  }

  ngOnInit() {
    super.ngOnInit();
    this.passCodesPackagePath$ = this.getDependencyPackagePath([1]);
    const passCodeIds$ = this.getExtendedDataIds(this.passCodesPackagePath$, this.reservationStore);
    this.requestRecords(this.passCodesPackagePath$, passCodeIds$, this.actions);
    this.passCodes$ = this.getRecords(this.passCodesPackagePath$, passCodeIds$, this.store);
  }
}


