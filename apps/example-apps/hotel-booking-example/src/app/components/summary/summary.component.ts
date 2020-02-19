import { Component, OnInit } from '@angular/core';
import { BookingBaseComponent } from '../booking-base';
import { BookingSteps } from '../../models/booking-steps';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'ss-booking-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent extends BookingBaseComponent implements OnInit {
  public step = BookingSteps.Summary;

  constructor(
    protected bookingService: BookingService
  ) {
    super(bookingService);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
