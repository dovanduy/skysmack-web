import { NativeDateAdapter } from '@angular/material/core';
import { Injectable } from '@angular/core';
import * as _moment from 'moment';
const moment = _moment;

@Injectable({ providedIn: 'root' })
export class DateOnlyAdapter2 extends NativeDateAdapter {
    public getFirstDayOfWeek(): number {
        return 1;
    }

    public format(date: Date, displayFormat: Object): string {
        return moment(date).format('DD-MM-YYYY');
    }
}
