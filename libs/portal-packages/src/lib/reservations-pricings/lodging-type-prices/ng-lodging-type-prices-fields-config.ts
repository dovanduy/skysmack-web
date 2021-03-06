import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus, PagedQuery } from '@skysmack/framework';
import { FormRule, SelectField, Field } from '@skysmack/ng-dynamic-forms';
import { NgLodgingTypesStore, NgLodgingTypesActions } from '@skysmack/ng-lodgings';
import { LoadedPackage, getPackageDendencyAsStream } from '@skysmack/ng-framework';
import { LodgingTypePrice, LODGING_TYPE_PRICES_AREA_KEY, LODGING_TYPE_PRICES_ADDITIONAL_PATHS } from '@skysmack/packages-reservations-pricings';
import { switchMap, map, take } from 'rxjs/operators';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { SelectFieldComponent, DecimalFieldComponent, HiddenFieldComponent } from '@skysmack/portal-fields';
import { NgLodgingTypePricesValidation } from '@skysmack/ng-reservations-pricings';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypePricesFieldsConfig extends FieldsConfig<LodgingTypePrice, number> {
    public validation = new NgLodgingTypePricesValidation();
    public area = LODGING_TYPE_PRICES_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public skysmackStore: NgSkysmackStore,
        public lodgingTypesStore: NgLodgingTypesStore,
        public lodgingTypesActions: NgLodgingTypesActions,
        public fieldProviders: FieldProviders
    ) { super(fieldProviders, LODGING_TYPE_PRICES_ADDITIONAL_PATHS); }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<LodgingTypePrice, number>): Field[] {
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
                optionsData$: lodgingTypePackage$.pipe(switchMap(lodgingTypePackage => this.lodgingTypesStore.get(lodgingTypePackage.object.path))),
                // Note: This doesn't need to be unsubscribed.
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
