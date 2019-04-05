import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { LodgingReservation } from '@skysmack/packages-lodging-reservations';
import { FormRule, SelectField, Field, SelectFieldOption } from '@skysmack/ng-ui';
import { NgLodgingReservationsValidation, NgLodgingTypesStore, NgLodgingsStore, LoadedPackage } from '@skysmack/ng-packages';
import { FieldsConfig, SelectFieldComponent, HiddenFieldComponent, IntFieldComponent, DateFieldComponent } from '@skysmack/portal-ui';
import { FieldProviders } from '@skysmack/portal-ui';

@Injectable({ providedIn: 'root' })
export class NgLodgingReservationsFieldsConfig extends FieldsConfig<LodgingReservation, number> {
    public validation = new NgLodgingReservationsValidation();

    public formRules: FormRule[] = [];

    constructor(
        public lodgingsStore: NgLodgingsStore,
        public lodgingTypeStore: NgLodgingTypesStore,
        public fieldProviders: FieldProviders
    ) {
        super(fieldProviders);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<LodgingReservation, number>): Field[] {
        const fields = [
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.lodgingTypeId : undefined,
                key: 'lodgingTypeId',
                validators: [Validators.required],
                optionsData$: this.lodgingTypeStore.get(loadedPackage._package.dependencies[0]),
                order: 1,
                showColumn: true
            } as SelectField),
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.allocatedLodgingId : undefined,
                key: 'allocatedLodgingId',
                label: 'Allocated lodging',
                optionsData$: this.lodgingsStore.get(loadedPackage._package.dependencies[0]),
                extraOptions: [{
                    value: null,
                    displayName: 'None'
                }] as SelectFieldOption[],
                order: 2,
                showColumn: true
            }),
            new Field({
                component: DateFieldComponent,
                value: entity ? entity.object.checkIn : undefined,
                key: 'checkIn',
                validators: [Validators.required],
                order: 3,
                showColumn: true
            }),
            new Field({
                component: DateFieldComponent,
                value: entity ? entity.object.checkOut : undefined,
                key: 'checkOut',
                validators: [Validators.required],
                order: 4,
                showColumn: true
            }),
            new Field({
                component: IntFieldComponent,
                value: entity ? entity.object.persons : undefined,
                key: 'persons',
                label: 'Persons',
                validators: [Validators.required],
                order: 5,
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
