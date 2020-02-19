import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { BookingBaseComponent } from '../booking-base';
import { BookingSteps } from '../../models/booking-steps';

@Component({
  selector: 'ss-booking-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.scss'],
})
export class GuestsComponent extends BookingBaseComponent implements OnInit {
  public step = BookingSteps.Guests;

  constructor(
    protected bookingService: BookingService
  ) {
    super(bookingService);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
