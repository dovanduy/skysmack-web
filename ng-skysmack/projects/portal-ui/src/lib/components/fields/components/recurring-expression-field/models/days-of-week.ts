import { DayOfWeek } from './day-of-week';

export class DaysOfWeek {

    public days(): DayOfWeek[] {
        return [
            {
                day: 'Mon',
                value: 2,
                selected: false
            },
            {
                day: 'Tue',
                value: 4,
                selected: false
            },
            {
                day: 'Wed',
                value: 8,
                selected: false
            },
            {
                day: 'Thu',
                value: 16,
                selected: false
            },
            {
                day: 'Fri',
                value: 32,
                selected: false
            },
            {
                day: 'Sat',
                value: 64,
                selected: false
            },
            {
                day: 'Sun',
                value: 1,
                selected: false
            },
        ];
    }
}
