import {
    addDays,
    addHours,
    addMinutes,
    addSeconds,
    differenceInDays,
    differenceInMinutes,
    differenceInSeconds,
    endOfDay,
    endOfMonth,
    endOfWeek,
    getDay,
    getMonth,
    isSameDay,
    isSameMonth,
    isSameSecond,
    max,
    setHours,
    setMinutes,
    startOfDay,
    startOfMinute,
    startOfMonth,
    startOfWeek,
    getHours,
    getMinutes,
    addWeeks,
    addMonths,
    subDays,
    subWeeks,
    subMonths,
    getISOWeek,
    setDate,
    setMonth,
    setYear,
    getDate,
    getYear
} from 'date-fns';

import { DateAdapter } from 'angular-calendar';

// Code taken from https://stackblitz.com/edit/angular-xzssvt?file=demo/date-fns-v2-adapter.ts
// based on from https://github.com/mattlewis92/calendar-utils/issues/33
// Can be removed when above git thread issue has been resolved.

export function adapterFactory(): DateAdapter {
    return {
        addDays,
        addHours,
        addMinutes,
        addSeconds,
        differenceInDays,
        differenceInMinutes,
        differenceInSeconds,
        endOfDay,
        endOfMonth,
        endOfWeek,
        getDay,
        getMonth,
        isSameDay,
        isSameMonth,
        isSameSecond,
        max(...dates: Date[]) {
            return max(dates);
        },
        setHours,
        setMinutes,
        startOfDay,
        startOfMinute,
        startOfMonth,
        startOfWeek,
        getHours,
        getMinutes,
        addWeeks,
        addMonths,
        subDays,
        subWeeks,
        subMonths,
        getISOWeek,
        setDate,
        setMonth,
        setYear,
        getDate,
        getYear
    };
}