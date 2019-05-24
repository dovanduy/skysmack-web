import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { MaintenanceState, MaintenanceEntityStatus, MAINTENANCE_STATES_AREA_KEY } from '@skysmack/packages-maintenance';
import { NgMaintenanceStatesValidation } from '@skysmack/ng-packages';
import { FormRule, Field, SelectField } from '@skysmack/ng-ui';
import { FieldsConfig, StringFieldComponent, SelectFieldComponent, HiddenFieldComponent } from '@skysmack/portal-ui';
import { of } from 'rxjs';
import { FieldProviders } from '@skysmack/portal-ui';
import { LoadedPackage } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgMaintenanceStatesFieldsConfig extends FieldsConfig<MaintenanceState, number> {
    public validation = new NgMaintenanceStatesValidation();
    public area = MAINTENANCE_STATES_AREA_KEY;
    public formRules: FormRule[] = [
    ];

    constructor(public fieldProviders: FieldProviders) {
        super(fieldProviders);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<MaintenanceState, number>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.description : undefined,
                key: 'description',
                label: 'Description',
                validators: [Validators.required],
                order: 1,
                showColumn: true
            }),

            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.status : undefined,
                key: 'status',
                label: 'Status',
                validators: [Validators.required],
                optionsData$: of(MaintenanceEntityStatus),
                optionsDataType: 'ts-enum',
                order: 2,
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
