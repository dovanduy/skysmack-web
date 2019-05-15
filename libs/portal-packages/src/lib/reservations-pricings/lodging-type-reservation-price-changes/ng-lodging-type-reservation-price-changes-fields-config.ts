import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus, PagedQuery } from '@skysmack/framework';
import { FormRule, SelectField, Field } from '@skysmack/ng-ui';
import { NgLodgingTypeReservationPriceChangesValidation, NgLodgingTypesStore, NgLodgingTypesActions } from '@skysmack/ng-packages';
import { FieldsConfig, SelectFieldComponent, HiddenFieldComponent, DecimalFieldComponent, DateTimeFieldComponent, FlaggedEnumFieldComponent, DaysOfWeekFlagged } from '@skysmack/portal-ui';
import { FieldProviders } from '@skysmack/portal-ui';
import { LoadedPackage, getPackageDendencyAsStream } from '@skysmack/ng-redux';
import { LodgingTypeReservationPriceChange } from '@skysmack/packages-reservations-pricings';
import { of } from 'rxjs';
import { PriceChangeType } from '@skysmack/pricings';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { map, take, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypeReservationPriceChangesFieldsConfig extends FieldsConfig<LodgingTypeReservationPriceChange, number> {
    public validation = new NgLodgingTypeReservationPriceChangesValidation();

    public formRules: FormRule[] = [];

    constructor(
        public skysmackStore: NgSkysmackStore,
        public lodgingTypesStore: NgLodgingTypesStore,
        public lodgingTypesActions: NgLodgingTypesActions,
        public fieldProviders: FieldProviders
    ) { super(fieldProviders); }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<LodgingTypeReservationPriceChange, number>): Field[] {
        const lodgingTypePackage$ = getPackageDendencyAsStream(this.skysmackStore, loadedPackage._package.path, [0, 0]);

        const fields = [
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.currencyCode : undefined,
                key: 'currencyCode',
                validators: [Validators.required],
                extraOptions: [
                    {
                        value: 'SEK',
                        displayName: 'SEK'
                    },
                    {
                        value: 'DKK',
                        displayName: 'DKK'
                    },
                ],
                order: 1,
                showColumn: true
            } as SelectField),
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.recordId : undefined,
                key: 'recordId',
                displayKey: 'record',
                displaySubKey: 'object.name',
                validators: [Validators.required],
                optionsData$: lodgingTypePackage$.pipe(switchMap(lodgingTypePackage => this.lodgingTypesStore.get(lodgingTypePackage.object.path))),
                getDependencies: () => {
                    lodgingTypePackage$.pipe(
                        map(lodgingTypePackage => this.lodgingTypesActions.getPaged(lodgingTypePackage.object.path, new PagedQuery())),
                        take(1)
                    ).subscribe();
                },
                displayNameSelector: 'object.name',
                order: 2,
                showColumn: true
            }),
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.changeType : undefined,
                key: 'changeType',
                validators: [Validators.required],
                optionsData$: of(PriceChangeType),
                optionsDataType: 'ts-enum',
                order: 3,
                showColumn: true
            }),
            new Field({
                component: DecimalFieldComponent,
                value: entity ? entity.object.change : undefined,
                key: 'change',
                validators: [Validators.required],
                order: 4,
                showColumn: true
            }),
            new Field({
                component: DateTimeFieldComponent,
                value: entity ? entity.object.validFrom : undefined,
                key: 'validFrom',
                order: 5,
                showColumn: true
            }),
            new Field({
                component: DateTimeFieldComponent,
                value: entity ? entity.object.validTo : undefined,
                key: 'validTo',
                order: 6,
                showColumn: true
            }),
            new Field({
                component: DateTimeFieldComponent,
                value: entity ? entity.object.start : undefined,
                key: 'start',
                validators: [Validators.required],
                order: 5,
                showColumn: true
            }),
            new Field({
                component: DateTimeFieldComponent,
                value: entity ? entity.object.end : undefined,
                key: 'end',
                validators: [Validators.required],
                order: 6,
                showColumn: true
            }),
            new SelectField({
                component: FlaggedEnumFieldComponent,
                value: entity ? entity.object.daysOfWeek : 0,
                optionsData$: of(DaysOfWeekFlagged),
                optionsDataType: 'flag-enum',
                key: 'daysOfWeek',
                order: 1,
                showColumn: true
            } as SelectField)
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
