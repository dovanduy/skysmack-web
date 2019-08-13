import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { Receipt, RECEIPTS_AREA_KEY } from '@skysmack/packages-terminal-payments';
import { NgReceiptsValidation } from '@skysmack/ng-terminal-payments';
import { LoadedPackage, NgFieldStore } from '@skysmack/ng-framework';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { FieldProviders } from '@skysmack/ng-fields';
import { StringFieldComponent, HiddenFieldComponent, DocumentFieldsConfig } from '@skysmack/portal-fields';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NgReceiptsFieldsConfig extends DocumentFieldsConfig<Receipt, number> {
    public validation = new NgReceiptsValidation();
    public area = RECEIPTS_AREA_KEY
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders,
        public fieldStore: NgFieldStore,
        public router: Router
    ) {
        super(fieldProviders, fieldStore, router);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<Receipt, number>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.name : undefined,
                key: 'name',
                validators: [Validators.required],
                order: 1,
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
