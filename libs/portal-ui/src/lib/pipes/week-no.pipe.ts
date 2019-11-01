import { Pipe, PipeTransform } from '@angular/core';
import * as _moment from 'moment';
const moment = _moment;

@Pipe({ name: 'weekNo' })
export class WeekNoPipe implements PipeTransform {
    transform(date: Date): string {
        return moment(date).week();
    }
}
