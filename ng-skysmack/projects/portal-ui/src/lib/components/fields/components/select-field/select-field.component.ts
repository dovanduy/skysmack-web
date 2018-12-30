import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from './../../../../fields/field-base-component';
import { SelectField } from './../../../../fields/select-field';
import { DisableUntilValueRule } from './../../../../forms/rules/disable-until-value-rule';

@Component({
  selector: 'ss-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss']
})
export class SelectFieldComponent extends FieldBaseComponent implements OnInit {
  public fieldOptions = [];

  ngOnInit() {
    super.ngOnInit();
    this.fieldOptions = (this.field as SelectField).getOptions();
    this.runAllRulesOfType(DisableUntilValueRule.type, { fields: this.fields });
    this.runRulesOnChange();
  }

  public runRulesOnChange() {
    this.subscribe(this.fh.form.valueChanges.subscribe(() => {
      this.runRules({
        fields: this.fields,
        selectedValue: this.getFieldValue(),
      });
      this.fieldOptions = (this.field as SelectField).getOptions();
    }));
  }
}
