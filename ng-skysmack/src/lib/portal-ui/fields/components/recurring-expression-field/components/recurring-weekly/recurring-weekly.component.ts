import { ExpressionValues } from 'ui/fields/components/recurring-expression-field/models/expression-values';
import { Component } from '@angular/core';

@Component({
  selector: 'ss-recurring-weekly',
  templateUrl: './recurring-weekly.component.html',
  styleUrls: ['./recurring-weekly.component.scss']
})
export class RecurringWeeklyComponent extends ExpressionValues { }
