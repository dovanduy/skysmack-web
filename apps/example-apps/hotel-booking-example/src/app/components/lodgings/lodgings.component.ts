import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgLodgingsStore, NgLodgingsActions, NgLodgingTypesStore, NgLodgingTypesActions } from '@skysmack/ng-lodgings';
import { environment } from '../../../environments/environment';
import { PagedQuery, LocalObject } from '@skysmack/framework';
import { BookingBaseComponent } from '../booking-base';
import { BookingService } from '../../services/booking.service';
import { BookingSteps } from '../../models/booking-steps';
import { Lodging, LodgingType } from '@skysmack/packages-lodgings';
import { Observable } from 'rxjs';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'ss-booking-lodgings',
  templateUrl: './lodgings.component.html',
  styleUrls: ['./lodgings.component.scss'],
})
export class LodgingsComponent extends BookingBaseComponent implements OnInit, OnDestroy {
  public displayType: 'lodgings' | 'lodgingTypes' = 'lodgingTypes';
  public step = BookingSteps.Lodgings;
  public lodgings$: Observable<LocalObject<Lodging, number>[]>;
  public lodgingTypes$: Observable<LocalObject<LodgingType, number>[]>;

  constructor(
    protected bookingService: BookingService,
    private lodgingTypesStore: NgLodgingTypesStore,
    private lodgingTypesActions: NgLodgingTypesActions,
    private lodgingsStore: NgLodgingsStore,
    private lodgingsActions: NgLodgingsActions,
  ) {
    super(bookingService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.lodgingsActions.getPaged(environment.lodgingsPath, new PagedQuery());
    this.lodgingTypesActions.getPaged(environment.lodgingsPath, new PagedQuery());

    this.lodgings$ = this.lodgingsStore.get(environment.lodgingsPath);
    this.lodgingTypes$ = this.lodgingTypesStore.get(environment.lodgingsPath);
  }

  ngOnDestroy() {
  }

  public displayTypeChanged(change: MatRadioChange) {
    this.displayType = change.value;
  }

  public selectLodgingType(lodgingType: LocalObject<LodgingType, number>): void {

  }
}
