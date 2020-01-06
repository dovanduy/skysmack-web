import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, OnDestroy, Optional, Inject } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { BaseComponent } from './base-component';
import { EntityFieldsConfig } from '@skysmack/ng-fields';;
import { EntityActions, EntityStore } from '@skysmack/redux';
import { EditorNavService } from '@skysmack/portal-ui';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export class DetailsBaseComponent<TAppState, TKey> extends BaseComponent<TAppState, TKey> implements OnInit, OnDestroy {
    public entityId: TKey;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public skysmackStore: NgSkysmackStore,
        public actions: EntityActions<any, TKey>,
        public store: EntityStore<any, TKey>,
        public fieldsConfig: EntityFieldsConfig<any, TKey>,
        public editorNavService: EditorNavService,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: { entityId: TKey },
    ) {
        super(router, activatedRoute, skysmackStore);
    }

    ngOnInit() {
        super.ngOnInit();
        this.entityId = this.data.entityId
        this.actions.getSingle(this.packagePath, this.entityId);

        this.fields$ = combineLatest([
            this.loadedPackage$,
            this.store.getSingle(this.packagePath, this.entityId)
        ]).pipe(switchMap(([loadedPackage, record]) => this.fieldsConfig.getFields(loadedPackage, record)));
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

}
