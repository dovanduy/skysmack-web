import { Injectable } from '@angular/core';
import { FormRule, SelectField } from '@skysmack/ng-ui';
import { LocalObject } from '@skysmack/framework';
import { TERMINALS_AREA_KEY, TransactionRequest, Currency } from '@skysmack/packages-terminal-payments';
import { Field } from '@skysmack/ng-ui';
import { FieldsConfig, IntFieldComponent, SelectFieldComponent } from '@skysmack/portal-ui';
import { FieldProviders } from '@skysmack/portal-ui';
import { LoadedPackage } from '@skysmack/ng-framework';
import { Validators } from '@angular/forms';
import { NgTransactionRequestValidation } from '@skysmack/ng-packages';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NgTransactionRequestFieldsConfig extends FieldsConfig<TransactionRequest, number> {
    public validation = new NgTransactionRequestValidation();
    public area = TERMINALS_AREA_KEY;
    public formRules: FormRule[] = [
    ];

    constructor(
        public fieldProviders: FieldProviders
    ) {
        super(fieldProviders);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<TransactionRequest, unknown>): Field[] {
        const fields = [
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.clientId : undefined,
                key: 'clientId',
                validators: [Validators.required],
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
                component: IntFieldComponent,
                value: entity ? entity.object.reference : undefined,
                key: 'reference',
                order: 1,
                showColumn: true
            }),
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.currency : undefined,
                key: 'currency',
                optionsData$: of(Currency),
                optionsDataType: 'ts-enum',
                useEnumValue: true,
                order: 1,
                showColumn: true
            }),
        ];

        return fields;
    }
}


