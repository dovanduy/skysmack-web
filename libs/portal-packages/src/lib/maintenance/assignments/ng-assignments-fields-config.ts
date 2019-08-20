import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus, EnumHelpers, DisplayColumn, PagedQuery } from '@skysmack/framework';
import { Assignment, ASSIGNMENTS_AREA_KEY } from '@skysmack/packages-maintenance';
import { NgAssignmentsValidation, NgAssignmentTypesStore, NgAssignmentTypesActions } from '@skysmack/ng-maintenance';
import { FormRule, Field, SelectField } from '@skysmack/ng-dynamic-forms';
import { of } from 'rxjs';
import { LoadedPackage } from '@skysmack/ng-framework';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { SelectFieldComponent, StringFieldComponent, DateTimeFieldComponent, HiddenFieldComponent } from '@skysmack/portal-fields';

@Injectable({ providedIn: 'root' })
export class NgAssignmentsFieldsConfig extends FieldsConfig<Assignment, number> {
    public validation = new NgAssignmentsValidation();
    public area = ASSIGNMENTS_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public assignmentTypesStore: NgAssignmentTypesStore,
        public assignmentTypesActions: NgAssignmentTypesActions,
        public fieldProviders: FieldProviders
    ) { super(fieldProviders); }

    protected getEntityFields(loadedPackage: LoadedPackage, additionalPaths: string[], entity?: LocalObject<Assignment, number>): Field[] {
        const fields = [
            new SelectField({
                component: SelectFieldComponent,
                value: entity && entity.object ? entity.object.assignmentTypeId : undefined,
                key: 'assignmentTypeId',
                displayKey: 'assignmentType',
                displaySubKey: 'object.description',
                validators: [Validators.required],
                optionsData$: this.assignmentTypesStore.get(loadedPackage._package.path),
                displayNameSelector: 'object.description',
                getDependencies: () => { this.assignmentTypesActions.getPaged(loadedPackage._package.path, new PagedQuery()); },
                order: 3,
                showColumn: true
            }),

            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.description : undefined,
                key: 'description',
                label: 'Description',
                order: 2,
                showColumn: true,
                sortable: true
            }),

            new SelectField({
                component: SelectFieldComponent,
                value: entity && entity.object ? entity.object.status : undefined,
                label: 'Occupation state',
                key: 'status',
                displayModifier: (column: DisplayColumn, providedEntity: LocalObject<Assignment, number>) => {
                    const lowercaseStatus = EnumHelpers.toIndexEnum(Assignment.StatusEnum)[providedEntity.object.status];
                    return lowercaseStatus ? lowercaseStatus.charAt(0).toUpperCase() + lowercaseStatus.slice(1) : lowercaseStatus;
                },
                validators: [Validators.required],
                optionsData$: of(Assignment.StatusEnum),
                optionsDataType: 'enum',
                order: 3,
                showColumn: true,
                sortable: true
            }),

            new Field({
                component: DateTimeFieldComponent,
                value: entity ? entity.object.from : undefined,
                key: 'from',
                label: 'From',
                validators: [Validators.required],
                order: 4,
                showColumn: true,
                sortable: true
            }),

            new Field({
                component: DateTimeFieldComponent,
                value: entity ? entity.object.due : undefined,
                key: 'due',
                label: 'Due',
                validators: [Validators.required],
                order: 5,
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
