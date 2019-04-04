import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { ProductTypeSalesPrice } from '@skysmack/packages-products-pricings';
import { FormRule, SelectField, Field } from '@skysmack/ng-ui';
import { ProductType } from '@skysmack/packages-products';
import { NgProductTypeSalesPriceValidation, LoadedPackage, NgProductTypesStore } from '@skysmack/ng-packages';
import { FieldsConfig, SelectFieldComponent, HiddenFieldComponent, DecimalFieldComponent } from '@skysmack/portal-ui';

export interface NgProductTypeSalesPriceFormDependencies {
    availableProductTypes: LocalObject<ProductType, number>[];
}

@Injectable({ providedIn: 'root' })
export class NgProductTypeSalesPriceFieldsConfig extends FieldsConfig<ProductTypeSalesPrice, number> {
    public validation = new NgProductTypeSalesPriceValidation();

    public formRules: FormRule[] = [];

    constructor(
        public productTypesStore: NgProductTypesStore
    ) {
        super();
    }


    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<ProductTypeSalesPrice, number>): Field[] {
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
                    }
                ],
                order: 1,
                showColumn: true
            } as SelectField),
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.recordId : undefined,
                key: 'recordId',
                validators: [Validators.required],
                optionsData$: this.productTypesStore.get(loadedPackage._package.dependencies[0]),
                displayNameSelector: 'object.name',
                order: 2,
                showColumn: true
            }),
            new Field({
                component: DecimalFieldComponent,
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
                component: HiddenFieldComponent,
                value: entity ? entity.object.id : undefined,
                key: 'id',
                order: 0,
            }));
        }

        return fields;
    }
}
