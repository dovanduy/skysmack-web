import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus, PagedQuery } from '@skysmack/framework';
import { ProductsSalesPrice, PRODUCTS_SALES_PRICE_AREA_KEY } from '@skysmack/packages-products-pricings';
import { FormRule, SelectField, Field } from '@skysmack/ng-dynamic-forms';
import { NgProductsSalesPriceValidation, NgProductsStore, NgProductTypesActions, NgProductsActions } from '@skysmack/ng-packages';
import { LoadedPackage, getPackageDendencyAsStream } from '@skysmack/ng-framework';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { SelectFieldComponent, DecimalFieldComponent, HiddenFieldComponent } from '@skysmack/portal-fields';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgProductsSalesPriceFieldsConfig extends FieldsConfig<ProductsSalesPrice, number> {
    public validation = new NgProductsSalesPriceValidation();
    public area = PRODUCTS_SALES_PRICE_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public productsStore: NgProductsStore,
        public fieldProviders: FieldProviders,
        public productsActions: NgProductsActions,
        public skysmackStore: NgSkysmackStore
    ) { super(fieldProviders); }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<ProductsSalesPrice, number>): Field[] {
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
                optionsData$: this.productsStore.get(loadedPackage._package.dependencies[0]),
                getDependencies: () => {
                    productPackage$.pipe(
                        map(productPackage => this.productsActions.getPaged(productPackage.object.path, new PagedQuery())),
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
