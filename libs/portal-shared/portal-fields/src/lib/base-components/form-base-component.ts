import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from './base-component';
import { LocalObject, Record, toLocalObject, LocalObjectStatus, PagedQuery } from '@skysmack/framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { FormHelper } from '@skysmack/ng-dynamic-forms';
import { EntityActions } from '@skysmack/redux';
import { EditorNavService } from '@skysmack/portal-ui';
import { EntityFieldsConfig } from '@skysmack/ng-fields';

export class FormBaseComponent<TAppState, TRecord extends Record<TKey>, TKey> extends BaseComponent<TAppState, TKey> {
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
        public fieldsConfig: EntityFieldsConfig<any, TKey>,
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

    protected formatExtendedData(key: string, formValues: any): void {
        // Format extended data
        const extendedDataKey = 'extendedData';
        const extendedDataKeyParts = key.split('__');
        if (extendedDataKeyParts[0] === extendedDataKey) {
            const packagePathAndKey = extendedDataKeyParts[1];
            const extendedData = formValues[key];

            // If packagePath is defined, we have some extended data.
            if (packagePathAndKey) {

                // Set the extendedData prop if it hasn't been created yet.
                if (!formValues[extendedDataKey]) {
                    formValues[extendedDataKey] = {};
                }

                const formExtendedData = formValues[extendedDataKey];

                if (!formExtendedData[packagePathAndKey]) {
                    // We havent set any data yet for this package. Create its dictionary.
                    formExtendedData[packagePathAndKey] = {};
                }

                // Set data for the current field
                formExtendedData[packagePathAndKey] = extendedData;

                // Delete the individual, dot notated extended data, as it is no longer needed,
                // and shouldn't be posted to the backend
                delete formValues[key];
            }
        }
    }
}
