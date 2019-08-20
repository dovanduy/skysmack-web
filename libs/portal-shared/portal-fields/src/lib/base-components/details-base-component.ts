import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { BaseComponent } from './base-component';
import { EntityFieldsConfig } from '@skysmack/ng-fields';;
import { EntityActions, EntityStore } from '@skysmack/redux';
import { EditorNavService } from '@skysmack/portal-ui';

export class DetailsBaseComponent<TAppState, TKey> extends BaseComponent<TAppState, TKey> implements OnInit, OnDestroy {

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public skysmackStore: NgSkysmackStore,
        public actions: EntityActions<any, TKey>,
        public store: EntityStore<any, TKey>,
        public fieldsConfig: EntityFieldsConfig<any, TKey>,
        public editorNavService: EditorNavService
    ) {
        super(router, activatedRoute, skysmackStore);
    }

    ngOnInit() {
        super.ngOnInit();
        // this.editorNavService.showEditorNav();
        this.actions.getSingle(this.packagePath, this.entityId);

        this.fields$ = combineLatest(
            this.loadedPackage$,
            this.store.getSingle(this.packagePath, this.entityId)
        ).pipe(switchMap(([loadedPackage, record]) => this.fieldsConfig.getFields(loadedPackage, this.additionalPaths, record)));
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

}
