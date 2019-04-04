import { Injectable } from '@angular/core';
import { FormRule } from '@skysmack/ng-ui';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { Terminal } from '@skysmack/packages-terminal-payments';
import { Field } from '@skysmack/ng-ui';
import { FieldsConfig, HiddenFieldComponent } from '@skysmack/portal-ui';
import { NgTerminalsValidation, LoadedPackage } from '@skysmack/ng-packages';

export interface NgTerminalFormDependencies {

}

@Injectable({ providedIn: 'root' })
export class NgTerminalsFieldsConfig extends FieldsConfig<Terminal, number, NgTerminalFormDependencies> {
    public validation = new NgTerminalsValidation();

    public formRules: FormRule[] = [
    ];

    protected getEntityFields(entity?: LocalObject<Terminal, number>, dependencies?: NgTerminalFormDependencies, loadedPackage?: LoadedPackage): Field[] {
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
