import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'weekday' })
export class WeekdayPipe implements PipeTransform {
    transform(date: Date, format: 'number' | 'readable' = 'number'): number | string {
        const dayNumber = new Date(date).getDay();
        if (format === 'number') {
            return dayNumber;
        }

        switch (dayNumber) {
            case 1: {
                return 'Monday'
            }
            case 2: {
                return 'Tuesday'
            }
            case 3: {
                return 'Wednesday'
            }
            case 4: {
                return 'Thursday'
            }
            case 5: {
                return 'Friday'
            }
            case 6: {
                return 'Saturday'
            }
            default: {
                return 'Sunday';
            }
        }
    }
}
