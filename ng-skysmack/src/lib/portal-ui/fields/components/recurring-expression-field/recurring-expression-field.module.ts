import { NgModule, } from '@angular/core';

import { FrameworkModule } from 'framework';
import { FormsModule } from '@angular/forms';
import { RecurringExpressionFieldComponent } from 'ui/fields/components/recurring-expression-field/recurring-expression-field.component';
import { RecurringCustomExpressionComponent } from 'ui/fields/components/recurring-expression-field/components/recurring-custom-expression/recurring-custom-expression.component';
import { RecurringDailyComponent } from 'ui/fields/components/recurring-expression-field/components/recurring-daily/recurring-daily.component';
import { RecurringWeeklyComponent } from 'ui/fields/components/recurring-expression-field/components/recurring-weekly/recurring-weekly.component';
import { RecurringMonthlyComponent } from 'ui/fields/components/recurring-expression-field/components/recurring-monthly/recurring-monthly.component';
import { RecurringYearlyComponent } from 'ui/fields/components/recurring-expression-field/components/recurring-yearly/recurring-yearly.component';
import { MonthlyFrequencyComponent } from 'ui/fields/components/recurring-expression-field/components/recurring-monthly/monthly-frequency/monthly-frequency.component';
import { DailyFrequencyComponent } from 'ui/fields/components/recurring-expression-field/components/recurring-daily/daily-frequency/daily-frequency.component';
import { WeeklyFrequencyComponent } from 'ui/fields/components/recurring-expression-field/components/recurring-weekly/weekly-frequency/weekly-frequency.component';
import { DatesComponent } from 'ui/fields/components/recurring-expression-field/components/recurring-daily/dates/dates.component';
import { DayOfWeekComponent } from 'ui/fields/components/recurring-expression-field/components/recurring-daily/day-of-week/day-of-week.component';
import { MonthsComponent } from 'ui/fields/components/recurring-expression-field/components/recurring-monthly/months/months.component';
import { YearlyFrequencyComponent } from 'ui/fields/components/recurring-expression-field/components/recurring-yearly/yearly-frequency/yearly-frequency.component';
import { RecurringTimeComponent } from 'ui/fields/components/recurring-expression-field/components/recurring-time/recurring-time.component';
import { SpecificTimeComponent } from 'ui/fields/components/recurring-expression-field/components/recurring-time/specific-time/specific-time.component';
import { TimeUnitComponent } from 'ui/fields/components/recurring-expression-field/components/recurring-time/time-unit/time-unit.component';
import { MaterialModule } from 'ui/material.module';

@NgModule({
    imports: [
        FrameworkModule,
        FormsModule,
        MaterialModule
    ],
    declarations: [
        RecurringExpressionFieldComponent,
        RecurringCustomExpressionComponent,
        RecurringTimeComponent,
        RecurringDailyComponent,
        RecurringWeeklyComponent,
        RecurringMonthlyComponent,
        RecurringYearlyComponent,
        DailyFrequencyComponent,
        WeeklyFrequencyComponent,
        MonthlyFrequencyComponent,
        YearlyFrequencyComponent,
        SpecificTimeComponent,
        TimeUnitComponent,
        DayOfWeekComponent,
        DatesComponent,
        MonthsComponent,
    ],
    exports: [RecurringExpressionFieldComponent],
    providers: []
})
export class RecurringExpressionFieldModule { }
