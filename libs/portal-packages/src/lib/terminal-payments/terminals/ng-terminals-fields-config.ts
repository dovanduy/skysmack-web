import { Injectable } from '@angular/core';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { Terminal, TERMINALS_AREA_KEY } from '@skysmack/packages-terminal-payments';
import { NgTerminalsValidation } from '@skysmack/ng-terminal-payments';
import { LoadedPackage } from '@skysmack/ng-framework';
import { Validators } from '@angular/forms';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { FieldsConfig, FieldProviders } from '@skysmack/ng-fields';
import { StringFieldComponent, HiddenFieldComponent } from '@skysmack/portal-fields';

@Injectable({ providedIn: 'root' })
export class NgTerminalsFieldsConfig extends FieldsConfig<Terminal, number> {
    public validation = new NgTerminalsValidation();
    public area = TERMINALS_AREA_KEY;
    public formRules: FormRule[] = [
    ];

    constructor(
        public fieldProviders: FieldProviders
    ) {
        super(fieldProviders);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<Terminal, number>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.name : undefined,
                key: 'name',
                validators: [Validators.required],
                order: 1,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.connectionString : undefined,
                key: 'connectionString',
                validators: [Validators.required],
                order: 2,
                showColumn: true,
                sortable: true
            }),
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.description : undefined,
                key: 'description',
                order: 3,
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
