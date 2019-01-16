import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule } from '@skysmack/ng-ui';
import { LocalObject } from '@skysmack/framework';
import { LodgingReservation } from '@skysmack/packages-lodging-reservations-feature';
import { Field } from '@skysmack/ng-ui';
import { FieldTypes } from '@skysmack/ng-ui';
import { LodgingReservationsValidation } from './ng-lodging-reservations-validation';
import { FieldsConfig } from '@skysmack/ng-ui';
import { SelectField } from 'ng-ui/src/lib';
import { LodgingType, Lodging } from '@skysmack/packages-lodgings';

export interface NgLodgingReservationFormDependencies {
    availableLodgingTypes: LocalObject<LodgingType, number>[];
    availableLodgings: LocalObject<Lodging, number>[];
}

@Injectable({ providedIn: 'root' })
export class NgLodgingReservationsFieldsConfig extends FieldsConfig<LodgingReservation, NgLodgingReservationFormDependencies> {
    public validation = new LodgingReservationsValidation();

    public formRules: FormRule[] = [];

    protected getEntityFields(entity?: LocalObject<LodgingReservation, number>, dependencies?: NgLodgingReservationFormDependencies): Field[] {
        const fields = [
            new SelectField({
                fieldType: FieldTypes.int,
                value: entity ? entity.object.lodgingTypeId : undefined,
                key: 'lodgingTypeId',
                validators: [Validators.required],
                optionsData: dependencies.availableLodgingTypes,
                displayNameSelector: 'object.name',
                order: 1,
                showColumn: true
            } as SelectField),
            new SelectField({
                fieldType: FieldTypes.int,
                value: entity ? entity.object.allocatedLodgingId : undefined,
                optionsData: dependencies.availableLodgings,
                displayNameSelector: 'object.name',
                key: 'allocatedLodgingId',
                order: 2,
                showColumn: true
            } as SelectField),
            new Field({
                fieldType: FieldTypes.dateTime,
                value: entity ? entity.object.checkIn : undefined,
                key: 'checkIn',
                validators: [Validators.required],
                order: 3,
                showColumn: true
            } as Field),
            new Field({
                fieldType: FieldTypes.dateTime,
                value: entity ? entity.object.checkOut : undefined,
                key: 'checkOut',
                validators: [Validators.required],
                order: 4,
                showColumn: true
            } as Field),
            new SelectField({
                fieldType: FieldTypes.SelectField,
                value: entity ? entity.object.checkOut : undefined,
                key: 'checkOut',
                validators: [Validators.required],
                optionsData: LodgingReservation.ReservationStatusEnum,
                optionsDataType: 'enum',
                order: 5,
                showColumn: true
            } as SelectField),
        ];

        // Id field must only be added for edit forms.
        // If added to a create form, it won't be able to bind in the backend.
        if (entity && entity.object.id) {
            fields.push(new Field({
                fieldType: FieldTypes.HiddenField,
                value: entity ? entity.object.id : undefined,
                key: 'id',
                order: 0,
            } as Field));
        }

        return fields;
    }
}
