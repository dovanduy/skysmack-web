import { AssignmentType, ASSIGNMENT_TYPES_AREA_KEY } from '@skysmack/packages-maintenance';
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { NgAssignmentTypesValidation, NgMaintenanceStatesStore } from '@skysmack/ng-packages';
import { FieldsConfig, StringFieldComponent, SelectFieldComponent, HiddenFieldComponent, RecurringExpressionFieldComponent } from '@skysmack/portal-ui';
import { FieldProviders } from '@skysmack/portal-ui';
import { LoadedPackage } from '@skysmack/ng-framework';
import { FormRule, Field, SelectField } from '@skysmack/ng-dynamic-forms';

@Injectable({ providedIn: 'root' })
export class NgAssignmentTypesFieldsConfig extends FieldsConfig<AssignmentType, number> {
    public validation = new NgAssignmentTypesValidation();
    public area = ASSIGNMENT_TYPES_AREA_KEY;
    public formRules: FormRule[] = [
    ];

    constructor(
        public maintenanceStateStore: NgMaintenanceStatesStore,
        public fieldProviders: FieldProviders
    ) {
        super(fieldProviders);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<AssignmentType, number>): Field[] {
        const fields = [
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.stateId : undefined,
                key: 'stateId',
                displayKey: 'state',
                displaySubKey: 'object.description',
                optionsData$: this.maintenanceStateStore.get(loadedPackage._package.path),
                displayNameSelector: 'object.description',
                validators: [Validators.required],
                order: 1,
                showColumn: true
            }),

            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.description : undefined,
                key: 'description',
                validators: [Validators.required],
                order: 2,
                showColumn: true
            }),

            new Field({
                component: StringFieldComponent,
                value: 'P1DT1H1M1S1s', // entity ? entity.object.duePeriod : undefined,
                key: 'duePeriod',
                validators: [Validators.required],
                order: 3
            }),

            new Field({
                component: RecurringExpressionFieldComponent,
                value: entity ? entity.object.expression : undefined,
                key: 'expression',
                order: 4
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
