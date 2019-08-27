import { Injectable } from '@angular/core';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { FILE_STORAGE_AREA_KEY, FILE_STORAGE_ADDITIONAL_PATHS } from '@skysmack/packages-file-storage';

import { NgFileStorageValidation } from '@skysmack/ng-file-storage';
import { LoadedPackage } from '@skysmack/ng-framework';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { HiddenFieldComponent, StringFieldComponent } from '@skysmack/portal-fields';
import { FieldProviders, FieldsConfig } from '@skysmack/ng-fields';
import { Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class NgFileStorageFieldsConfig extends FieldsConfig<any, number> {
    public validation = new NgFileStorageValidation();
    public area = FILE_STORAGE_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders
    ) {
        super(fieldProviders, FILE_STORAGE_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<any, number>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.name : undefined,
                key: 'name',
                validators: [Validators.required],
                order: 1,
                showColumn: false,
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
