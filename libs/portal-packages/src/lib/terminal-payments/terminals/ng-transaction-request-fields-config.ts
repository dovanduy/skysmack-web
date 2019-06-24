import { Injectable } from '@angular/core';
import { FormRule, SelectField } from '@skysmack/ng-ui';
import { LocalObject, PagedQuery, toLocalObject } from '@skysmack/framework';
import { TERMINALS_AREA_KEY, TransactionRequest, Currency, TerminalStatus } from '@skysmack/packages-terminal-payments';
import { Field } from '@skysmack/ng-ui';
import { FieldsConfig, IntFieldComponent, SelectFieldComponent } from '@skysmack/portal-ui';
import { FieldProviders } from '@skysmack/portal-ui';
import { LoadedPackage } from '@skysmack/ng-framework';
import { Validators } from '@angular/forms';
import { NgTransactionRequestValidation, NgClientsStore, NgClientsActions, NgConnectionsStore, NgConnectionsActions } from '@skysmack/ng-packages';
import { of, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgTransactionRequestFieldsConfig extends FieldsConfig<TransactionRequest, number> {
    public validation = new NgTransactionRequestValidation();
    public area = TERMINALS_AREA_KEY;
    public formRules: FormRule[] = [
    ];

    constructor(
        public fieldProviders: FieldProviders,
        public clientsStore: NgClientsStore,
        public clientsActions: NgClientsActions,
        public connectionsStore: NgConnectionsStore,
        public connectionsActions: NgConnectionsActions
    ) {
        super(fieldProviders);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<TransactionRequest, unknown>): Field[] {
        const fields = [
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.clientId : undefined,
                key: 'clientId',
                optionsData$: combineLatest(
                    this.clientsStore.get(loadedPackage._package.path),
                    this.connectionsStore.get(loadedPackage._package.path)
                ).pipe(
                    map(([clients, connections]) => {
                        const selectable = clients.filter(client => client.object.online).map(client => {
                            const relatedConnection = connections.find(connection => connection.object.id.clientId === client.object.id);
                            // Object is cloned, otherwise the reference is updated when setting the name
                            const clone = {
                                ...client,
                                object: { ...client.object }
                            };
                            clone.object.name = `${clone.object.name} (${relatedConnection ? TerminalStatus[relatedConnection.object.status] : 'Unkown'})`;
                            return clone;
                        })

                        return selectable.length > 0 ? selectable : [toLocalObject({ name: 'No clients available', id: null })];
                    })
                ),
                getDependencies: () => {
                    this.clientsActions.getPaged(loadedPackage._package.path, new PagedQuery());
                    this.connectionsActions.getPaged(loadedPackage._package.path, new PagedQuery());
                },
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


