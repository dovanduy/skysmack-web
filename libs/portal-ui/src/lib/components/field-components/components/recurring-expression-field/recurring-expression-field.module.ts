import { NgModule, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecurringTimeComponent } from './components/recurring-time/recurring-time.component';
import { YearlyFrequencyComponent } from './components/recurring-yearly/yearly-frequency/yearly-frequency.component';
import { SpecificTimeComponent } from './components/recurring-time/specific-time/specific-time.component';
import { TimeUnitComponent } from './components/recurring-time/time-unit/time-unit.component';
import { MaterialModule } from './../../../../material.module';
import { CommonModule } from '@angular/common';
import { RecurringExpressionFieldComponent } from './recurring-expression-field.component';
import { RecurringCustomExpressionComponent } from './components/recurring-custom-expression/recurring-custom-expression.component';
import { RecurringDailyComponent } from './components/recurring-daily/recurring-daily.component';
import { RecurringWeeklyComponent } from './components/recurring-weekly/recurring-weekly.component';
import { RecurringMonthlyComponent } from './components/recurring-monthly/recurring-monthly.component';
import { RecurringYearlyComponent } from './components/recurring-yearly/recurring-yearly.component';
import { DailyFrequencyComponent } from './components/recurring-daily/daily-frequency/daily-frequency.component';
import { WeeklyFrequencyComponent } from './components/recurring-weekly/weekly-frequency/weekly-frequency.component';
import { MonthlyFrequencyComponent } from './components/recurring-monthly/monthly-frequency/monthly-frequency.component';
import { DayOfWeekComponent } from './components/recurring-daily/day-of-week/day-of-week.component';
import { DatesComponent } from './components/recurring-daily/dates/dates.component';
import { MonthsComponent } from './components/recurring-monthly/months/months.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        TranslateModule
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
        MonthsComponent
    ],
    exports: [RecurringExpressionFieldComponent],
    providers: []
})
export class RecurringExpressionFieldModule { }
