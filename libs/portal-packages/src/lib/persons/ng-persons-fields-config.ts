import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { Person, PERSONS_AREA_KEY, PERSONS_ADDITIONAL_PATHS } from '@skysmack/packages-persons';

import { NgPersonsValidation } from '@skysmack/ng-persons';
import { NgFieldStore, LoadedPackage } from '@skysmack/ng-framework';
import { FormRule, SetDisplayNameRule, Field } from '@skysmack/ng-dynamic-forms';
import { DocumentFieldsConfig, StringFieldComponent, HiddenFieldComponent, DateFieldComponent } from '@skysmack/portal-fields';
import { FieldProviders } from '@skysmack/ng-fields';

@Injectable({ providedIn: 'root' })
export class NgPersonsFieldsConfig extends DocumentFieldsConfig<Person, number> {
    public validation = new NgPersonsValidation();
    public area = PERSONS_AREA_KEY;
    public formRules: FormRule[] = [
        new SetDisplayNameRule(['firstName', 'lastName'])
    ];

    constructor(
        public fieldProviders: FieldProviders,
        public fieldsStore: NgFieldStore,
    ) {
        super(fieldProviders, fieldsStore, PERSONS_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<Person, number>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.firstName : undefined,
                key: 'firstName',
                validators: [Validators.required],
                order: 1,
                showColumn: false,
                sortable: true
            }),

            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.lastName : undefined,
                key: 'lastName',
                validators: [Validators.required],
                order: 2,
                showColumn: false,
                sortable: true
            }),

            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.displayName : undefined,
                key: 'displayName',
                validators: [Validators.required],
                order: 3,
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
