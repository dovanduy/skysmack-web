import { FormHelper } from 'framework/forms/form-helper';
import { combineLatest } from 'rxjs';
import { Field } from 'framework/fields/field';
import { map } from 'rxjs/operators';
import { EntityFormBase } from 'framework/entity-components/entity-form-base';
import { EditorNavService } from 'ui';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseRedux } from 'framework/redux/base-redux';
import { FieldsConfig } from 'framework/models/fields-config';
import { OnInit, OnDestroy } from '@angular/core';

export class EntityCrudForm extends EntityFormBase implements OnInit, OnDestroy {

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public editorNavService: EditorNavService,
        public redux: BaseRedux,
        public fieldsConfig: FieldsConfig
    ) {
        super(router, activatedRoute, redux, fieldsConfig);
    }

    ngOnInit() {
        super.ngOnInit();
        this.editorNavService.showEditorNav();
    }

    ngOnDestroy() {
        this.editorNavService.hideEditorNav();
        super.ngOnDestroy();
    }

    /**
     * Inits the create form for packages e.g. persons, lodgings, etc.
     */
    public initPackageCreateForm() {
        this.subscriptionHandler.subscribe(this.redux.fields(this.path).pipe(
            map(dynamicFields => this.getFields(undefined, dynamicFields))
        ).subscribe(fields => this.fields = fields));
    }

    /**
     * Inits the edit form for packages e.g. persons, lodgings, etc.
     */
    public initPackageEditForm() {
        this.subscriptionHandler.subscribe(
            combineLatest(
                this.redux.get(this.path, this.entityId),
                this.redux.fields(this.path)
            ).pipe(
                map(values => {
                    const entity = values[0];
                    const dynamicFields = values[1];

                    this.selectedEntity = entity;
                    return this.getFields(entity, dynamicFields);
                })
            ).subscribe((fields: Field[]) => this.fields = fields));
    }

    /**
     * Recieves the submitted form helper from package create forms.
     * @param fh The form helper with data needed to create the entity
     */
    public onPackageCreateSubmit(fh: FormHelper) {
        this.create(fh, this.path, this.path);
    }

    /**
     * Recieves the submitted form helper from package edit forms.
     * @param fh The form helper with with data needed to update the entity
     */
    public onPackageUpdateSubmit(fh: FormHelper) {
        this.update(fh, this.path, this.path);
    }


    /**
     * Inits the create form for modules e.g. roles, users, etc.
     */
    public initModuleCreateForm() {
        this.fields = this.getFields();
    }

    /**
     * Inits the edit form for modules e.g. roles, users, etc.
     */
    public initModuleEditForm() {
        this.subscriptionHandler.subscribe(this.redux.get(this.redux.config.area.key, this.entityId).pipe(
            map(entity => {
                this.selectedEntity = entity;
                return this.getFields(entity);
            })
        ).subscribe(fields => this.fields = fields));
    }

    /**
     * Recieves the submitted form helper from module create forms.
     * @param fh The form helper with data needed to create the entity
     */
    public onModuleCreateSubmit(fh: FormHelper) {
        this.create(fh, this.redux.config.area.key, this.redux.config.area.key);
    }

    /**
     * Recieves the submitted form helper from module create forms.
     * @param fh The form helper with data needed to create the entity
     */
    public onModuleEditSubmit(fh: FormHelper) {
        this.update(fh, this.redux.config.area.key, this.redux.config.area.key);
    }

    /**
     * Creates an entity
     * @param fh The form helper with the form with the data needed to create the object.
     * @param identity Path if package e.g. "customers", areaKey if module e.g. "ROLES_KEY"
     * @param redirectTo Where to redirect on success.
     * @param autoReset Should the form reset after post? Defaults to true.
     * @param postAsArray Should the data be wrapped in a array before getting posted? Defaults to true.
     */
    protected create(fh: FormHelper, identity: string, redirectTo: string, autoReset: boolean = true, postAsArray: boolean = true) {
        this.validateForm(fh, () => {
            this.redux.add(this.extractFormValues(fh), identity, postAsArray);
            this.editorNavService.hideEditorNav();
        }, autoReset);
    }

    /**
     * Updates an entity
     * @param fh The form helper with the form with the data needed to create the object.
     * @param identity Path if package e.g. "customers", areaKey if module e.g. "ROLES_KEY"
     * @param redirectTo Where to redirect on success.
     * @param autoReset Should the form reset after post? Defaults to true.
     */
    protected update(fh: FormHelper, identity: string, redirectTo: string, autoReset: boolean = true) {
        this.validateForm(fh, () => {
            const oldValue = { ...this.selectedEntity };
            const newValue = this.extractFormValues(fh, this.selectedEntity);
            newValue.oldValue = oldValue.object;
            this.redux.update(newValue, identity);
            this.editorNavService.hideEditorNav();
        }, autoReset);
    }
}
