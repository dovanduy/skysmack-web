import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { GroupReservation, GROUP_RESERVATIONS_AREA_KEY, GROUP_RESERVATIONS_ADDITIONAL_PATHS } from '@skysmack/packages-lodging-reservations';

import { NgFieldStore, LoadedPackage } from '@skysmack/ng-framework';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { DocumentFieldsConfig, StringFieldComponent, HiddenFieldComponent } from '@skysmack/portal-fields';
import { FieldProviders } from '@skysmack/ng-fields';
import { NgGroupReservationsValidation } from '@skysmack/ng-lodging-reservations';

@Injectable({ providedIn: 'root' })
export class NgGroupReservationsFieldsConfig extends DocumentFieldsConfig<GroupReservation, number> {
    public validation = new NgGroupReservationsValidation();
    public area = GROUP_RESERVATIONS_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders,
        public fieldsStore: NgFieldStore
    ) {
        super(fieldProviders, fieldsStore, GROUP_RESERVATIONS_ADDITIONAL_PATHS);
    }


    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<GroupReservation, number>): Field[] {
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
