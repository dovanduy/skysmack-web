import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { ProductPriceChange, ProductsSalesPrice, PriceChangeType } from '@skysmack/packages-products-pricings';
import { FormRule, FieldTypes, SelectField, Field } from '@skysmack/ng-ui';
import { NgProductPriceChangesValidation } from '@skysmack/ng-packages';
import { FieldsConfig } from '@skysmack/portal-ui';


export interface NgProductPriceChangesFormDependencies {
    availableProductsSalesPrices: LocalObject<ProductsSalesPrice, number>[];
}

@Injectable({ providedIn: 'root' })
export class NgProductPriceChangesFieldsConfig extends FieldsConfig<ProductPriceChange, number, NgProductPriceChangesFormDependencies> {
    public validation = new NgProductPriceChangesValidation();

    public formRules: FormRule[] = [];

    protected getEntityFields(entity?: LocalObject<ProductPriceChange, number>, dependencies?: NgProductPriceChangesFormDependencies): Field[] {
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
                    },
                ],
                order: 1,
                showColumn: true
            } as SelectField),
            new SelectField({
                fieldType: FieldTypes.SelectField,
                value: entity ? entity.object.recordId : undefined,
                key: 'recordId',
                validators: [Validators.required],
                optionsData: dependencies && dependencies.availableProductsSalesPrices,
                displayNameSelector: 'object.price',
                order: 2,
                showColumn: true
            }),
            new SelectField({
                fieldType: FieldTypes.SelectField,
                value: entity ? entity.object.changeType : undefined,
                key: 'changeType',
                validators: [Validators.required],
                optionsData: PriceChangeType,
                optionsDataType: 'ts-enum',
                order: 3,
                showColumn: true
            }),
            new Field({
                fieldType: FieldTypes.decimal,
                value: entity ? entity.object.change : undefined,
                key: 'change',
                validators: [Validators.required],
                order: 4,
                showColumn: true
            }),
            new Field({
                fieldType: FieldTypes.dateTime,
                value: entity ? entity.object.validFrom : undefined,
                key: 'validFrom',
                validators: [Validators.required],
                order: 5,
                showColumn: true
            }),
            new Field({
                fieldType: FieldTypes.dateTime,
                value: entity ? entity.object.validTo : undefined,
                key: 'validTo',
                validators: [Validators.required],
                order: 6,
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
