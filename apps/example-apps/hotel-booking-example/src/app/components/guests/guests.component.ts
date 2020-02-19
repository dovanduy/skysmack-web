import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { BookingBaseComponent } from '../booking-base';
import { BookingSteps } from '../../models/booking-steps';
import { SelectFieldOption } from '@skysmack/ng-dynamic-forms';
import { BehaviorSubject } from 'rxjs';
import { Room } from '../../models/room';

@Component({
  selector: 'ss-booking-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.scss'],
})
export class GuestsComponent extends BookingBaseComponent implements OnInit {
  public step = BookingSteps.Guests;

  public rooms$: BehaviorSubject<Room[]>;

  public adultOptions: SelectFieldOption[] = [
    {
      displayName: '1 Adult',
      value: 1
    },
    {
      displayName: '2 Adults',
      value: 2
    },
    {
      displayName: '3 Adults',
      value: 3
    },
    {
      displayName: '4 Adults',
      value: 4
    },
    {
      displayName: '5 Adults',
      value: 5
    }
  ];

  constructor(
    protected bookingService: BookingService
  ) {
    super(bookingService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.rooms$ = this.bookingService.rooms$
  }

  public addRoom() {
    this.bookingService.addRoom(new Room({
      numberOfPeople: 2
    }));
  }
}
