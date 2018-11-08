export class RepeatDays {

    public days(): RepeatDay[] {
        return [
            {
                day: 'Mon',
                value: 1,
                selected: false
            },
            {
                day: 'Tue',
                value: 2,
                selected: false
            },
            {
                day: 'Wed',
                value: 4,
                selected: false
            },
            {
                day: 'Thu',
                value: 8,
                selected: false
            },
            {
                day: 'Fri',
                value: 16,
                selected: false
            },
            {
                day: 'Sat',
                value: 32,
                selected: false
            },
            {
                day: 'Sun',
                value: 64,
                selected: false
            },
        ];
    }
}

export class RepeatDay {
    day: string;
    value: number;
    selected: boolean;
}
