import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Summary, SubscriptionHandler } from '@skysmack/framework';
import { NgLodgingReservationsActions, NgLodgingReservationsStore } from '@skysmack/ng-lodging-reservations';
import { tap, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'ss-persons-lodging-reservations-summary',
  templateUrl: './persons-lodging-reservations-summary.component.html'
})
export class PersonsLodgingReservationsSummaryComponent implements OnInit, OnDestroy {
  /**
   * PackagePath from the provider package.
   * Note this can from an adaptor, and not the current URL.
   */
  @Input() public packagePath: string;
  @Input() private summary: Summary<number>;

  private subscriptionHandler = new SubscriptionHandler();
  public urlPackagePath: string;

  constructor(
    private router: Router,
    private actions: NgLodgingReservationsActions,
    private store: NgLodgingReservationsStore
  ) {
  }

  ngOnInit() {
    this.urlPackagePath = this.router.url.split('/')[1];
    this.actions.getSingle(this.urlPackagePath, this.summary.entityId);
    this.subscriptionHandler.register(this.store.getSingle(this.urlPackagePath, this.summary.entityId).pipe(
      take(1)
    ).subscribe());

    // Next step is to get person details in the extended data.
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }
}
