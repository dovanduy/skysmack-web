import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { ProductType, PRODUCT_TYPES_AREA_KEY, PRODUCT_TYPES_ADDITIONAL_PATHS } from '@skysmack/packages-products';

import { NgProductTypesValidation } from '@skysmack/ng-products';
import { NgFieldStore, LoadedPackage } from '@skysmack/ng-framework';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { DocumentFieldsConfig, StringFieldComponent, HiddenFieldComponent } from '@skysmack/portal-fields';
import { FieldProviders } from '@skysmack/ng-fields';

@Injectable({ providedIn: 'root' })
export class NgProductTypesFieldsConfig extends DocumentFieldsConfig<ProductType, number> {
    public validation = new NgProductTypesValidation();
    public area = PRODUCT_TYPES_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders,
        public fieldsStore: NgFieldStore
    ) {
        super(fieldProviders, fieldsStore, PRODUCT_TYPES_ADDITIONAL_PATHS);
    }


    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<ProductType, number>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.name : undefined,
                key: 'name',
                validators: [Validators.required],
                order: 1,
                showColumn: true,
                sortable: true
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
