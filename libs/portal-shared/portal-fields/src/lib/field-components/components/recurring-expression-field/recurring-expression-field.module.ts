import { NgModule, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecurringTimeComponent } from './components/recurring-time/recurring-time.component';
import { YearlyFrequencyComponent } from './components/recurring-yearly/yearly-frequency/yearly-frequency.component';
import { SpecificTimeComponent } from './components/recurring-time/specific-time/specific-time.component';
import { TimeUnitComponent } from './components/recurring-time/time-unit/time-unit.component';
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

const material = [
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatInputModule,
    MatTabsModule,
    MatSelectModule,
    MatCheckboxModule
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        ...material
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
