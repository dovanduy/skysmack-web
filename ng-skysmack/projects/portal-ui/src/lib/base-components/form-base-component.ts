import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from './base-component';
import { LocalObject, Record, toLocalObject, LocalObjectStatus, PagedQuery } from '@skysmack/framework';
import { FieldsConfig } from '@skysmack/ng-ui';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { FormHelper } from '@skysmack/ng-ui';
import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { EditorNavService } from './../components/common/container/editor-nav.service';

export class FormBaseComponent<TAppState, TRecord extends Record<TKey>, TKey, TDependencies> extends BaseComponent<TAppState, TKey> {
    /**
     * The selected entity needed for edit forms.
     */
    public selectedEntity: LocalObject<TRecord, TKey>;
    public pagedQuery: PagedQuery = new PagedQuery();

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public editorNavService: EditorNavService,
        public actions: RecordActionsBase<TAppState, NgRedux<TAppState>>,
        public redux: NgSkysmackStore,
        public fieldsConfig: FieldsConfig<TRecord, TKey, TDependencies>,
    ) {
        super(router, activatedRoute, redux);
    }

    /**
     * Recieves a submitted form helper, formats the data, and either creates or updates an entity.
     * @param fh Form helper with submitted values.
     * @param entity Optional entity that will be updated with the values extraced from the form. Otherwise a new entity is created.
     */
    protected extractFormValues(fh: FormHelper, entity?: LocalObject<TRecord, TKey>): LocalObject<TRecord, TKey> {
        const formValues = fh.form.getRawValue();

        // Remove empty values
        Object.keys(formValues).forEach(key => {
            // || formValues[key] === null || formValues[key] === 'null'
            if (formValues[key] === 'undefined' || formValues[key] === undefined) {
                delete formValues[key];
            }
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
                'id',
                undefined,
                LocalObjectStatus.CREATING,
                undefined,
                true
            );
        }
    }
}
