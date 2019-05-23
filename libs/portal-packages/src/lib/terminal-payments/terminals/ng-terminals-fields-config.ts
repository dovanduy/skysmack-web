import { Injectable } from '@angular/core';
import { FormRule } from '@skysmack/ng-ui';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { Terminal, TERMINALS_AREA_KEY } from '@skysmack/packages-terminal-payments';
import { Field } from '@skysmack/ng-ui';
import { FieldsConfig, HiddenFieldComponent } from '@skysmack/portal-ui';
import { NgTerminalsValidation } from '@skysmack/ng-packages';
import { FieldProviders } from '@skysmack/portal-ui';
import { LoadedPackage } from '@skysmack/ng-framework';

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
            // new Field({
            //     component: StringFieldComponent,
            //     value: entity ? entity.object.name : undefined,
            //     key: 'name',
            //     validators: [Validators.required],
            //     order: 1,
            //     showColumn: true
            // })
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
