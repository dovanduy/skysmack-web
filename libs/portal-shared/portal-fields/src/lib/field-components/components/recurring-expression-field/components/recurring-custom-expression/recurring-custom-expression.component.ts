import { Component } from '@angular/core';
import { ExpressionValues } from '../../models/expression-values';

@Component({
  selector: 'ss-recurring-custom-expression',
  templateUrl: './recurring-custom-expression.component.html'
})
export class RecurringCustomExpressionComponent extends ExpressionValues {
  private _expression: string;
  public get expression(): string {
    return this._expression;
  }
  public set expression(v: string) {
    this.selectedValues.emit({
      expression: v
    });
    this._expression = v;
  }
}
