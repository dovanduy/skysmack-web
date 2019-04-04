import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule } from '@skysmack/ng-ui';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { Receipt } from '@skysmack/packages-terminal-payments';
import { Field } from '@skysmack/ng-ui';

import { FieldsConfig, StringFieldComponent, HiddenFieldComponent } from '@skysmack/portal-ui';
import { NgReceiptsValidation, LoadedPackage } from '@skysmack/ng-packages';

@Injectable({ providedIn: 'root' })
export class NgReceiptsFieldsConfig extends FieldsConfig<Receipt, number> {
    public validation = new NgReceiptsValidation();

    public formRules: FormRule[] = [];

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<Receipt, number>): Field[] {
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
