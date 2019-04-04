import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, SetFieldKeyRule } from '@skysmack/ng-ui';
import { LocalObject, FieldValueProviderViewModel, FieldSchemaViewModel } from '@skysmack/framework';
import { Field } from '@skysmack/ng-ui';

import { FieldsValidation } from './ng-fields-validation';
import { SelectField } from '@skysmack/ng-ui';
import { FieldsConfig } from './fields-config';
import { StringFieldComponent } from '../components/field-components/components/string-field/string-field.component';
import { SelectFieldComponent } from '../components/field-components/components/select-field/select-field.component';
import { ValidatorsFieldComponent } from '../components/field-components/components/validators-field/validators-field.component';
import { FieldPermissionFieldComponent } from '../components/field-components/components/field-permission-field/field-permission-field.component';
import { NgFieldStore } from '@skysmack/ng-redux';
import { LoadedPackage } from '@skysmack/ng-packages';

export interface NgFieldFormDependencies {
    availableFields: LocalObject<FieldValueProviderViewModel, string>[];
}

@Injectable({ providedIn: 'root' })
export class NgFieldsConfig extends FieldsConfig<FieldSchemaViewModel, string, NgFieldFormDependencies> {
    public validation = new FieldsValidation();

    public formRules: FormRule[] = [
        new SetFieldKeyRule(['display'])
    ];

    constructor(public store: NgFieldStore) {
        super();
    }

    /**
     * Gets the fields for the form used to create or edit a dynamic field.
     * @param availableFields Possible dynamic fields to create. Recieved from the backend.
     * @param field Optional field can be providedto set default values. Used to edit an existing field.
     */
    protected getEntityFields(field?: LocalObject<FieldSchemaViewModel, string>, dependencies?: NgFieldFormDependencies, loadedPackage?: LoadedPackage): Field[] {
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
                optionsData$: this.store.get(loadedPackage._package.path),
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
