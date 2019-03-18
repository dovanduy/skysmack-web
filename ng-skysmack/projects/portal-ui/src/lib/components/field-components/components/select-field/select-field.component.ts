import { Component, OnInit } from '@angular/core';
import { SelectField, DisableUntilValueRule, Field } from '@skysmack/ng-ui';
import { FieldBaseComponent } from '../field-base-component';

@Component({
  selector: 'ss-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss']
})
export class SelectFieldComponent extends FieldBaseComponent implements OnInit {
  public fieldOptions: { value: any, displayName: string }[] = [];
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
