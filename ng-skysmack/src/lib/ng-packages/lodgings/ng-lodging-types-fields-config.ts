import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { DocumentFieldsConfig } from 'lib/portal-ui/fields/document-fields-config';
import { FormRule } from 'lib/portal-ui/forms/form-rule';
import { SetDisplayNameRule } from 'lib/portal-ui/forms/rules/set-display-name-rule';
import { LocalObject } from '@skysmack/framework';
import { LodgingType } from '@skysmack/packages-lodgings';
import { Field } from 'lib/portal-ui/fields/field';
import { FieldTypes } from 'lib/portal-ui/fields/field-types';
import { LodgingTypesValidation } from './ng-lodging-types-validation';

export interface NgLodgingTypeFormDependencies {
    [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class NgLodgingTypesFieldsConfig extends DocumentFieldsConfig<LodgingType, NgLodgingTypeFormDependencies> {
    public validation = new LodgingTypesValidation();

    public formRules: FormRule[] = [
        new SetDisplayNameRule(['name'])
    ];

    protected getEntityFields(entity?: LocalObject<LodgingType>, dependencies?: NgLodgingTypeFormDependencies): Field[] {
        const fields = [
            new Field({
                fieldType: FieldTypes.string,
                value: entity ? entity.object.name : undefined,
                key: 'name',
                validators: [Validators.required],
                order: 1,
                showColumn: true
            } as Field)

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
