import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule } from '@skysmack/ng-ui';
import { LocalObject, LocalObjectStatus, PagedQuery } from '@skysmack/framework';
import { Product } from '@skysmack/packages-products';
import { Field } from '@skysmack/ng-ui';

import { SelectField } from '@skysmack/ng-ui';
import { StringFieldComponent, SelectFieldComponent, HiddenFieldComponent, DocumentFieldsConfig } from '@skysmack/portal-ui';
import { NgProductsValidation, NgProductTypesStore, NgProductTypesActions } from '@skysmack/ng-packages';
import { FieldProviders } from '@skysmack/portal-ui';
import { LoadedPackage, NgFieldStore } from '@skysmack/ng-redux';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NgProductsFieldsConfig extends DocumentFieldsConfig<Product, number> {
    public validation = new NgProductsValidation();

    public formRules: FormRule[] = [
    ];

    constructor(
        public productTypeStore: NgProductTypesStore,
        public fieldProviders: FieldProviders,
        public fieldStore: NgFieldStore,
        public productTypesActions: NgProductTypesActions,
        public router: Router
    ) {
        super(fieldProviders, fieldStore, router);
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
                displayKey: 'productType',
                displaySubKey: 'object.name',
                optionsData$: this.productTypeStore.get(loadedPackage._package.path),
                getDependencies: () => { this.productTypesActions.getPaged(loadedPackage._package.path, new PagedQuery()); },
                extraOptions: [{
                    value: null,
                    displayName: 'None'
                }],
                order: 1,
                showColumn: true
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
