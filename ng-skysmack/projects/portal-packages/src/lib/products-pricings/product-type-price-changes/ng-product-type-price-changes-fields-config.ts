import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { ProductTypePriceChange, PriceChangeType, ProductTypeSalesPrice } from '@skysmack/packages-products-pricings';
import { FormRule, SelectField, Field } from '@skysmack/ng-ui';
import { NgProductTypePriceChangesValidation } from '@skysmack/ng-packages';
import { FieldsConfig, SelectFieldComponent, HiddenFieldComponent, DecimalFieldComponent, DateTimeFieldComponent } from '@skysmack/portal-ui';

export interface NgProductTypePriceChangesFormDependencies {
    availableProductTypeSalesPrices: LocalObject<ProductTypeSalesPrice, number>[];
}

@Injectable({ providedIn: 'root' })
export class NgProductTypePriceChangesFieldsConfig extends FieldsConfig<ProductTypePriceChange, number, NgProductTypePriceChangesFormDependencies> {
    public validation = new NgProductTypePriceChangesValidation();

    public formRules: FormRule[] = [];

    protected getEntityFields(entity?: LocalObject<ProductTypePriceChange, number>, dependencies?: NgProductTypePriceChangesFormDependencies): Field[] {
        const fields = [
            new SelectField({
                component: SelectFieldComponent,
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
                component: SelectFieldComponent,
                value: entity ? entity.object.recordId : undefined,
                key: 'recordId',
                validators: [Validators.required],
                optionsData: dependencies && dependencies.availableProductTypeSalesPrices,
                displayNameSelector: 'object.price',
                order: 2,
                showColumn: true
            }),
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.changeType : undefined,
                key: 'changeType',
                validators: [Validators.required],
                optionsData: PriceChangeType,
                optionsDataType: 'ts-enum',
                order: 3,
                showColumn: true
            }),
            new Field({
                component: DecimalFieldComponent,
                value: entity ? entity.object.change : undefined,
                key: 'change',
                validators: [Validators.required],
                order: 4,
                showColumn: true
            }),
            new Field({
                component: DateTimeFieldComponent,
                value: entity ? entity.object.validFrom : undefined,
                key: 'validFrom',
                validators: [Validators.required],
                order: 5,
                showColumn: true
            }),
            new Field({
                component: DateTimeFieldComponent,
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
                component: HiddenFieldComponent,
                value: entity ? entity.object.id : undefined,
                key: 'id',
                order: 0,
            }));
        }

        return fields;
    }
}
