import { Injectable } from '@angular/core';
import { LocalObject, PagedQuery, toLocalObject } from '@skysmack/framework';
import { TERMINALS_AREA_KEY, TransactionRequest, Currency, TerminalStatus, ConnectionKey, Connection } from '@skysmack/packages-terminal-payments';
import { LoadedPackage } from '@skysmack/ng-framework';
import { Validators } from '@angular/forms';
import { NgTransactionRequestValidation, NgConnectionsStore, NgConnectionsActions, NgTerminalsStore, NgTerminalsActions } from '@skysmack/ng-terminal-payments';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormRule, Field, SelectFieldOption, SelectField } from '@skysmack/ng-dynamic-forms';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { SelectFieldComponent, IntFieldComponent, HiddenFieldComponent } from '@skysmack/portal-fields';
import { NgClientsStore, NgClientsActions } from '@skysmack/ng-identities';

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
        public connectionsActions: NgConnectionsActions,
        public terminalsStore: NgTerminalsStore,
        public terminalsActions: NgTerminalsActions
    ) {
        super(fieldProviders);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, additionalPaths: string[], entity?: LocalObject<TransactionRequest, unknown>): Field[] {
        const modifyDisplayName = (options: SelectFieldOption[], optionsData: LocalObject<Connection, ConnectionKey>[]) => {
            const connections = optionsData;
            return options.map(option => {
                if (connections) {
                    const connection = connections.find(connection => {
                        if (connection.object.id) {
                            return (connection.object.id.clientId === option.value.clientId && connection.object.id.terminalId === option.value.terminalId) ? true : false;
                        } else {
                            return false;
                        }
                    });
                    if (connection) {
                        option.displayName = `${connection.object.terminal && connection.object.terminal.object.name} (${connection.object.client && connection.object.client.object.name})`;
                    }
                }
                return option;
            });
        };

        const fields = [
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.connection : undefined,
                key: 'connection',
                displayKey: 'connection',
                displaySubKey: 'object.status',
                optionsData$: this.connectionsStore.get(loadedPackage._package.path).pipe(
                    map(connections => {
                        const selectable = connections.filter(connection => {
                            const openedCheck = connection.object.status === TerminalStatus.Open;
                            const connectedCheck = connection.object.status === TerminalStatus.Connected;
                            const onlineCheck = connection.object.client && connection.object.client.object.online;
                            return ((openedCheck || connectedCheck) && onlineCheck) ? true : false;
                        });

                        return selectable.length > 0 ? selectable : [toLocalObject({ status: 'No connections available', id: null })];
                    })
                ),
                displayNameSelector: 'object.status',
                modifyDisplayName,
                getDependencies: () => {
                    this.connectionsActions.getPaged(loadedPackage._package.path, new PagedQuery());
                },
                validators: [Validators.required],
                order: 1,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: IntFieldComponent,
                value: entity ? entity.object.amount : undefined,
                key: 'amount',
                validators: [Validators.required],
                order: 2,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: HiddenFieldComponent,
                value: entity ? entity.object.invoiceId : undefined,
                key: 'invoiceId',
                order: 3,
                showColumn: true,
                sortable: true
            }),
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.currencyCode : undefined,
                key: 'currencyCode',
                optionsData$: of(Currency),
                optionsDataType: 'ts-enum',
                useEnumValue: true,
                order: 4,
                showColumn: true,
                sortable: true
            }),
        ];

        return fields;
    }
}


