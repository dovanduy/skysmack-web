import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus, DisplayColumn, EnumHelpers } from '@skysmack/framework';
import { LodgingReservation, LODGING_RESERVATIONS_AREA_KEY, LODGING_RESERVATIONS_ADDITIONAL_PATHS } from '@skysmack/packages-lodging-reservations';
import { NgLodgingTypesStore, NgLodgingsStore, NgLodgingsActions, NgLodgingTypesActions } from '@skysmack/ng-lodgings';
import { LoadedPackage, NgFieldStore } from '@skysmack/ng-framework';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormRule, Field, SelectField, AddDaysRule } from '@skysmack/ng-dynamic-forms';
import { FieldProviders } from '@skysmack/ng-fields';
import { SelectFieldComponent, DateFieldComponent, IntFieldComponent, HiddenFieldComponent, DocumentFieldsConfig, DateTimeFieldComponent, StringFieldComponent, CheckboxFieldComponent } from '@skysmack/portal-fields';
import { NgLodgingReservationsValidation } from '@skysmack/ng-lodging-reservations';
import { LodgingTypeSelectFieldComponent } from './lodging-reservations/lodging-type-select-field/lodging-type-select-field.component';
import { LodgingSelectFieldComponent } from './lodging-reservations/lodging-select-field/lodging-select-field.component';
import { SignaturePadEditorFieldComponent } from '../signature-pad';

@Injectable({ providedIn: 'root' })
export class NgLodgingReservationsFieldsConfig extends DocumentFieldsConfig<LodgingReservation, number> {
    public area = LODGING_RESERVATIONS_AREA_KEY;
    public validation = new NgLodgingReservationsValidation();
    public formRules: FormRule[] = [
        new AddDaysRule(['checkIn'], 'checkIn', 'checkOut', 'date', 1)
    ];

    constructor(
        public lodgingsStore: NgLodgingsStore,
        public lodgingsActions: NgLodgingsActions,
        public lodgingTypeStore: NgLodgingTypesStore,
        public lodgingTypeActions: NgLodgingTypesActions,
        public fieldProviders: FieldProviders,
        public fieldsStore: NgFieldStore
    ) {
        super(fieldProviders, fieldsStore, LODGING_RESERVATIONS_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<LodgingReservation, number>): Field[] {
        const fields: Field[] = [];

        if (entity && entity.status !== LocalObjectStatus.CREATING) {
            // EDIT FIELDS
            fields.push(...[
                new Field({
                    component: DateTimeFieldComponent,
                    value: entity.object.checkIn,
                    key: 'checkIn',
                    validators: [Validators.required],
                    order: 3,
                    showColumn: true,
                    sortable: true
                }),
                new Field({
                    component: DateTimeFieldComponent,
                    value: entity.object.checkOut,
                    key: 'checkOut',
                    validators: [Validators.required],
                    order: 4,
                    showColumn: true,
                    sortable: true
                })
            ]);
        } else {
            // CREATE FIELDS
            fields.push(...[
                new Field({
                    component: SignaturePadEditorFieldComponent,
                    key: 'test',
                    showColumn: false,
                    sortable: false
                }),
                new Field({
                    component: DateFieldComponent,
                    value: entity ? entity.object.checkIn : new Date(),
                    key: 'checkIn',
                    validators: [Validators.required],
                    order: 3,
                    showColumn: true,
                    sortable: true
                }),
                new Field({
                    component: DateFieldComponent,
                    value: entity ? entity.object.checkOut : (() => {
                        const date = new Date();
                        date.setDate(date.getDate() + 1);
                        return date;
                    })(),
                    key: 'checkOut',
                    validators: [Validators.required],
                    order: 4,
                    showColumn: true,
                    sortable: true
                })
            ]);
        }

        fields.push(...[
            new Field({
                component: LodgingTypeSelectFieldComponent,
                value: entity ? entity.object.lodgingTypeId : undefined,
                key: 'lodgingTypeId',
                displayKey: 'lodgingType',
                displaySubKey: 'object.name',
                validators: [Validators.required],
                order: 4,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: LodgingSelectFieldComponent,
                value: entity ? entity.object.lodgingId : undefined,
                key: 'lodgingId',
                displayKey: 'lodging',
                displaySubKey: 'object.name',
                order: 4,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: IntFieldComponent,
                value: entity ? entity.object.persons : undefined,
                key: 'persons',
                validators: [Validators.required],
                order: 5,
                showColumn: true,
                sortable: true
            })
        ]);

        if (!entity || entity.status === LocalObjectStatus.CREATING) {
            fields.push(new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.status : 0, // 0 equals "processing"
                key: 'status',
                optionsData$: of(LodgingReservation.statusEnum).pipe(
                    map(lse => Object.keys(lse)
                        .filter(key => [
                            LodgingReservation.statusEnum.Processing,
                            LodgingReservation.statusEnum.Reserved
                        ].includes(lse[key]))
                        .reduce((newEnum, key) => {
                            newEnum[key] = lse[key];
                            return newEnum;
                        }, {}))
                ),
                optionsDataType: 'ts-enum',
                order: 5,
                permissions: ['SkipProcessingStatus'],
                sortable: true
            }));

            fields.push(new Field({
                component: CheckboxFieldComponent,
                key: 'allowOverbooking',
                order: 6,
                permissions: ['overbooking'],
                sortable: true
            }));
        }

        fields.push(new Field({
            component: StringFieldComponent,
            value: entity ? entity.object.status : 0,
            key: 'status',
            order: 5,
            sortable: true,
            showColumn: true,
            includeInForm: false,
            displayModifier: (column: DisplayColumn, providedEntity: LocalObject<LodgingReservation, number>): string => EnumHelpers.toIndexEnum(LodgingReservation.statusEnum)[providedEntity.object.status]
        }));

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

