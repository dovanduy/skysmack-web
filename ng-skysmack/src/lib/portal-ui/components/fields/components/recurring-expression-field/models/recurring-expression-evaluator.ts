/**
 * Skysmack API
 * Official API documentation for Skysmack
 *
 * OpenAPI spec version: 1.0.0
 * Contact: hej@itinstituttet.dk
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

export interface RecurringExpressionEvaluator {
    cronStringFormat?: RecurringExpressionEvaluator.CronStringFormatEnum;
    expression?: string;
    secondly?: number;
    seconds?: number;
    minutely?: number;
    minutes?: number;
    hourly?: number;
    hours?: number;
    daily?: number;
    dates?: Array<number>;
    daysOfWeek?: RecurringExpressionEvaluator.DaysOfWeekEnum;
    recurringOption?: RecurringExpressionEvaluator.RecurringOptionEnum;
    weekly?: number;
    monthly?: number;
    months?: RecurringExpressionEvaluator.MonthsEnum;
    yearly?: number;
}
export namespace RecurringExpressionEvaluator {
    export type CronStringFormatEnum = 'default' | 'withYears' | 'withSeconds' | 'withSecondsAndYears';
    export const CronStringFormatEnum = {
        Default: 'default' as CronStringFormatEnum,
        WithYears: 'withYears' as CronStringFormatEnum,
        WithSeconds: 'withSeconds' as CronStringFormatEnum,
        WithSecondsAndYears: 'withSecondsAndYears' as CronStringFormatEnum
    }
    export type DaysOfWeekEnum = 'none' | 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'weekdays' | 'weekend' | 'all';
    export const DaysOfWeekEnum = {
        None: 'none' as DaysOfWeekEnum,
        Sunday: 'sunday' as DaysOfWeekEnum,
        Monday: 'monday' as DaysOfWeekEnum,
        Tuesday: 'tuesday' as DaysOfWeekEnum,
        Wednesday: 'wednesday' as DaysOfWeekEnum,
        Thursday: 'thursday' as DaysOfWeekEnum,
        Friday: 'friday' as DaysOfWeekEnum,
        Saturday: 'saturday' as DaysOfWeekEnum,
        Weekdays: 'weekdays' as DaysOfWeekEnum,
        Weekend: 'weekend' as DaysOfWeekEnum,
        All: 'all' as DaysOfWeekEnum
    }
    export type RecurringOptionEnum = 'none' | 'first' | 'second' | 'third' | 'fourth' | 'last';
    export const RecurringOptionEnum = {
        None: 'none' as RecurringOptionEnum,
        First: 'first' as RecurringOptionEnum,
        Second: 'second' as RecurringOptionEnum,
        Third: 'third' as RecurringOptionEnum,
        Fourth: 'fourth' as RecurringOptionEnum,
        Last: 'last' as RecurringOptionEnum
    }
    export type MonthsEnum = 'none' | 'january' | 'february' | 'march' | 'april' | 'may' | 'june' | 'july' | 'august' | 'september' | 'october' | 'november' | 'december' | 'all';
    export const MonthsEnum = {
        None: 'none' as MonthsEnum,
        January: 'january' as MonthsEnum,
        February: 'february' as MonthsEnum,
        March: 'march' as MonthsEnum,
        April: 'april' as MonthsEnum,
        May: 'may' as MonthsEnum,
        June: 'june' as MonthsEnum,
        July: 'july' as MonthsEnum,
        August: 'august' as MonthsEnum,
        September: 'september' as MonthsEnum,
        October: 'october' as MonthsEnum,
        November: 'november' as MonthsEnum,
        December: 'december' as MonthsEnum,
        All: 'all' as MonthsEnum
    }
}
