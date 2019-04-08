import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, SetFieldKeyRule } from '@skysmack/ng-ui';
import { LocalObject, FieldSchemaViewModel } from '@skysmack/framework';
import { Field } from '@skysmack/ng-ui';
import { FieldsValidation } from './ng-fields-validation';
import { SelectField } from '@skysmack/ng-ui';
import { FieldsConfig } from './fields-config';
import { StringFieldComponent } from '../components/field-components/components/string-field/string-field.component';
import { SelectFieldComponent } from '../components/field-components/components/select-field/select-field.component';
import { ValidatorsFieldComponent } from '../components/field-components/components/validators-field/validators-field.component';
import { FieldPermissionFieldComponent } from '../components/field-components/components/field-permission-field/field-permission-field.component';
import { NgFieldStore, getAdditionalPaths } from '@skysmack/ng-redux';
import { LoadedPackage } from '@skysmack/ng-packages';
import { FieldProviders } from './field-providers';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NgFieldsConfig extends FieldsConfig<FieldSchemaViewModel, string> {
    public validation = new FieldsValidation();

    public formRules: FormRule[] = [
        new SetFieldKeyRule(['display'])
    ];

    constructor(
        public store: NgFieldStore,
        public fieldProviders: FieldProviders,
        public router: Router
    ) {
        super(fieldProviders);
    }

    /**
     * Gets the fields for the form used to create or edit a dynamic field.
     * @param availableFields Possible dynamic fields to create. Recieved from the backend.
     * @param field Optional field can be providedto set default values. Used to edit an existing field.
     */
    protected getEntityFields(loadedPackage: LoadedPackage, field?: LocalObject<FieldSchemaViewModel, string>): Field[] {
        const stateKey = loadedPackage._package.path + '-' + getAdditionalPaths(this.router, loadedPackage._package.path);

        const fields = [
            new Field({
                component: StringFieldComponent,
                value: field ? field.object.display : undefined,
                key: 'display',
                validators: [Validators.required],
                order: 1,
                showColumn: true
            }),

            new Field({
                component: StringFieldComponent,
                value: field ? field.object.key : undefined,
                key: 'key',
                validators: [Validators.required],
                order: 2,
                disabled: field ? true : false,
                showColumn: true
            }),

            new SelectField({
                component: SelectFieldComponent,
                value: field ? field.object.type : undefined,
                key: 'type',
                validators: [Validators.required],
                order: 3,
                optionsData$: this.store.getAvailableFields(stateKey),
                valueSelector: 'object.name',
                disabled: field ? true : false,
                showColumn: true
            }),

            new Field({
                component: ValidatorsFieldComponent,
                value: field ? field.object.validators : undefined,
                key: 'validators',
                order: 4,
            }),

            new Field({
                component: FieldPermissionFieldComponent,
                value: field ? field.object.writePermission : undefined,
                key: 'writePermission',
                order: 5,
            }),

            new Field({
                component: FieldPermissionFieldComponent,
                value: field ? field.object.readPermission : undefined,
                key: 'readPermission',
                order: 6,
            }),
        ];

        return fields;
    }
}
