import { Pipe, PipeTransform } from '@angular/core';
import * as _moment from 'moment';
const moment = _moment;

@Pipe({ name: 'weekNo' })
export class WeekNoPipe implements PipeTransform {
    transform(date: Date): string {
        const weekNo = moment(date).isoWeek();

        return (Number(weekNo) <= 9 || Number(weekNo) <= 1) ? `0${weekNo}` : weekNo;
    }
}
