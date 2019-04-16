import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule } from '@skysmack/ng-ui';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { Product } from '@skysmack/packages-products';
import { Field } from '@skysmack/ng-ui';

import { SelectField } from '@skysmack/ng-ui';
import { FieldsConfig, StringFieldComponent, SelectFieldComponent, HiddenFieldComponent } from '@skysmack/portal-ui';
import { NgProductsValidation, NgProductTypesStore } from '@skysmack/ng-packages';
import { FieldProviders } from '@skysmack/portal-ui';
import { LoadedPackage } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgProductsFieldsConfig extends FieldsConfig<Product, number> {
    public validation = new NgProductsValidation();

    public formRules: FormRule[] = [
    ];

    constructor(
        public productTypeStore: NgProductTypesStore,
        public fieldProviders: FieldProviders
    ) {
        super(fieldProviders);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<Product, number>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.name : undefined,
                key: 'name',
                validators: [Validators.required],
                order: 1,
                showColumn: true
            }),

            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.productTypeId : undefined,
                key: 'productTypeId',
                label: 'Product type',
                optionsData$: this.productTypeStore.get(loadedPackage._package.path),
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
                component: HiddenFieldComponent,
                value: entity ? entity.object.id : undefined,
                key: 'id',
                order: 0,
            }));
        }

        return fields;
    }
}
