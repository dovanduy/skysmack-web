import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { BookingSteps } from '../../models/booking-steps';

@Component({
  selector: 'ss-booking-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
})
export class StepsComponent implements OnInit {

  public steps = BookingSteps;
  public currentStep: BookingSteps;

  constructor(
    protected bookingService: BookingService
  ) { }

  ngOnInit() {
    this.currentStep = this.bookingService.currentStep;
  }

  public setCurrentStep(step: BookingSteps) {
    this.currentStep = step;
    this.bookingService.currentStep = step;
  }
}
