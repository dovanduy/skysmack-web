import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { ProductTypeSalesPrice } from '@skysmack/packages-products-pricings';
import { FormRule, FieldTypes, FieldsConfig, SelectField, Field } from '@skysmack/ng-ui';
import { NgProductTypeSalesPriceValidation } from './ng-product-type-sales-price-validation';
import { ProductType } from '@skysmack/packages-products';


export interface NgProductTypeSalesPriceFormDependencies {
    availableProductTypes: LocalObject<ProductType, number>[];
}

@Injectable({ providedIn: 'root' })
export class NgProductTypeSalesPriceFieldsConfig extends FieldsConfig<ProductTypeSalesPrice, number, NgProductTypeSalesPriceFormDependencies> {
    public validation = new NgProductTypeSalesPriceValidation();

    public formRules: FormRule[] = [];

    protected getEntityFields(entity?: LocalObject<ProductTypeSalesPrice, number>, dependencies?: NgProductTypeSalesPriceFormDependencies): Field[] {
        const fields = [
            new SelectField({
                fieldType: FieldTypes.SelectField,
                value: entity ? entity.object.currencyCode : undefined,
                key: 'currencyCode',
                validators: [Validators.required],
                extraOptions: [
                    {
                        value: 'SEK',
                        displayName: 'SEK'
                    },
                    {
                        value: 'DKK',
                        displayName: 'DKK'
                    }
                ],
                order: 1,
                showColumn: true
            } as SelectField),
            new SelectField({
                fieldType: FieldTypes.SelectField,
                value: entity ? entity.object.recordId : undefined,
                key: 'recordId',
                validators: [Validators.required],
                optionsData: dependencies && dependencies.availableProductTypes,
                displayNameSelector: 'object.name',
                order: 2,
                showColumn: true
            }),
            new Field({
                fieldType: FieldTypes.decimal,
                value: entity ? entity.object.price : undefined,
                key: 'price',
                validators: [Validators.required],
                order: 3,
                showColumn: true
            })
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
