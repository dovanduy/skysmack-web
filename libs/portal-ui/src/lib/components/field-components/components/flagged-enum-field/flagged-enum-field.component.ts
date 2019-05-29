import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { Field, DisableUntilValueRule } from '@skysmack/ng-ui';
import { map } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'ss-flagged-enum-field',
  templateUrl: './flagged-enum-field.component.html'
})
export class FlaggedEnumFieldComponent extends FieldBaseComponent<Field> implements OnInit, AfterViewInit {
  @ViewChild('selectInput', { static: false }) public selectInput: MatSelect;

  ngOnInit() {
    super.ngOnInit();

    if (this.field) {
      const fields = this.fields;
      this.runAllRulesOfType(DisableUntilValueRule.type, { fields });
      this.runRulesOnChange(fields);
    }
  }

  ngAfterViewInit() {
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
}
