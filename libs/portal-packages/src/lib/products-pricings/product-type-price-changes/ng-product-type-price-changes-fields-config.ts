import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus, PagedQuery } from '@skysmack/framework';
import { ProductTypePriceChange, PRODUCT_TYPE_PRICE_CHANGES_AREA_KEY } from '@skysmack/packages-products-pricings';
import { FormRule, SelectField, Field } from '@skysmack/ng-dynamic-forms';
import { NgProductTypesStore, NgProductTypesActions } from '@skysmack/ng-products';
import { LoadedPackage, getPackageDendencyAsStream } from '@skysmack/ng-framework';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { SelectFieldComponent, CheckboxFieldComponent, DecimalFieldComponent, IntFieldComponent, DateTimeFieldComponent, HiddenFieldComponent } from '@skysmack/portal-fields';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { map, take } from 'rxjs/operators';
import { NgProductTypePriceChangesValidation } from '@skysmack/ng-products-pricings';

@Injectable({ providedIn: 'root' })
export class NgProductTypePriceChangesFieldsConfig extends FieldsConfig<ProductTypePriceChange, number> {
    public validation = new NgProductTypePriceChangesValidation();
    public area = PRODUCT_TYPE_PRICE_CHANGES_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public productTypesStore: NgProductTypesStore,
        public productTypesActions: NgProductTypesActions,
        public fieldProviders: FieldProviders,
        public skysmackStore: NgSkysmackStore

    ) {
        super(fieldProviders);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<ProductTypePriceChange, number>): Field[] {
        const productPackage$ = getPackageDendencyAsStream(this.skysmackStore, loadedPackage._package.path, [0])

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
                showColumn: true
            } as SelectField),
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.recordId : undefined,
                key: 'recordId',
                displayKey: 'record',
                displaySubKey: 'object.name',
                validators: [Validators.required],
                optionsData$: this.productTypesStore.get(loadedPackage._package.dependencies[0]),
                getDependencies: () => {
                    productPackage$.pipe(
                        map(productPackage => this.productTypesActions.getPaged(productPackage.object.path, new PagedQuery())),
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
                order: 4,
                showColumn: true
            }),
            new Field({
                component: CheckboxFieldComponent,
                value: entity ? entity.object.isPercent : false,
                key: 'isPercent',
                validators: [Validators.required],
                order: 4,
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
                component: IntFieldComponent,
                value: entity ? entity.object.minUnits : undefined,
                key: 'minUnits',
                validators: [Validators.required],
                order: 4,
                showColumn: true
            }),
            new Field({
                component: IntFieldComponent,
                value: entity ? entity.object.maxUnits : undefined,
                key: 'maxUnits',
                validators: [Validators.required],
                order: 4,
                showColumn: true
            }),
            new Field({
                component: CheckboxFieldComponent,
                value: entity ? entity.object.onlyValidUnits : false,
                key: 'onlyValidUnits',
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
