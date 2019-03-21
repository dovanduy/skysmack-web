import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule } from '@skysmack/ng-ui';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { Terminal } from '@skysmack/packages-terminal-payments';
import { Field } from '@skysmack/ng-ui';
import { FieldTypes } from '@skysmack/ng-ui';
import { SelectField } from '@skysmack/ng-ui';
import { NgTerminalsValidation } from './ng-terminals-validation';
import { FieldsConfig } from '@skysmack/ng-ui';

export interface NgTerminalFormDependencies {

}

@Injectable({ providedIn: 'root' })
export class NgTerminalsFieldsConfig extends FieldsConfig<Terminal, number, NgTerminalFormDependencies> {
    public validation = new NgTerminalsValidation();

    public formRules: FormRule[] = [
    ];

    protected getEntityFields(entity?: LocalObject<Terminal, number>, dependencies?: NgTerminalFormDependencies): Field[] {
        const fields = [
            // new Field({
            //     fieldType: FieldTypes.string,
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
                fieldType: FieldTypes.HiddenField,
                value: entity ? entity.object.id : undefined,
                key: 'id',
                order: 0,
            }));
        }

        return fields;
    }
}
