import { Component, OnInit } from '@angular/core';
import { SelectField, DisableUntilValueRule, Field, SelectFieldOption } from '@skysmack/ng-dynamic-forms';
import { FieldBaseComponent } from '../field-base-component';
import { LocalObject } from '@skysmack/framework';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { startWith, map, tap } from 'rxjs/operators';

@Component({
  selector: 'ss-auto-complete-field',
  templateUrl: './auto-complete-field.component.html'
})
export class AutoCompleteFieldComponent extends FieldBaseComponent<SelectField> implements OnInit {

  public recordsAutoCompleteControl = new FormControl();
  public selectedOptionDisplayName: string;
  public filteredRecords$: Observable<LocalObject<any, unknown>[]>;

  ngOnInit() {
    super.ngOnInit();
    if (this.field) {
      const fields = this.fields;

      // Set selected value
      this.subscriptionHandler.register(this.field.optionsData$.pipe(
        tap((options: SelectFieldOption[]) => {
          const found = options.find(option => option.value === this.field.value);
          if (found) {
            this.selectedOptionDisplayName = found && found.displayName;
          }
        })
      ).subscribe());

      // Disable field if specified
      if (this.field.disabled) {
        this.recordsAutoCompleteControl.disable();
      }

      // Activate search
      this.filteredRecords$ = combineLatest(
        this.recordsAutoCompleteControl.valueChanges.pipe(startWith(undefined)),
        this.field.optionsData$
      ).pipe(
        map(([searchInput, records]) => searchInput && searchInput.length > 0 ? this.filter(searchInput, records) : records.slice())
      );

      this.runAllRulesOfType(DisableUntilValueRule.type, { fields });
      this.runRulesOnChange(fields);
    }
  }

  public runRulesOnChange(fields: Field[]): void {
    this.subscriptionHandler.register(this.fh.form.valueChanges.subscribe(() => {
      this.runRules({
        fields,
        selectedValue: this.getFieldValue(),
      });
    }));
  }

  public selectRecord(event: MatAutocompleteSelectedEvent): void {
    this.selectedOptionDisplayName = event.option.viewValue;
    this.setFieldValue(event.option.value);
  }

  public recordDisplayFn(option: SelectFieldOption): string {
    return option && option.displayName;
  }

  public clear(): void {
    this.recordsAutoCompleteControl.setValue('');
    this.setFieldValue(undefined);
  }

  private filter(searchInput: string, options: SelectFieldOption[]): SelectFieldOption[] {
    if (typeof (searchInput) === 'string') {
      return options.map(option => ({ option, hit: option.displayName.toLowerCase().indexOf(searchInput.toLowerCase()) })).filter(recordHit => recordHit.hit >= 0).sort((a, b) => a.hit - b.hit).map(recordHit => recordHit.option);
    }
    return options;
  }
}
