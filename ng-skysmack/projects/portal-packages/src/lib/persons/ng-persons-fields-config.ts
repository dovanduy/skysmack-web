import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule } from '@skysmack/ng-ui';
import { SetDisplayNameRule } from '@skysmack/ng-ui';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { Person } from '@skysmack/packages-persons';
import { Field } from '@skysmack/ng-ui';

import { FieldsConfig, StringFieldComponent, HiddenFieldComponent } from '@skysmack/portal-ui';
import { NgPersonsValidation, LoadedPackage } from '@skysmack/ng-packages';

@Injectable({ providedIn: 'root' })
export class NgPersonsFieldsConfig extends FieldsConfig<Person, number> {
    public validation = new NgPersonsValidation();


    public formRules: FormRule[] = [
        new SetDisplayNameRule(['firstName', 'lastName'])
    ];

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<Person, number>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.firstName : undefined,
                key: 'firstName',
                validators: [Validators.required],
                order: 1,
                showColumn: true
            }),

            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.lastName : undefined,
                key: 'lastName',
                validators: [Validators.required],
                order: 2,
                showColumn: true
            }),

            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.displayName : undefined,
                key: 'displayName',
                validators: [Validators.required],
                order: 3
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
