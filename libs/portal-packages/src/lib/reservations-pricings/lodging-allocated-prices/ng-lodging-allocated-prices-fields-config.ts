import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus, PagedQuery } from '@skysmack/framework';
import { FormRule, SelectField, Field } from '@skysmack/ng-ui';
import { NgLodgingAllocatedPricesValidation, NgLodgingsStore, NgLodgingsActions } from '@skysmack/ng-packages';
import { FieldsConfig, SelectFieldComponent, HiddenFieldComponent, DecimalFieldComponent, DateTimeFieldComponent } from '@skysmack/portal-ui';
import { FieldProviders } from '@skysmack/portal-ui';
import { LoadedPackage, getParentPackageDependency } from '@skysmack/ng-redux';
import { LodgingAllocatedPrice } from '@skysmack/packages-reservations-pricings';
import { of } from 'rxjs';
import { PriceChangeType } from '@skysmack/pricings';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { map, take, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgLodgingAllocatedPricesFieldsConfig extends FieldsConfig<LodgingAllocatedPrice, number> {
    public validation = new NgLodgingAllocatedPricesValidation();

    public formRules: FormRule[] = [];

    constructor(
        public lodgingsStore: NgLodgingsStore,
        public lodgingsActions: NgLodgingsActions,
        public fieldProviders: FieldProviders,
        public skysmackStore: NgSkysmackStore
    ) { super(fieldProviders); }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<LodgingAllocatedPrice, number>): Field[] {
        const lodgingPackage$ = getParentPackageDependency(this.skysmackStore, loadedPackage._package.dependencies[0]);

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
                optionsData$: lodgingPackage$.pipe(switchMap(lodgingPackage => this.lodgingsStore.get(lodgingPackage.object.path))),
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
                validators: [Validators.required],
                order: 5,
                showColumn: true
            }),
            new Field({
                component: DateTimeFieldComponent,
                value: entity ? entity.object.validTo : undefined,
                key: 'validTo',
                validators: [Validators.required],
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
