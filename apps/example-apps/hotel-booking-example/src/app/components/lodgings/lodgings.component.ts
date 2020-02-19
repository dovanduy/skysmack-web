import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgLodgingsStore, NgLodgingsActions } from '@skysmack/ng-lodgings';
import { environment } from '../../../environments/environment';
import { PagedQuery } from '@skysmack/framework';
import { tap, take } from 'rxjs/operators';
import { BookingBaseComponent } from '../booking-base';
import { BookingService } from '../../services/booking.service';
import { BookingSteps } from '../../models/booking-steps';

@Component({
  selector: 'ss-booking-lodgings',
  templateUrl: './lodgings.component.html',
  styleUrls: ['./lodgings.component.scss'],
})
export class LodgingsComponent extends BookingBaseComponent implements OnInit, OnDestroy {
  public step = BookingSteps.Lodgings;

  constructor(
    protected bookingService: BookingService,
    private lodgingsStore: NgLodgingsStore,
    private lodgingsActions: NgLodgingsActions
  ) {
    super(bookingService);
  }

  ngOnInit() {
    super.ngOnInit();

    this.lodgingsActions.getPaged(environment.lodgingsPath, new PagedQuery());
    this.lodgingsStore.get(environment.lodgingsPath).pipe(
      tap(x => console.log(x)),
      take(1)
    ).subscribe();
  }

  ngOnDestroy() {
  }
}
