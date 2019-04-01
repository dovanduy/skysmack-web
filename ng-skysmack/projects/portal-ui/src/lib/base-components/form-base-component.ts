import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from './base-component';
import { LocalObject, Record, toLocalObject, LocalObjectStatus, PagedQuery, StrIndex } from '@skysmack/framework';
import { EntityFieldsConfig } from '@skysmack/ng-ui';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { FormHelper } from '@skysmack/ng-ui';
import { EntityActions } from '@skysmack/redux';
import { EditorNavService } from './../components/common/container/editor-nav.service';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';

export class FormBaseComponent<TAppState, TRecord extends Record<TKey>, TKey, TDependencies> extends BaseComponent<TAppState, TKey> {
    /**
     * The selected entity needed for edit forms.
     */
    public selectedEntity: LocalObject<TRecord, TKey>;
    public pagedQuery: PagedQuery = new PagedQuery();
    public objectIdentifier = 'id';

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public editorNavService: EditorNavService,
        public actions: EntityActions<any, TKey>,
        public skysmackStore: NgSkysmackStore,
        public fieldsConfig: EntityFieldsConfig<any, TKey, TDependencies>,
    ) {
        super(router, activatedRoute, skysmackStore);
    }

    /**
     * Recieves a submitted form helper, formats the data, and either creates or updates an entity.
     * @param fh Form helper with submitted values.
     * @param entity Optional entity that will be updated with the values extraced from the form. Otherwise a new entity is created.
     */
    protected extractFormValues(fh: FormHelper, entity?: LocalObject<TRecord, TKey>): LocalObject<TRecord, TKey> {
        const formValues = fh.form.getRawValue();

        Object.keys(formValues).forEach(key => {
            // Remove empty values
            if (formValues[key] === 'undefined' || formValues[key] === undefined) {
                delete formValues[key];
            }
            this.formatExtendedData(key, formValues);
        });


        if (entity) {
            // Update existing entity
            entity.object = formValues;
            entity.status = LocalObjectStatus.MODIFYING;
            return entity;
        } else {
            // Create new entity
            return toLocalObject<TRecord, TKey>(
                formValues,
                this.objectIdentifier,
                undefined,
                LocalObjectStatus.CREATING,
                undefined,
                true
            );
        }
    }

    private formatExtendedData(key: string, formValues: any): void {
        // Format extended data
        const extendedDataKeyParts = key.split('.');
        const packagePath = extendedDataKeyParts[1];
        const keyProp = extendedDataKeyParts[2];
        const extendedData = formValues[key];

        // If packagePath is defined, we have some extended data.
        if (packagePath) {

            // Set the extendedData prop if it hasn't been created yet.
            if (!formValues['extendedData']) {
                formValues['extendedData'] = {};
            }

            const formExtendedData = formValues['extendedData'];

            if (!formExtendedData[packagePath]) {
                // We havent set any data yet for this package. Create its dictionary.
                formExtendedData[packagePath] = {};
                // Set data for the current field
                formExtendedData[packagePath][keyProp] = extendedData;
            } else {
                // Extented data for package already exists. Set data for the current field
                formExtendedData[packagePath][keyProp] = extendedData;
            }

            // Deleted the individual, dot notated extended data, as it is no longer needed,
            // and shouldn't be posted to the backend
            delete formValues[key];

            // TEMP
            if (formExtendedData[packagePath][keyProp]) {
                formExtendedData[packagePath][keyProp] = formExtendedData[packagePath][keyProp].split(',').map(x => Number(x));
            }
        }
    }
}
