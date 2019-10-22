import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus, PagedQuery } from '@skysmack/framework';
import { AssignmentsSchedule, ASSIGNMENTS_SCHEDULES_AREA_KEY, ASSIGNMENTS_SCHEDULES_ADDITIONAL_PATHS } from '@skysmack/packages-maintenance';
import { NgAssignmentsSchedulesValidation, NgAssignmentTypesStore, NgAssignmentTypesActions } from '@skysmack/ng-maintenance';
import { FormRule, SelectField, Field } from '@skysmack/ng-dynamic-forms';
import { LoadedPackage } from '@skysmack/ng-framework';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { SelectFieldComponent, DateFieldComponent, HiddenFieldComponent, RecurringExpressionFieldComponent } from '@skysmack/portal-fields';

@Injectable({ providedIn: 'root' })
export class NgAssignmentsSchedulesFieldsConfig extends FieldsConfig<AssignmentsSchedule, number> {
    public validation = new NgAssignmentsSchedulesValidation();
    public area = ASSIGNMENTS_SCHEDULES_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public assignmentTypeStore: NgAssignmentTypesStore,
        public fieldProviders: FieldProviders,
        public assignmentTypesActions: NgAssignmentTypesActions
    ) {
        super(fieldProviders, ASSIGNMENTS_SCHEDULES_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<AssignmentsSchedule, number>): Field[] {
        const fields = [
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.assignmentTypeId : undefined,
                key: 'assignmentTypeId',
                label: 'Assignment Type',
                displayKey: 'assignmentType',
                displaySubKey: 'object.description',
                optionsData$: this.assignmentTypeStore.get(loadedPackage._package.path),
                getDependencies: () => { this.assignmentTypesActions.getPaged(loadedPackage._package.path, new PagedQuery()); },
                displayNameSelector: 'object.description',
                validators: [Validators.required],
                order: 1,
                showColumn: true
            }),

            new Field({
                component: DateFieldComponent,
                value: entity ? entity.object.start : undefined,
                key: 'start',
                label: 'Start',
                validators: [],
                order: 3,
                showColumn: true,
                sortable: true
            }),

            new Field({
                component: DateFieldComponent,
                value: entity ? entity.object.end : undefined,
                key: 'end',
                label: 'End',
                validators: [],
                order: 5,
                showColumn: true,
                sortable: true
            }),

            new Field({
                component: RecurringExpressionFieldComponent,
                value: entity ? entity.object.expression : undefined,
                key: 'expression',
                order: 4,
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
