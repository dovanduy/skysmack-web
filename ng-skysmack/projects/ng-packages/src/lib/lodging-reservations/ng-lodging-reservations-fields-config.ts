import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { LodgingReservation } from '@skysmack/packages-lodging-reservations';
import { NgLodgingReservationsValidation } from './ng-lodging-reservations-validation';
import { FormRule, FieldTypes, FieldsConfig, SelectField, Field, SelectFieldOption } from '@skysmack/ng-ui';
import { LodgingType, Lodging } from '@skysmack/packages-lodgings';

export interface NgLodgingReservationFormDependencies {
    availableLodgingTypes: LocalObject<LodgingType, number>[];
    availableLodgings: LocalObject<Lodging, number>[];
}

@Injectable({ providedIn: 'root' })
export class NgLodgingReservationsFieldsConfig extends FieldsConfig<LodgingReservation, number, NgLodgingReservationFormDependencies> {
    public validation = new NgLodgingReservationsValidation();

    public formRules: FormRule[] = [];

    protected getEntityFields(entity?: LocalObject<LodgingReservation, number>, dependencies?: NgLodgingReservationFormDependencies): Field[] {
        const fields = [
            new SelectField({
                fieldType: FieldTypes.SelectField,
                value: entity ? entity.object.lodgingTypeId : undefined,
                key: 'lodgingTypeId',
                validators: [Validators.required],
                optionsData: dependencies && dependencies.availableLodgingTypes,
                displayNameSelector: 'object.name',
                order: 1,
                showColumn: true
            } as SelectField),
            new SelectField({
                fieldType: FieldTypes.SelectField,
                value: entity ? entity.object.allocatedLodgingId : undefined,
                key: 'allocatedLodgingId',
                label: 'Allocated lodging',
                optionsData: dependencies && dependencies.availableLodgings,
                displayNameSelector: 'object.name',
                extraOptions: [{
                    value: null,
                    displayName: 'None'
                }] as SelectFieldOption[],
                order: 2,
                showColumn: true
            }),
            new Field({
                fieldType: FieldTypes.DateField,
                value: entity ? entity.object.checkIn : undefined,
                key: 'checkIn',
                validators: [Validators.required],
                order: 3,
                showColumn: true
            }),
            new Field({
                fieldType: FieldTypes.DateField,
                value: entity ? entity.object.checkOut : undefined,
                key: 'checkOut',
                validators: [Validators.required],
                order: 4,
                showColumn: true
            }),
            new Field({
                fieldType: FieldTypes.int,
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
                fieldType: FieldTypes.HiddenField,
                value: entity ? entity.object.id : undefined,
                key: 'id',
                order: 0,
            }));
        }

        return fields;
    }
}
