import { Component, OnInit } from '@angular/core';
import { SelectField, DisableUntilValueRule, Field } from '@skysmack/ng-dynamic-forms';
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
      this.runRulesOnce(fields);
      this.runRulesOnChange(fields);
    }
  }

  private runRulesOnce(fields: Field[]) {
    this.runRules({
      fields,
      selectedValue: this.getFieldValue(),
    });
  }

  public runRulesOnChange(fields: Field[]) {
    this.subscriptionHandler.register(this.getFormField().valueChanges.subscribe(() => {
      this.runRules({
        fields,
        selectedValue: this.getFieldValue(),
      });
    }));
  }
}
