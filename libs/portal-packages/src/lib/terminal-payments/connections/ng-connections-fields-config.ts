import { Injectable } from '@angular/core';
import { FormRule } from '@skysmack/ng-ui';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { Connection, CONNECTIONS_AREA_KEY, ConnectionKey } from '@skysmack/packages-terminal-payments';
import { Field } from '@skysmack/ng-ui';
import { FieldsConfig, StringFieldComponent, HiddenFieldComponent } from '@skysmack/portal-ui';
import { NgConnectionsValidation } from '@skysmack/ng-packages';
import { FieldProviders } from '@skysmack/portal-ui';
import { LoadedPackage } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgConnectionsFieldsConfig extends FieldsConfig<Connection, ConnectionKey> {
    public validation = new NgConnectionsValidation();
    public area = CONNECTIONS_AREA_KEY
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders
    ) {
        super(fieldProviders);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<Connection, ConnectionKey>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.status : undefined,
                key: 'status',
                order: 1,
                showColumn: true,
                includeInForm: false
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
