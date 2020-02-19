import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { BookingBaseComponent } from '../booking-base';
import { BookingSteps } from '../../models/booking-steps';
import { SelectFieldOption } from '@skysmack/ng-dynamic-forms';

@Component({
  selector: 'ss-booking-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.scss'],
})
export class GuestsComponent extends BookingBaseComponent implements OnInit {
  public step = BookingSteps.Guests;

  public adultOptions: SelectFieldOption[] = [
    {
      displayName: '1 Adult',
      value: '1'
    },
    {
      displayName: '2 Adults',
      value: '2'
    },
    {
      displayName: '3 Adults',
      value: '3'
    }
  ];

  public childrenOptions: SelectFieldOption[] = [
    {
      displayName: '0 Children',
      value: '0'
    },
    {
      displayName: '1 Child',
      value: '1'
    },
    {
      displayName: '2 Children',
      value: '2'
    },
    {
      displayName: '3 Children',
      value: '3'
    }
  ];

  constructor(
    protected bookingService: BookingService
  ) {
    super(bookingService);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
