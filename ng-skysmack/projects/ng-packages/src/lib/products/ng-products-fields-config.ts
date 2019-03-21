import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule } from '@skysmack/ng-ui';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { Product, ProductType } from '@skysmack/packages-products';
import { Field } from '@skysmack/ng-ui';
import { FieldTypes } from '@skysmack/ng-ui';
import { SelectField } from '@skysmack/ng-ui';
import { NgProductsValidation } from './ng-products-validation';
import { FieldsConfig } from '@skysmack/ng-ui';

export interface NgProductFormDependencies {
    availableProductTypes: LocalObject<ProductType, number>[];
}

@Injectable({ providedIn: 'root' })
export class NgProductsFieldsConfig extends FieldsConfig<Product, number, NgProductFormDependencies> {
    public validation = new NgProductsValidation();

    public formRules: FormRule[] = [
    ];

    protected getEntityFields(entity?: LocalObject<Product, number>, dependencies?: NgProductFormDependencies): Field[] {
        const fields = [
            new Field({
                fieldType: FieldTypes.string,
                value: entity ? entity.object.name : undefined,
                key: 'name',
                validators: [Validators.required],
                order: 1,
                showColumn: true
            }),

            new SelectField({
                fieldType: FieldTypes.SelectField,
                value: entity ? entity.object.productTypeId : undefined,
                key: 'productTypeId',
                label: 'Product type',
                optionsData: dependencies && dependencies.availableProductTypes,
                extraOptions: [{
                    value: null,
                    displayName: 'None'
                }],
                order: 1,
            }),

        ];

        // Id field must only be added for edit forms.
        // If added to a create form, it won't be able to bind in the backend.
        if (entity && entity.object.id && entity.status !== LocalObjectStatus.CREATING) {
            fields.push(new Field({
                fieldType: FieldTypes.HiddenField,
                value: entity ? entity.object.id : undefined,
                key: 'id',
                order: 0,
            }));
        }

        return fields;
    }
}
