import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus, PagedQuery } from '@skysmack/framework';
import { Product, PRODUCTS_AREA_KEY } from '@skysmack/packages-products';
import { NgProductsValidation, NgProductTypesStore, NgProductTypesActions } from '@skysmack/ng-products';
import { LoadedPackage, NgFieldStore } from '@skysmack/ng-framework';
import { Router } from '@angular/router';
import { FormRule, Field, SelectField } from '@skysmack/ng-dynamic-forms';
import { DocumentFieldsConfig, StringFieldComponent, SelectFieldComponent, HiddenFieldComponent } from '@skysmack/portal-fields';
import { FieldProviders } from '@skysmack/ng-fields';

@Injectable({ providedIn: 'root' })
export class NgProductsFieldsConfig extends DocumentFieldsConfig<Product, number> {
    public area = PRODUCTS_AREA_KEY;
    public validation = new NgProductsValidation();
    public formRules: FormRule[] = [
    ];

    constructor(
        public fieldProviders: FieldProviders,
        public fieldStore: NgFieldStore,
        public productTypeStore: NgProductTypesStore,
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
                showColumn: true,
                sortable: true
            }),

            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.productTypeId : undefined,
                key: 'productTypeId',
                displayKey: 'productType',
                displaySubKey: 'object.name',
                optionsData$: this.productTypeStore.get(loadedPackage._package.path),
                getDependencies: () => { this.productTypesActions.getPaged(loadedPackage._package.path, new PagedQuery()); },
                extraOptions: [{
                    value: null,
                    displayName: 'None'
                }],
                order: 1,
                showColumn: true,
                sortable: true
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
