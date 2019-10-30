import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus, PagedQuery } from '@skysmack/framework';
import { FormRule, SelectField, Field } from '@skysmack/ng-dynamic-forms';
import { NgLodgingsStore, NgLodgingsActions } from '@skysmack/ng-lodgings';
import { LoadedPackage, getPackageDendencyAsStream } from '@skysmack/ng-framework';
import { LodgingReservationPriceChange, LODGING_RESERVATION_PRICE_CHANGES_ADDITIONAL_PATHS } from '@skysmack/packages-reservations-pricings';
import { LODGING_RESERVATION_PRICE_CHANGES_AREA_KEY } from '@skysmack/packages-reservations-pricings';
import { of } from 'rxjs';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { map, take, switchMap } from 'rxjs/operators';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { SelectFieldComponent, CheckboxFieldComponent, DecimalFieldComponent, IntFieldComponent, DateTimeFieldComponent, DateFieldComponent, FlaggedEnumFieldComponent, DaysOfWeekFlagged, HiddenFieldComponent } from '@skysmack/portal-fields';
import { NgLodgingReservationPriceChangesValidation } from '@skysmack/ng-reservations-pricings';

@Injectable({ providedIn: 'root' })
export class NgLodgingReservationPriceChangesFieldsConfig extends FieldsConfig<LodgingReservationPriceChange, number> {
    public validation = new NgLodgingReservationPriceChangesValidation();
    public area = LODGING_RESERVATION_PRICE_CHANGES_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public lodgingsStore: NgLodgingsStore,
        public lodgingsActions: NgLodgingsActions,
        public fieldProviders: FieldProviders,
        public skysmackStore: NgSkysmackStore
    ) { super(fieldProviders, LODGING_RESERVATION_PRICE_CHANGES_ADDITIONAL_PATHS); }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<LodgingReservationPriceChange, number>): Field[] {
        const lodgingPackage$ = getPackageDendencyAsStream(this.skysmackStore, loadedPackage._package.path, [0, 0])

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
                showColumn: true,
                sortable: true
            } as SelectField
            ),
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.recordId : undefined,
                key: 'recordId',
                displayKey: 'record',
                displaySubKey: 'object.name',
                validators: [Validators.required],
                optionsData$: lodgingPackage$.pipe(switchMap(lodgingPackage => this.lodgingsStore.get(lodgingPackage.object.path))),
                // Note: This doesn't need to be unsubscribed.
                getDependencies: () => {
                    lodgingPackage$.pipe(
                        map(lodgingPackage => this.lodgingsActions.getPaged(lodgingPackage.object.path, new PagedQuery())),
                        take(1)
                    ).subscribe();
                },
                displayNameSelector: 'object.name',
                order: 2,
                showColumn: true
            }),
            new Field({
                component: CheckboxFieldComponent,
                value: entity ? entity.object.perUnit : false,
                key: 'perUnit',
                validators: [Validators.required],
                order: 3,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: CheckboxFieldComponent,
                value: entity ? entity.object.isPercent : false,
                key: 'isPercent',
                validators: [Validators.required],
                order: 4,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: DecimalFieldComponent,
                value: entity ? entity.object.change : undefined,
                key: 'change',
                validators: [Validators.required],
                order: 5,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: IntFieldComponent,
                value: entity ? entity.object.minUnits : undefined,
                key: 'minUnits',
                validators: [Validators.required],
                order: 6,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: IntFieldComponent,
                value: entity ? entity.object.maxUnits : undefined,
                key: 'maxUnits',
                validators: [Validators.required],
                order: 7,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: CheckboxFieldComponent,
                value: entity ? entity.object.onlyValidUnits : false,
                key: 'onlyValidUnits',
                order: 8,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: IntFieldComponent,
                value: entity ? entity.object.minUnitsOfTime : undefined,
                key: 'minUnitsOfTime',
                validators: [Validators.required],
                order: 9,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: IntFieldComponent,
                value: entity ? entity.object.maxUnitsOfTime : undefined,
                key: 'maxUnitsOfTime',
                validators: [Validators.required],
                order: 10,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: CheckboxFieldComponent,
                value: entity ? entity.object.onlyValidUnitsOfTime : false,
                key: 'onlyValidUnitsOfTime',
                order: 11,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: CheckboxFieldComponent,
                value: entity ? entity.object.perUnitOfTime : false,
                key: 'perUnitOfTime',
                order: 12,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: DateTimeFieldComponent,
                value: entity ? entity.object.validFrom : undefined,
                key: 'validFrom',
                order: 13,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: DateTimeFieldComponent,
                value: entity ? entity.object.validTo : undefined,
                key: 'validTo',
                order: 14,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: DateFieldComponent,
                value: entity ? entity.object.start : undefined,
                key: 'start',
                validators: [Validators.required],
                order: 15,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: DateFieldComponent,
                value: entity ? entity.object.end : undefined,
                key: 'end',
                validators: [Validators.required],
                order: 16,
                showColumn: true,
                sortable: true
            }),
            new SelectField({
                component: FlaggedEnumFieldComponent,
                value: entity ? entity.object.excludeDaysOfWeek : 0,
                optionsData$: of(DaysOfWeekFlagged),
                optionsDataType: 'flag-enum',
                key: 'excludeDaysOfWeek',
                order: 1,
                showColumn: true,
                sortable: true
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
