import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus, PagedQuery } from '@skysmack/framework';
import { ProductPriceChange, PRODUCT_PRICE_CHANGES_AREA_KEY, PRODUCT_PRICE_CHANGES_ADDITIONAL_PATHS } from '@skysmack/packages-products-pricings';
import { FormRule, SelectField, Field } from '@skysmack/ng-dynamic-forms';
import { NgProductsStore, NgProductsActions } from '@skysmack/ng-products';
import { LoadedPackage } from '@skysmack/ng-framework';
import { NgProductsSalesPriceActions, NgProductPriceChangesValidation, NgProductsSalesPriceStore } from '@skysmack/ng-products-pricings';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { SelectFieldComponent, CheckboxFieldComponent, DecimalFieldComponent, IntFieldComponent, DateTimeFieldComponent, HiddenFieldComponent } from '@skysmack/portal-fields';

@Injectable({ providedIn: 'root' })
export class NgProductPriceChangesFieldsConfig extends FieldsConfig<ProductPriceChange, number> {
    public validation = new NgProductPriceChangesValidation();
    public area = PRODUCT_PRICE_CHANGES_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public productsSalesPriceStore: NgProductsSalesPriceStore,
        public fieldProviders: FieldProviders,
        public productSalesPriceActions: NgProductsSalesPriceActions,
        public productsStore: NgProductsStore,
        public productsActions: NgProductsActions,
    ) {
        super(fieldProviders, PRODUCT_PRICE_CHANGES_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<ProductPriceChange, number>): Field[] {
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
                validators: [Validators.required],
                displayKey: 'productSalesPrice',
                displaySubKey: 'object.change',
                optionsData$: this.productsStore.get(loadedPackage._package.dependencies[0]),
                getDependencies: () => { this.productsActions.getPaged(loadedPackage._package.dependencies[0], new PagedQuery()); },
                displayNameSelector: 'object.name',
                order: 2,
                showColumn: true
            }),
            new Field({
                component: CheckboxFieldComponent,
                value: entity ? entity.object.perUnit : false,
                key: 'perUnit',
                order: 4,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: CheckboxFieldComponent,
                value: entity ? entity.object.isPercent : false,
                key: 'isPercent',
                order: 4,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: DecimalFieldComponent,
                value: entity ? entity.object.change : undefined,
                key: 'change',
                validators: [Validators.required],
                order: 4,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: IntFieldComponent,
                value: entity ? entity.object.minUnits : undefined,
                key: 'minUnits',
                validators: [Validators.required],
                order: 4,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: IntFieldComponent,
                value: entity ? entity.object.maxUnits : undefined,
                key: 'maxUnits',
                validators: [Validators.required],
                order: 4,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: CheckboxFieldComponent,
                value: entity ? entity.object.onlyValidUnits : false,
                key: 'onlyValidUnits',
                order: 4,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: DateTimeFieldComponent,
                value: entity ? entity.object.validFrom : undefined,
                key: 'validFrom',
                validators: [Validators.required],
                order: 5,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: DateTimeFieldComponent,
                value: entity ? entity.object.validTo : undefined,
                key: 'validTo',
                validators: [Validators.required],
                order: 6,
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