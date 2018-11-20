import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { DocumentFieldsConfig } from 'lib/portal-ui/fields/document-fields-config';
import { FormRule } from 'lib/portal-ui/forms/form-rule';
import { SetDisplayNameRule } from 'lib/portal-ui/forms/rules/set-display-name-rule';
import { LocalObject } from '@skysmack/framework';
import { Person } from '@skysmack/packages-persons';
import { Field } from 'lib/portal-ui/fields/field';
import { FieldTypes } from 'lib/portal-ui/fields/field-types';
import { PersonsValidation } from './ng-persons-validation';

@Injectable({ providedIn: 'root' })
export class NgPersonsFieldsConfig extends DocumentFieldsConfig<Person> {
    public validation = new PersonsValidation();

    public formRules: FormRule[] = [
        new SetDisplayNameRule(['firstName', 'lastName'])
    ];

    protected getEntityFields(entity?: LocalObject<Person>, dependencies?: any): Field[] {
        const fields = [
            new Field({
                fieldType: FieldTypes.StringField,
                value: entity ? entity.object.firstName : undefined,
                key: 'firstName',
                validators: [Validators.required],
                order: 1,
                showColumn: true
            } as Field),

            new Field({
                fieldType: FieldTypes.StringField,
                value: entity ? entity.object.lastName : undefined,
                key: 'lastName',
                validators: [Validators.required],
                order: 2,
                showColumn: true
            } as Field),

            new Field({
                fieldType: FieldTypes.StringField,
                value: entity ? entity.object.displayName : undefined,
                key: 'displayName',
                validators: [Validators.required],
                order: 3,
            } as Field),
        ];

        // Id field must only be added for edit forms.
        // If added to a create form, it won't be able to bind in the backend.
        if (entity && entity.object.id) {
            fields.push(new Field({
                fieldType: FieldTypes.HiddenField,
                value: entity ? entity.object.id : undefined,
                key: 'id',
                order: 0,
            } as Field));
        }

        return fields;
    }
}
