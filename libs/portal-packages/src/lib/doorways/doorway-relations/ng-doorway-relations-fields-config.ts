import { Injectable } from '@angular/core';
import { LocalObject, LocalObjectStatus, PagedQuery } from '@skysmack/framework';
import { DoorwayRelation, DOORWAY_RELATIONS_AREA_KEY, DOORWAY_RELATIONS_ADDITIONAL_PATHS, NgDoorwayRelationsValidation, NgDoorwaysStore, NgDoorwaysActions } from '@skysmack/ng-doorways';
import { LoadedPackage } from '@skysmack/ng-framework';
import { FormRule, Field, SelectField } from '@skysmack/ng-dynamic-forms';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { HiddenFieldComponent, SelectFieldComponent } from '@skysmack/portal-fields';
import { DoorwayRelationKey } from '@skysmack/ng-doorways';
import { Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class NgDoorwayRelationsFieldsConfig extends FieldsConfig<DoorwayRelation, DoorwayRelationKey> {
    public validation = new NgDoorwayRelationsValidation();
    public area = DOORWAY_RELATIONS_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders,
        private doorwaysStore: NgDoorwaysStore,
        private doorwaysActions: NgDoorwaysActions
    ) {
        super(fieldProviders, DOORWAY_RELATIONS_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<DoorwayRelation, DoorwayRelationKey>): Field[] {

        const fields: Field[] = [
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.innerDoorwayId : undefined,
                key: 'innerDoorwayId',
                displayKey: 'innerDoorway',
                displaySubKey: 'object.name',
                optionsData$: this.doorwaysStore.get(loadedPackage._package.path),
                getDependencies: () => { this.doorwaysActions.getPaged(loadedPackage._package.path, new PagedQuery()); },
                validators: [Validators.required],
                order: 1,
                showColumn: true
            }),
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.outerDoorwayId : undefined,
                key: 'outerDoorwayId',
                displayKey: 'outerDoorway',
                displaySubKey: 'object.name',
                optionsData$: this.doorwaysStore.get(loadedPackage._package.path),
                getDependencies: () => { this.doorwaysActions.getPaged(loadedPackage._package.path, new PagedQuery()); },
                validators: [Validators.required],
                order: 1,
                showColumn: true
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
