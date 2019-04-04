import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { ProductsSalesPrice } from '@skysmack/packages-products-pricings';
import { FormRule, SelectField, Field } from '@skysmack/ng-ui';
import { Product } from '@skysmack/packages-products';
import { NgProductsSalesPriceValidation, LoadedPackage, NgProductsStore } from '@skysmack/ng-packages';
import { FieldsConfig, SelectFieldComponent, HiddenFieldComponent, DecimalFieldComponent } from '@skysmack/portal-ui';

@Injectable({ providedIn: 'root' })
export class NgProductsSalesPriceFieldsConfig extends FieldsConfig<ProductsSalesPrice, number> {
    public validation = new NgProductsSalesPriceValidation();

    public formRules: FormRule[] = [];

    constructor(
        public productsStore: NgProductsStore
    ) { super(); }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<ProductsSalesPrice, number>): Field[] {
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
                optionsData$: this.productsStore.get(loadedPackage._package.dependencies[0]),
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
