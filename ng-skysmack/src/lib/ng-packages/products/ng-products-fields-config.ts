import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { DocumentFieldsConfig } from 'lib/portal-ui/fields/document-fields-config';
import { FormRule } from 'lib/portal-ui/forms/form-rule';
import { SetDisplayNameRule } from 'lib/portal-ui/forms/rules/set-display-name-rule';
import { LocalObject } from '@skysmack/framework';
import { Product } from '@skysmack/packages-products';
import { Field } from 'lib/portal-ui/fields/field';
import { FieldTypes } from 'lib/portal-ui/fields/field-types';
import { ProductsValidation } from './ng-products-validation';
import { ProductTypesValidation } from './ng-product-types-validation';

@Injectable({ providedIn: 'root' })
export class NgProductsFieldsConfig extends DocumentFieldsConfig<Product> {
    public validation = new ProductTypesValidation();

    public formRules: FormRule[] = [
        new SetDisplayNameRule(['name'])
    ];

    protected getEntityFields(entity?: LocalObject<Product>, dependencies?: any): Field[] {
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
