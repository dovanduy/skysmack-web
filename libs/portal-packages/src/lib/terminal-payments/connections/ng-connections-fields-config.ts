import { Injectable } from '@angular/core';
import { LocalObject, LocalObjectStatus, PagedQuery, DisplayColumn } from '@skysmack/framework';
import { Connection, CONNECTIONS_AREA_KEY, ConnectionKey, TerminalStatus, CONNECTIONS_ADDITIONAL_PATHS } from '@skysmack/packages-terminal-payments';
import { NgConnectionsValidation, NgTerminalsStore, NgTerminalsActions } from '@skysmack/ng-terminal-payments';
import { LoadedPackage, getPackageDendencyAsStream } from '@skysmack/ng-framework';
import { FormRule, Field, SelectField } from '@skysmack/ng-dynamic-forms';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { StringFieldComponent, SelectFieldComponent, HiddenFieldComponent } from '@skysmack/portal-fields';
import { NgClientsStore, NgClientsActions } from '@skysmack/ng-identities';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { switchMap, map, take } from 'rxjs/operators';
import { Validators } from '@angular/forms';

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
        public clientsActions: NgClientsActions,
        public skysmackStore: NgSkysmackStore
    ) {
        super(fieldProviders, CONNECTIONS_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<Connection, ConnectionKey>): Field[] {
        const identitiesPackage$ = getPackageDendencyAsStream(this.skysmackStore, loadedPackage._package.path, [0]);


        const fields: Field[] = [
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.status : undefined,
                key: 'status',
                displayModifier: (column: DisplayColumn, providedEntity: LocalObject<Connection, ConnectionKey>): string => TerminalStatus[providedEntity.object.status],
                order: 1,
                showColumn: true,
                includeInForm: false,
                sortable: true
            }),
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.id.clientId : undefined,
                optionsData$: identitiesPackage$.pipe(switchMap(identitiesPackage => this.clientsStore.get(identitiesPackage.object.path))),
                getDependencies: () => {
                    identitiesPackage$.pipe(map(identitiesPackage => {
                        this.clientsActions.getPaged(identitiesPackage.object.path, new PagedQuery());
                    }),
                        take(1)
                    ).subscribe();
                },
                key: 'clientId',
                displayKey: 'client',
                displaySubKey: 'object.name',
                validators: [Validators.required],
                order: 2,
                showColumn: true
            }),
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.id.terminalId : undefined,
                key: 'terminalId',
                displayKey: 'terminal',
                displaySubKey: 'object.name',
                optionsData$: this.terminalsStore.get(loadedPackage._package.path),
                getDependencies: () => { this.terminalsActions.getPaged(loadedPackage._package.path, new PagedQuery()); },
                validators: [Validators.required],
                order: 3,
                showColumn: true
            }),
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.id.clientId : undefined,
                key: 'online',
                displayKey: 'client',
                displaySubKey: 'object.online',
                order: 4,
                showColumn: true,
                includeInForm: false,
                sortable: true
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
