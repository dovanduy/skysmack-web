import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus, PagedQuery } from '@skysmack/framework';
import { FormRule, SelectField, Field } from '@skysmack/ng-dynamic-forms';
import { NgLodgingsStore, NgLodgingsActions } from '@skysmack/ng-lodgings';
import { LoadedPackage, getPackageDendencyAsStream } from '@skysmack/ng-framework';
import { LodgingPrice, LODGING_PRICES_AREA_KEY, LODGING_PRICES_ADDITIONAL_PATHS } from '@skysmack/packages-reservations-pricings';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { switchMap, map, take } from 'rxjs/operators';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { SelectFieldComponent, DecimalFieldComponent, HiddenFieldComponent } from '@skysmack/portal-fields';
import { NgLodgingPricesValidation } from '@skysmack/ng-reservations-pricings';

@Injectable({ providedIn: 'root' })
export class NgLodgingPricesFieldsConfig extends FieldsConfig<LodgingPrice, number> {
    public validation = new NgLodgingPricesValidation();
    public area = LODGING_PRICES_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public lodgingsStore: NgLodgingsStore,
        public lodgingsActions: NgLodgingsActions,
        public fieldProviders: FieldProviders,
        public skysmackStore: NgSkysmackStore
    ) { super(fieldProviders, LODGING_PRICES_ADDITIONAL_PATHS); }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<LodgingPrice, number>): Field[] {
        const lodgingPackage$ = getPackageDendencyAsStream(this.skysmackStore, loadedPackage._package.path, [0, 0]);

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
                    }
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
                component: DecimalFieldComponent,
                value: entity ? entity.object.price : undefined,
                key: 'price',
                validators: [Validators.required],
                order: 3,
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
