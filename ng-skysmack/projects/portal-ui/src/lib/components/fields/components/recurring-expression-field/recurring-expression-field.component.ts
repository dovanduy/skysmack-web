import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { stringIntToInt } from '@skysmack/framework';
import { RecurringExpressionEvaluator } from './models/recurring-expression-evaluator';

@Component({
  selector: 'ss-recurring-expression-field',
  templateUrl: './recurring-expression-field.component.html',
  styleUrls: ['./recurring-expression-field.component.scss']
})
export class RecurringExpressionFieldComponent extends FieldBaseComponent implements OnInit {

  public recurringExpressionEvaluator: RecurringExpressionEvaluator;
  public showRecurringExpression = false;
  public showCustom = false;

  ngOnInit() {
    super.ngOnInit();
    this.removeExpressionField();
  }

  public setRecurringExpressionEvaluator() {
    const recurringExpressionEvaluator = {
      cronStringFormat: 0 as any,
      expression: '',
      secondly: 0,
      seconds: 0,
      minutely: 0,
      minutes: 0,
      hourly: 0,
      hours: 0,
      daily: 0,
      dates: [],
      daysOfWeek: 0 as any,
      recurringOption: 0 as any,
      weekly: 0,
      monthly: 0,
      months: 0 as any,
      yearly: 0
    } as RecurringExpressionEvaluator;

    this.setFieldValue(recurringExpressionEvaluator);
    this.recurringExpressionEvaluator = recurringExpressionEvaluator;
    this.updateExpressionWith(recurringExpressionEvaluator);
  }

  public updateExpressionWith(values: any) {
    Object.keys(values).forEach(key => this.recurringExpressionEvaluator[key] = stringIntToInt(values[key]));
  }

  public toggleRepeat() {
    this.showRecurringExpression = !this.showRecurringExpression;
    if (this.showRecurringExpression) {
      this.setRecurringExpressionEvaluator();

      // Ensure custom expression is set to false when recurring expression is turned off,
      // so it'll always be off when repeat is turned on again.
      this.showCustom = false;
    } else {
      this.recurringExpressionEvaluator = null;
      this.setFieldValue(undefined);
    }
  }

  public toggleCustom() {
    this.showCustom = !this.showCustom;
    this.setRecurringExpressionEvaluator();
  }

  /**
   * Removes the expression field from the form values (is added again when toggled on).
   */
  private removeExpressionField() {
    if (this.getFieldValue() === undefined) {
      this.setFieldValue('');
      this.setFieldValue(undefined);
    }
  }
}
