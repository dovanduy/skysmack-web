import { BookingService } from '../services/booking.service';
import { OnInit } from '@angular/core';
import { BookingSteps } from '../models/booking-steps';

export abstract class BookingBaseComponent implements OnInit {
  public steps = BookingSteps;
  public abstract step: BookingSteps;

  constructor(
    protected bookingService: BookingService
  ) { }

  ngOnInit() {
    this.bookingService.currentStep = this.step;
  }
}
