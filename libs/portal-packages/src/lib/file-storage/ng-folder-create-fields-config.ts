import { Injectable } from '@angular/core';
import { LocalObject } from '@skysmack/framework';
import { FILE_STORAGE_AREA_KEY, FILE_STORAGE_ADDITIONAL_PATHS } from '@skysmack/packages-file-storage';

import { LoadedPackage } from '@skysmack/ng-framework';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { FieldProviders, FieldsConfig } from '@skysmack/ng-fields';
import { FolderCreateFieldComponent } from './file-storage/fields/folder-create-field/folder-create-field.component';
import { NgFolderCreateValidation } from '@skysmack/ng-file-storage';
import { Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class NgFolderCreateFieldsConfig extends FieldsConfig<any, number> {
    public validation = new NgFolderCreateValidation();
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
                component: FolderCreateFieldComponent,
                value: undefined,
                validators: [Validators.required],
                key: 'files',
                order: 1,
                showColumn: false
            })
        ];

        return fields;
    }
}
