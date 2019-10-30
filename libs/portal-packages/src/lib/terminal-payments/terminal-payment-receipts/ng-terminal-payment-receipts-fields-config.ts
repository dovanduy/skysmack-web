import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus, PagedQuery } from '@skysmack/framework';

import { NgFieldStore, LoadedPackage, getPackageDendencyAsStream } from '@skysmack/ng-framework';
import { FormRule, Field, SelectField } from '@skysmack/ng-dynamic-forms';
import { DocumentFieldsConfig, StringFieldComponent, HiddenFieldComponent, IntFieldComponent, SelectFieldComponent } from '@skysmack/portal-fields';
import { FieldProviders } from '@skysmack/ng-fields';
import { TERMINAL_PAYMENT_RECEIPTS_AREA_KEY, TerminalPaymentReceipt, TERMINAL_PAYMENT_RECEIPTS_ADDITIONAL_PATHS } from '@skysmack/packages-terminal-payments';
import { NgTerminalPaymentReceiptsValidation } from '@skysmack/ng-terminal-payments';
import { NgInvoicePaymentsStore, NgInvoicePaymentsActions } from '@skysmack/ng-invoices';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { switchMap, take, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgTerminalPaymentReceiptsFieldsConfig extends DocumentFieldsConfig<TerminalPaymentReceipt, number> {
    public validation = new NgTerminalPaymentReceiptsValidation();
    public area = TERMINAL_PAYMENT_RECEIPTS_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders,
        public fieldsStore: NgFieldStore,
        public invoicePaymentsStore: NgInvoicePaymentsStore,
        public invoicePaymentsActions: NgInvoicePaymentsActions,
        public skysmackStore: NgSkysmackStore
    ) {
        super(fieldProviders, fieldsStore, TERMINAL_PAYMENT_RECEIPTS_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<TerminalPaymentReceipt, number>): Field[] {
        const invoicesPackage$ = getPackageDendencyAsStream(this.skysmackStore, loadedPackage._package.path, [1]);

        const fields = [
            new Field({
                component: IntFieldComponent,
                value: entity ? entity.object.referenceNumber : undefined,
                key: 'referenceNumber',
                validators: [Validators.required],
                order: 1,
                showColumn: true,
                sortable: true
            }),

            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.printReceipt : undefined,
                key: 'printReceipt',
                validators: [Validators.required],
                order: 2,
                showColumn: true,
                sortable: true
            }),

            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.receiptDocument : undefined,
                key: 'receiptDocument',
                validators: [Validators.required],
                order: 3,
                showColumn: true,
                sortable: true
            }),

            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.invoicePaymentId : undefined,
                key: 'invoicePaymentId',
                displayKey: 'invoicePayment',
                displaySubKey: 'object.description',
                optionsData$: invoicesPackage$.pipe(switchMap(invoicesPackage => this.invoicePaymentsStore.get(invoicesPackage.object.path))),
                // Note: This doesn't need to be unsubscribed.
                getDependencies: () => {
                    invoicesPackage$.pipe(
                        map(invoicesPackage => {
                            this.invoicePaymentsActions.getPaged(invoicesPackage.object.path, new PagedQuery());
                        }),
                        take(1)
                    ).subscribe();
                },
                extraOptions: [{
                    value: null,
                    displayName: 'None'
                }],
                order: 1,
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
