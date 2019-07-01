import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { Field, DisableUntilValueRule, SelectField, SelectFieldOption } from '@skysmack/ng-ui';
import { map, tap, take } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'ss-flagged-enum-field',
  templateUrl: './flagged-enum-field.component.html'
})
export class FlaggedEnumFieldComponent extends FieldBaseComponent<SelectField> implements OnInit, AfterViewInit {
  @ViewChild('selectInput', { static: false }) public selectInput: MatSelect;

  /**
   * Selected flag values (e.g. 7) as a numbers array (e.g. [1,2,4])
   */
  public selectedValues: number[] = [];

  ngOnInit() {
    super.ngOnInit();

    if (this.field) {
      const fields = this.fields;
      this.runAllRulesOfType(DisableUntilValueRule.type, { fields });
      this.runRulesOnChange(fields);
    }
  }

  ngAfterViewInit() {
    this.setSelectedValues();
    this.selectInput.valueChange.pipe(map((values: number[]) => {
      this.setFieldValue(values.reduce((a, b) => a + b, 0));
    })).subscribe();
  }


  public runRulesOnChange(fields: Field[]) {
    this.subscriptionHandler.register(this.fh.form.valueChanges.subscribe(() => {
      this.runRules({
        fields,
        selectedValue: this.getFieldValue(),
      });
    }));
  }

  private setSelectedValues() {
    this.field.optionsData$.pipe(tap((x: SelectFieldOption[]) => {
      const selectableValues: number[] = x.map(y => y.value).sort((a, b) => b - a);
      let currentValues: number = this.field.value;
      for (let index = 0; index < selectableValues.length; index++) {
        const selectableValue = selectableValues[index];
        if (currentValues >= selectableValue) {
          this.selectedValues.push(selectableValue);
          currentValues -= selectableValue;
        }
      }
    }), take(1)).subscribe();
  }

}
