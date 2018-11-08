import { RecurringMonth } from './recurring-month';
export class RecurringMonths {

    public months(): RecurringMonth[] {
        return [
            {
                month: 'Jan',
                value: 1,
                selected: false,
            },
            {
                month: 'Feb',
                value: 2,
                selected: false,
            },
            {
                month: 'Mar',
                value: 4,
                selected: false,
            },
            {
                month: 'Apr',
                value: 8,
                selected: false,
            },
            {
                month: 'May',
                value: 16,
                selected: false,
            },
            {
                month: 'Jun',
                value: 32,
                selected: false,
            },
            {
                month: 'Jul',
                value: 64,
                selected: false,
            },
            {
                month: 'Aug',
                value: 128,
                selected: false,
            },
            {
                month: 'Sep',
                value: 256,
                selected: false,
            },
            {
                month: 'Oct',
                value: 512,
                selected: false,
            },
            {
                month: 'Nov',
                value: 1024,
                selected: false,
            },
            {
                month: 'Dec',
                value: 2048,
                selected: false,
            }
        ];
    }
}
