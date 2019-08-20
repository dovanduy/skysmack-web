import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';

import { NgFieldStore, LoadedPackage } from '@skysmack/ng-framework';
import { Router } from '@angular/router';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { DocumentFieldsConfig, StringFieldComponent, HiddenFieldComponent, LimitedStringFieldComponent } from '@skysmack/portal-fields';
import { FieldProviders } from '@skysmack/ng-fields';
import { TERMINAL_RECEIPTS_AREA_KEY, TerminalReceipt } from '@skysmack/packages-terminal-payments';
import { NgTerminalReceiptsValidation } from '@skysmack/ng-terminal-payments';

@Injectable({ providedIn: 'root' })
export class NgTerminalReceiptsFieldsConfig extends DocumentFieldsConfig<TerminalReceipt, number> {
    public validation = new NgTerminalReceiptsValidation();
    public area = TERMINAL_RECEIPTS_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders,
        public fieldsStore: NgFieldStore,
        public router: Router
    ) {
        super(fieldProviders, fieldsStore, router);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, additionalPaths: string[], entity?: LocalObject<TerminalReceipt, number>): Field[] {
        const fields = [
            new Field({
                component: LimitedStringFieldComponent,
                value: entity ? entity.object.type : undefined,
                key: 'type',
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
