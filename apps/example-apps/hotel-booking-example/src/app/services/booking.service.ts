import { Injectable } from '@angular/core';
import { BookingSteps } from '../models/booking-steps';
import { Router } from '@angular/router';
import { Room } from '../models/room';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookingService {
    // Current booking step
    private _currentStep: BookingSteps;
    public get currentStep(): BookingSteps {
        return this._currentStep;
    }
    public set currentStep(v: BookingSteps) {
        this._currentStep = v;
    }

    // Rooms    
    private _rooms$ = new BehaviorSubject<Room[]>([
        new Room({
            numberOfPeople: 2
        })
    ]);
    public get rooms$(): BehaviorSubject<Room[]> {
        return this._rooms$;
    }
    public set rooms$(v: BehaviorSubject<Room[]>) {
        this._rooms$ = v;
    }

    constructor(
        private router: Router
    ) {
        this.startOnGuests();
    }

    public addRoom(room: Room) {
        const rooms = this.rooms$.getValue();
        this.rooms$.next([...rooms, room]);
    }

    public removeRoom(room: Room) {
        const rooms = this.rooms$.getValue();
        this.rooms$.next(rooms.filter(currentRoom => currentRoom.id === room.id));
    }

    private startOnGuests() {
        if (!this.currentStep) {
            this.currentStep = BookingSteps.Guests
            this.router.navigate(['/', 'guests'])
        }
    }
}