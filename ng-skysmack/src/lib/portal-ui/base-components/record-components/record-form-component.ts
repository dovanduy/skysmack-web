import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';
import { Record } from '@skysmack/framework';
import { FieldsConfig } from 'lib/portal-ui/fields/fields-config';
import { EditorNavService } from 'lib/portal-ui/components/common/container/editor-nav.service';
import { FormBaseComponent } from '../form-base-component';
import { NgSkysmackRedux } from 'lib/ng-packages/skysmack';
import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { FormHelper } from 'lib/portal-ui/forms/form-helper';

export class RecordFormComponent<TAppState, TRecord extends Record<TKey>, TKey> extends FormBaseComponent<TAppState, TRecord, TKey> implements OnInit, OnDestroy {

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public editorNavService: EditorNavService,
        public actions: RecordActionsBase<TAppState, NgRedux<TAppState>>,
        public redux: NgSkysmackRedux,
        public fieldsConfig: FieldsConfig<TRecord>
    ) {
        super(router, activatedRoute, editorNavService, actions, redux, fieldsConfig);
    }

    ngOnInit() {
        super.ngOnInit();
        this.getRecordFields();
        this.editorNavService.showEditorNav();
    }

    ngOnDestroy() {
        this.editorNavService.hideEditorNav();
        super.ngOnDestroy();
    }

    public getRecordFields() {
        this.fields = this.getFields();
    }

    //#region temp
    /**
     * Inits the edit form for packages e.g. persons, lodgings, etc.
     */
    public initPackageEditForm() {
        // this.subscriptionHandler.subscribe(
        //     combineLatest(
        //         this.redux.get(this.path, this.entityId),
        //         this.redux.fields(this.path)
        //     ).pipe(
        //         map(values => {
        //             const entity = values[0];
        //             const dynamicFields = values[1];

        //             this.selectedEntity = entity;
        //             return this.getFields(entity, dynamicFields);
        //         })
        //     ).subscribe((fields: Field[]) => this.fields = fields));
    }

    /**
     * Recieves the submitted form helper from package create forms.
     * @param fh The form helper with data needed to create the entity
     */
    public onPackageCreateSubmit(fh: FormHelper) {
        this.create();
    }

    /**
     * Recieves the submitted form helper from package edit forms.
     * @param fh The form helper with with data needed to update the entity
     */
    public onPackageUpdateSubmit(fh: FormHelper) {
        this.update();
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
        // this.subscriptionHandler.subscribe(this.redux.get(this.redux.config.area.key, this.entityId).pipe(
        //     map(entity => {
        //         this.selectedEntity = entity;
        //         return this.getFields(entity);
        //     })
        // ).subscribe(fields => this.fields = fields));
    }

    /**
     * Recieves the submitted form helper from module create forms.
     * @param fh The form helper with data needed to create the entity
     */
    public onModuleCreateSubmit() {
        // this.create(fh, this.redux.config.area.key, this.redux.config.area.key);
    }

    /**
     * Recieves the submitted form helper from module create forms.
     * @param fh The form helper with data needed to create the entity
     */
    public onModuleEditSubmit() {
        // this.update(fh, this.redux.config.area.key, this.redux.config.area.key);
    }

    /**
     * Creates an entity
     * @param fh The form helper with the form with the data needed to create the object.
     * @param identity Path if package e.g. "customers", areaKey if module e.g. "ROLES_KEY"
     * @param redirectTo Where to redirect on success.
     * @param autoReset Should the form reset after post? Defaults to true.
     * @param postAsArray Should the data be wrapped in a array before getting posted? Defaults to true.
     */
    protected create() {
        // this.validateForm(fh, () => {
        //     this.redux.add(this.extractFormValues(fh), identity, postAsArray);
        //     this.editorNavService.hideEditorNav();
        // }, autoReset);
    }

    /**
     * Updates an entity
     * @param fh The form helper with the form with the data needed to create the object.
     * @param identity Path if package e.g. "customers", areaKey if module e.g. "ROLES_KEY"
     * @param redirectTo Where to redirect on success.
     * @param autoReset Should the form reset after post? Defaults to true.
     */
    protected update() {
        // this.validateForm(fh, () => {
        //     const oldValue = { ...this.selectedEntity };
        //     const newValue = this.extractFormValues(fh, this.selectedEntity);
        //     newValue.oldValue = oldValue.object;
        //     this.redux.update(newValue, identity);
        //     this.editorNavService.hideEditorNav();
        // }, autoReset);
    }
    //#endregion
}
