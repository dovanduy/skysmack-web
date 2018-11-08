import { Component } from '@angular/core';
import { ExpressionValues } from 'ui/fields/components/recurring-expression-field/models';

@Component({
  selector: 'ss-recurring-yearly',
  templateUrl: './recurring-yearly.component.html',
  styleUrls: ['./recurring-yearly.component.scss']
})
export class RecurringYearlyComponent extends ExpressionValues { }
