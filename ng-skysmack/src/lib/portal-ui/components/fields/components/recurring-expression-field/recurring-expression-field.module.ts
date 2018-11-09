import { NgModule, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecurringTimeComponent } from './components/recurring-time/recurring-time.component';
import { YearlyFrequencyComponent } from './components/recurring-yearly/yearly-frequency/yearly-frequency.component';
import { SpecificTimeComponent } from './components/recurring-time/specific-time/specific-time.component';
import { TimeUnitComponent } from './components/recurring-time/time-unit/time-unit.component';
import { RecurringExpressionFieldComponent, RecurringCustomExpressionComponent, RecurringDailyComponent, RecurringWeeklyComponent, RecurringMonthlyComponent, RecurringYearlyComponent, DailyFrequencyComponent, WeeklyFrequencyComponent, MonthlyFrequencyComponent, DayOfWeekComponent, DatesComponent, MonthsComponent } from 'lib/portal-ui/components';
import { MaterialModule } from 'lib/portal-ui/material.module';


@NgModule({
    imports: [
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
