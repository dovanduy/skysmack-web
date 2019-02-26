import { Component, OnInit, Injector } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicFieldRouteData, flatten, FieldValueProviderViewModel, LocalObject } from '@skysmack/framework';
import { NgDocumentRecordReduxStore } from '@skysmack/ng-redux';
import { map, switchMap, filter } from 'rxjs/operators';

type ValidatorTypes = 'range' | 'required';

class FieldValidator {
  public type: ValidatorTypes;
  public value: any;

  constructor(values: Partial<FieldValidator>) {
    Object.assign(this, values);
  }
}

@Component({
  selector: 'ss-validators-field',
  templateUrl: './validators-field.component.html',
  styleUrls: ['./validators-field.component.scss']
})
export class ValidatorsFieldComponent extends FieldBaseComponent implements OnInit {

  public store: NgDocumentRecordReduxStore<any, any, any>;
  public packagePath: string;
  public selectedFieldType: string;

  // Possible validators to add.
  public availableValidators: { value: string, displayName: string }[] = [];

  // Current validator getting added.
  public selectedValidatorType: ValidatorTypes;
  public currentValidator: FieldValidator;

  // Validators added to the field
  public addedValidators: FieldValidator[] = [];

  constructor(
    public injector: Injector,
    public router: Router,
    public activatedRoute: ActivatedRoute,
  ) { super(); }

  ngOnInit() {
    super.ngOnInit();

    this.packagePath = this.router.url.split('/')[1];

    this.subscriptions.push(this.fh.form.valueChanges.pipe(
      map(changes => {
        if (changes['type'] && this.selectedFieldType !== changes['type']) {
          this.selectedFieldType = changes['type'];
          return true;
        }
      }),
      filter(x => x),
      switchMap(() => this.activatedRoute.data),
      map((data: DynamicFieldRouteData) => {
        this.store = this.injector.get(data.storeToken);
      }),
      switchMap(() => this.store.getAvailableFields(this.packagePath).pipe(
        flatten(),
        filter((availableField: LocalObject<FieldValueProviderViewModel, string>) => availableField.object.name === this.selectedFieldType),
        map(selectedAvailableField => {
          this.availableValidators = Object.keys(selectedAvailableField.object.validators).map(key => {
            return {
              value: key,
              displayName: key
            };
          });
        })
      ))
    ).subscribe());
  }

  public addValidator() {
    this.currentValidator = new FieldValidator({});
  }

  public done() {
    this.currentValidator.type = this.selectedValidatorType;
    this.addedValidators.push(this.currentValidator);
    this.availableValidators = this.availableValidators.filter(availableValidator => availableValidator.value !== this.currentValidator.type);
    const validatorToAdd: { name: string, parameters?: {} } = { name: '' };
    validatorToAdd.name = this.currentValidator.type;
    this.setFieldValue([validatorToAdd]);
    this.currentValidator = undefined;
  }

  public undo(validator: FieldValidator) {
    this.currentValidator = undefined;
  }

  public removeValidator(selectedValidator: FieldValidator) {
    this.addedValidators = this.addedValidators.filter(validator => validator.type !== selectedValidator.type);
    this.availableValidators.push({ value: selectedValidator.type, displayName: selectedValidator.type });
  }
}
