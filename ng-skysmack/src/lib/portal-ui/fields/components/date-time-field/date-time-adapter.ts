import { NativeDateAdapter } from '@angular/material';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class DateTimeAdapter extends NativeDateAdapter {
    public getFirstDayOfWeek(): number {
        return 1;
    }

    public format(date: Date, displayFormat: Object): string {
        return moment(date).format('DD-MM-YYYY');
    }
}
