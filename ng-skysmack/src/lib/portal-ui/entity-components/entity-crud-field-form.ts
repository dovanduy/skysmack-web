import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { OnDestroy, OnInit } from '@angular/core';
import { EntityFormBase } from './entity-form-base';
import { EditorNavService } from '../components/common/container/editor-nav.service';
import { FieldsConfig } from '../fields/fields-config';
import { FormHelper } from '../forms/form-helper';
import { DocumentFieldsConfig } from '../fields/document-fields-config';
import { FieldValueProviderViewModel } from '../fields';
import { LocalObject } from '@skysmack/framework';

export class EntityCrudFieldForm extends EntityFormBase implements OnInit, OnDestroy {

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public editorNavService: EditorNavService,
        public redux: any, // Was BaseRedux
        public fieldsConfig: FieldsConfig,
    ) {
        super(router, activatedRoute, redux, fieldsConfig);
    }

    ngOnInit() {
        super.ngOnInit();
        this.editorNavService.showEditorNav();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.editorNavService.hideEditorNav();
    }

    /**
     * Initiates the create form for dynamic fields.
     */
    public initCreateForm() {
        this.subscriptionHandler.subscribe(this.redux.availableFields(this.path).pipe(
            map((availableFields: LocalObject<FieldValueProviderViewModel>[]) => (this.fieldsConfig as DocumentFieldsConfig).getDynamicFields(availableFields))
        ).subscribe(fields => this.fields = fields));
    }

    /**
     * Initiates the update form for dynamic fields.
     */
    public initEditForm() {
        this.subscriptionHandler.subscribe(combineLatest(
            this.redux.fields(this.path, this.entityId),
            this.redux.availableFields(this.path),
        ).pipe(
            map(values => {
                const field = values[0];
                const availableFields = values[1];

                this.selectedEntity = field;
                return (this.fieldsConfig as DocumentFieldsConfig).getDynamicFields(availableFields, field);
            }),
        ).subscribe(fields => this.fields = fields));
    }

    /**
     * Recieves the submitted form helper helper from package dynamic fields create forms.
     * @param fh The form helper with data needed to create the entity
     */
    public onCreateSubmit(fh: FormHelper) {
        this.createField(fh, this.path, this.path + '/fields');
    }

    /**
     * Recieves the submitted form helper helper from package dynamic fields edit forms.
     * @param fh The form helper with with data needed to update the entity
     */
    public onUpdateSubmit(fh: FormHelper) {
        this.updateField(fh, this.path + '/fields');
    }

    /**
     * Creates a field
     * @param fh The form helper with the form with the data needed to create the object.
     * @param identity Path if package e.g. "customers", areaKey if module e.g. "ROLES_KEY"
     * @param redirectTo Where to redirect on success.
     * @param autoReset Should the form reset after post? Defaults to true.
     */
    protected createField(fh: FormHelper, identity: string, redirectTo: string, autoReset: boolean = true) {
        this.validateForm(fh, () => {
            this.redux.addField(this.extractFormValues(fh), identity);
            this.editorNavService.hideEditorNav();
        }, autoReset);
    }

    /**
     * Updates a field
     * @param fh The form helper with the form with the data needed to create the object.
     * @param identity Path if package e.g. "customers", areaKey if module e.g. "ROLES_KEY"
     * @param redirectTo Where to redirect on success.
     * @param autoReset Should the form reset after post? Defaults to true.
     */
    protected updateField(fh: FormHelper, redirectTo: string, autoReset: boolean = true) {
        this.validateForm(fh, () => {
            const oldValue = { ...this.selectedEntity };
            const newValue = this.extractFormValues(fh, this.selectedEntity);
            newValue.oldObject = oldValue.object;
            this.redux.updateField(newValue, this.path);
            this.editorNavService.hideEditorNav();
        }, autoReset);
    }
}
