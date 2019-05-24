import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule, SelectField } from '@skysmack/ng-ui';
import { LocalObject, LocalObjectStatus, PagedQuery } from '@skysmack/framework';
import { CashPayment, INVOICES_CASH_PAYMENTS_AREA_KEY } from '@skysmack/packages-invoices-cash-payments';
import { Field } from '@skysmack/ng-ui';
import { FieldsConfig, StringFieldComponent, HiddenFieldComponent, FieldProviders, IntFieldComponent, SelectFieldComponent } from '@skysmack/portal-ui';
import { NgInvoicesCashPaymentsValidation, NgInvoicesStore, NgInvoicesActions } from '@skysmack/ng-packages';
import { LoadedPackage } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { switchMap, take, map } from 'rxjs/operators';

export interface NgInvoiceFormDependencies {
    [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class NgInvoicesCashPaymentsFieldsConfig extends FieldsConfig<CashPayment, number> {
    public validation = new NgInvoicesCashPaymentsValidation();
    public area = INVOICES_CASH_PAYMENTS_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders,
        public invoicesStore: NgInvoicesStore,
        public invoicesActions: NgInvoicesActions,
        public skysmackStore: NgSkysmackStore
    ) {
        super(fieldProviders);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<CashPayment, number>): Field[] {
        const invoicePackage$ = this.skysmackStore.getPackages().pipe(
            map(packages => packages.find(_package => _package.object.path === loadedPackage._package.dependencies[0]))
        );

        const fields = [
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.invoiceId : undefined,
                key: 'invoiceId',
                displayKey: 'invoice',
                displaySubKey: 'object.currencyCode',
                optionsData$: invoicePackage$.pipe(switchMap(invoicePackage => this.invoicesStore.get(invoicePackage.object.path))),
                displayNameSelector: 'object.currencyCode',
                getDependencies: () => { invoicePackage$.pipe(map(invoicePackage => this.invoicesActions.getPaged(invoicePackage.object.path, new PagedQuery())),
                        take(1)
                    ).subscribe();
                },
                order: 1,
                showColumn: true
            }),
            new Field({
                component: IntFieldComponent,
                value: entity ? entity.object.amount : undefined,
                key: 'amount',
                validators: [Validators.required],
                order: 1,
                showColumn: true
            }),
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.currencyCode : undefined,
                key: 'currencyCode',
                validators: [Validators.required],
                order: 1,
                showColumn: true
            }),
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.description : undefined,
                key: 'description',
                order: 1,
                showColumn: true
            }),
            new Field({
                component: HiddenFieldComponent,
                value: entity ? entity.object.time : undefined,
                key: 'time',
                order: 1,
            }),
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
