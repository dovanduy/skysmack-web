import { Injectable } from '@angular/core';
import { BookingSteps } from '../models/booking-steps';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class BookingService {
    private _currentStep: BookingSteps;
    public get currentStep(): BookingSteps {
        return this._currentStep;
    }
    public set currentStep(v: BookingSteps) {
        this._currentStep = v;
    }

    constructor(
        private router: Router
    ) {
        this.startOnGuests();
    }

    private startOnGuests() {
        if (!this.currentStep) {
            this.currentStep = BookingSteps.Guests
            this.router.navigate(['/', 'guests'])
        }
    }
}