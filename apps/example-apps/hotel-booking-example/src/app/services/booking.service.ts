import { Injectable } from '@angular/core';
import { BookingSteps } from '../models/booking-steps';

@Injectable({ providedIn: 'root' })
export class BookingService {
    private _currentStep: BookingSteps;
    public get currentStep(): BookingSteps {
        return this._currentStep;
    }
    public set currentStep(v: BookingSteps) {
        this._currentStep = v;
    }


}