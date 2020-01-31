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

  public selectedOptionDisplayName: string;
  public filteredRecords$: Observable<LocalObject<any, unknown>[]>;
  private dataOptions: SelectFieldOption[];

  ngOnInit() {
    super.ngOnInit();
    if (this.field) {
      const fields = this.fields;

      // Set selected value
      this.subscriptionHandler.register(this.field.optionsData$.pipe(
        tap((options: SelectFieldOption[]) => {
          this.dataOptions = options;
          const found = options.find(option => option.value === this.field.value);
          if (found) {
            this.selectedOptionDisplayName = found && found.displayName;
          }
        })
      ).subscribe());

      // Activate search
      this.filteredRecords$ = combineLatest(
        this.getFormField().valueChanges.pipe(startWith(undefined)),
        this.field.optionsData$
      ).pipe(
        map(([searchInput, records]) => {

          // If the search input does not equal a value in the list, the field value has NOT been correctly set.
          if (!this.inList(searchInput)) {
            this.getFormField().setErrors({ notInList: true });
          } else {
            this.getFormField().setErrors(null);
          }

          return searchInput && searchInput.length > 0 ? this.filter(searchInput, records) : records.slice();
        })
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
    this.setFieldValue(undefined);
  }

  private filter(searchInput: string, options: SelectFieldOption[]): SelectFieldOption[] {
    if (typeof (searchInput) === 'string') {
      return options.map(option => ({ option, hit: option.displayName.toLowerCase().indexOf(searchInput.toLowerCase()) })).filter(recordHit => recordHit.hit >= 0).sort((a, b) => a.hit - b.hit).map(recordHit => recordHit.option);
    }
    return options;
  }

  private inList(selectedValue: string): boolean {
    const found = this.dataOptions.find(select => select.value === selectedValue);
    return found ? true : false;
  }
}
