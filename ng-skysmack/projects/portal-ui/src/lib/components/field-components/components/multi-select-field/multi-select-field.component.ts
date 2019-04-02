import { Component, OnInit } from '@angular/core';
import { SelectField, DisableUntilValueRule, Field, SelectFieldOption } from '@skysmack/ng-ui';
import { FieldBaseComponent } from '../field-base-component';

@Component({
  selector: 'ss-multi-select-field',
  templateUrl: './multi-select-field.component.html'
})
export class MultiSelectFieldComponent extends FieldBaseComponent implements OnInit {
  public fieldOptions: SelectFieldOption[] = [];
  public nullDisplayName = undefined;

  ngOnInit() {
    super.ngOnInit();
    this.subscriptionHandler.register(this.fields$.subscribe((fields: any) => {
      if (this.field) {
        this.runAllRulesOfType(DisableUntilValueRule.type, { fields });
        this.runRulesOnChange(fields);
        this.fieldOptions = (this.field as SelectField).getOptions();
        const nullValueOption = this.fieldOptions.find(x => x.value === null);
        this.nullDisplayName = nullValueOption ? nullValueOption.displayName : undefined;
      }
    }));
  }

  public runRulesOnChange(fields: Field[]) {
    this.subscriptionHandler.register(this.fh.form.valueChanges.subscribe(() => {
      this.runRules({
        fields,
        selectedValue: this.getFieldValue(),
      });
      this.fieldOptions = (this.field as SelectField).getOptions();
    }));
  }
}
