import { Injectable } from '@angular/core';
import { FormRule, SelectField } from '@skysmack/ng-ui';
import { LocalObject, LocalObjectStatus, PagedQuery } from '@skysmack/framework';
import { Connection, CONNECTIONS_AREA_KEY, ConnectionKey } from '@skysmack/packages-terminal-payments';
import { Field } from '@skysmack/ng-ui';
import { FieldsConfig, HiddenFieldComponent, SelectFieldComponent, StringFieldComponent } from '@skysmack/portal-ui';
import { NgConnectionsValidation, NgTerminalsStore, NgTerminalsActions, NgClientsStore, NgClientsActions } from '@skysmack/ng-packages';
import { FieldProviders } from '@skysmack/portal-ui';
import { LoadedPackage } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgConnectionsFieldsConfig extends FieldsConfig<Connection, ConnectionKey> {
    public validation = new NgConnectionsValidation();
    public area = CONNECTIONS_AREA_KEY
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders,
        public terminalsStore: NgTerminalsStore,
        public terminalsActions: NgTerminalsActions,
        public clientsStore: NgClientsStore,
        public clientsActions: NgClientsActions
    ) {
        super(fieldProviders);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<Connection, ConnectionKey>): Field[] {
        const fields: Field[] = [
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.status : undefined,
                key: 'status',
                order: 1,
                showColumn: true,
                includeInForm: false
            }),
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.id.clientId : undefined,
                optionsData$: this.clientsStore.get(loadedPackage._package.path),
                getDependencies: () => { this.clientsActions.getPaged(loadedPackage._package.path, new PagedQuery()); },
                key: 'clientId',
                displayKey: 'id',
                displaySubKey: 'clientId',
                order: 1,
                showColumn: true
            }),
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.id.terminalId : undefined,
                key: 'terminalId',
                displayKey: 'id',
                displaySubKey: 'terminalId',
                optionsData$: this.terminalsStore.get(loadedPackage._package.path),
                getDependencies: () => { this.clientsActions.getPaged(loadedPackage._package.path, new PagedQuery()); },
                order: 2,
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
