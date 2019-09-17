import { Injectable } from '@angular/core';
import { LocalObject } from '@skysmack/framework';
import { FILE_STORAGE_AREA_KEY, FILE_STORAGE_ADDITIONAL_PATHS } from '@skysmack/packages-file-storage';

import { LoadedPackage } from '@skysmack/ng-framework';
import { FormRule, Field } from '@skysmack/ng-dynamic-forms';
import { FieldProviders, FieldsConfig } from '@skysmack/ng-fields';
import { MultiFileUploadFieldComponent } from './file-storage/fields/multi-file-upload-field/multi-file-upload-field.component';
import { NgFileStorageUploadValidation } from '@skysmack/ng-file-storage';

@Injectable({ providedIn: 'root' })
export class NgFileStorageUploadFieldsConfig extends FieldsConfig<any, number> {
    public validation = new NgFileStorageUploadValidation();
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
                component: MultiFileUploadFieldComponent,
                value: undefined,
                key: 'files',
                order: 1,
                showColumn: false,
                sortable: true
            })
        ];

        return fields;
    }
}
