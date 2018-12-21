import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule } from 'lib/portal-ui/forms/form-rule';
import { LocalObject } from '@skysmack/framework';
import { ProductType } from '@skysmack/packages-products';
import { Field } from 'lib/portal-ui/fields/field';
import { FieldTypes } from 'lib/portal-ui/fields/field-types';
import { ProductTypesValidation } from './ng-product-types-validation';
import { FieldsConfig } from 'lib/portal-ui/fields/fields-config';

export interface NgProductTypeFormDependencies {
    [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class NgProductTypesFieldsConfig extends FieldsConfig<ProductType, number, NgProductTypeFormDependencies> {
    public validation = new ProductTypesValidation();

    public formRules: FormRule[] = [];

    protected getEntityFields(entity?: LocalObject<ProductType, number>, dependencies?: NgProductTypeFormDependencies): Field[] {
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
