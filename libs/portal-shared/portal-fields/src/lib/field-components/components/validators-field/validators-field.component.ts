import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { Router } from '@angular/router';
import { flatten, FieldValueProviderViewModel, LocalObject, StrIndex, SubscriptionHandler } from '@skysmack/framework';
import { NgRecordStore, NgFieldStore } from '@skysmack/ng-framework';
import { map, switchMap, filter } from 'rxjs/operators';
import { Field } from '@skysmack/ng-dynamic-forms';

type ValidatorTypes = 'range' | 'required';

class FieldValidator {
  public name: ValidatorTypes;
  public parameters?: StrIndex<any>;

  constructor(values: Partial<FieldValidator>) {
    Object.assign(this, values);
  }
}

@Component({
  selector: 'ss-validators-field',
  templateUrl: './validators-field.component.html'
})
export class ValidatorsFieldComponent extends FieldBaseComponent<Field> implements OnInit {

  protected subscriptionHandler = new SubscriptionHandler();
  public store: NgRecordStore<any, any, any>;
  public packagePath: string;
  public selectedFieldType: string;

  // Possible validators to add.
  public availableValidators: FieldValidator[] = [];

  // Current validator getting added.
  public selectedValidatorType: ValidatorTypes;
  public currentValidator: FieldValidator;

  // Validators added to the field
  public addedValidators: FieldValidator[] = [];

  constructor(
    public router: Router,
    public fieldsStore: NgFieldStore
  ) { super(); }

  ngOnInit() {
    super.ngOnInit();
    this.packagePath = this.router.url.split('/')[1];

    if (!this.field.value) {
      this.setFieldValue([]);
    }

    // Get default values
    this.addedValidators = this.getFieldValue() ? this.getFieldValue() : [];
    this.selectedFieldType = this.getOtherFieldValue('type');

    // Listen for form changes
    const formValueChanged$ = this.fh.form.valueChanges.pipe(
      map(changes => {
        // Listen for field type changes
        if (changes['type'] && this.selectedFieldType !== changes['type']) {
          this.selectedFieldType = changes['type'];
        }
        return changes;
      })
    );

    const setAvailablValidators$ = this.fieldsStore.getAvailableFields(this.packagePath).pipe(
      flatten(),
      // Create available validators
      filter((availableField: LocalObject<FieldValueProviderViewModel, string>) => availableField.object.name === this.selectedFieldType),
      map(selectedAvailableField => {
        this.availableValidators = Object.keys(selectedAvailableField.object.validators).map(key => {
          return new FieldValidator({
            name: key as ValidatorTypes
          });
        });

        // If a validator has already been added, remove it from available, as it should not be available twice.
        this.availableValidators = this.availableValidators.filter(availableValidator => !this.addedValidators.find(addedValidator => addedValidator.name === availableValidator.name));
      })
    );

    // Set available validators on form change
    this.subscriptionHandler.register(formValueChanged$.pipe(switchMap(() => setAvailablValidators$)).subscribe());
    // Set available validators on component startup
    this.subscriptionHandler.register(setAvailablValidators$.subscribe());
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  public addValidator() {
    this.currentValidator = new FieldValidator({});
  }

  public setParameters(parameters: StrIndex<any>) {
    this.currentValidator.parameters = parameters;
  }

  public removeParameters() {
    this.currentValidator.parameters = undefined;
  }

  public done() {
    if (this.selectedValidatorType) {
      // Set
      this.currentValidator.name = this.selectedValidatorType;
      this.addedValidators.push(this.currentValidator);
      this.setFieldValue(this.addedValidators);

      // Update
      this.availableValidators = this.availableValidators.filter(availableValidator => availableValidator.name !== this.currentValidator.name);

      // Clear
      this.selectedValidatorType = undefined;
      this.currentValidator = undefined;
    }
  }

  public undo() {
    this.selectedValidatorType = undefined;
    this.currentValidator = undefined;
  }

  public removeValidator(selectedValidator: FieldValidator) {
    this.addedValidators = this.addedValidators.filter(validator => validator.name !== selectedValidator.name);
    this.setFieldValue(this.addedValidators.length === 0 ? [] : this.addedValidators);
  }
}
