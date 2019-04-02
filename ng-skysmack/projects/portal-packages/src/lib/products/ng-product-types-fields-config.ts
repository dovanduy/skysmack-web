import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule } from '@skysmack/ng-ui';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { ProductType } from '@skysmack/packages-products';
import { Field } from '@skysmack/ng-ui';

import { FieldsConfig, StringFieldComponent, HiddenFieldComponent } from '@skysmack/portal-ui';
import { NgProductTypesValidation } from '@skysmack/ng-packages';

export interface NgProductTypeFormDependencies {
    [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class NgProductTypesFieldsConfig extends FieldsConfig<ProductType, number, NgProductTypeFormDependencies> {
    public validation = new NgProductTypesValidation();

    public formRules: FormRule[] = [];

    protected getEntityFields(entity?: LocalObject<ProductType, number>, dependencies?: NgProductTypeFormDependencies): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.name : undefined,
                key: 'name',
                validators: [Validators.required],
                order: 1,
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
