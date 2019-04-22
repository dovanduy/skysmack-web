import { Component, OnInit } from '@angular/core';
import { SelectField, DisableUntilValueRule, Field } from '@skysmack/ng-ui';
import { FieldBaseComponent } from '../field-base-component';

@Component({
  selector: 'ss-select-field',
  templateUrl: './select-field.component.html'
})
export class SelectFieldComponent extends FieldBaseComponent<SelectField> implements OnInit {

  ngOnInit() {
    super.ngOnInit();
    if (this.field) {
      const fields = this.fields;
      this.runAllRulesOfType(DisableUntilValueRule.type, { fields });
      this.runRulesOnChange(fields);
    }
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
