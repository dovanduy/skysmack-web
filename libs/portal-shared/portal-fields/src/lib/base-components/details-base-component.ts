import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, OnDestroy, } from '@angular/core';
import { switchMap, tap, distinctUntilChanged } from 'rxjs/operators';
import { BaseComponent } from './base-component';
import { EntityFieldsConfig } from '@skysmack/ng-fields';;
import { EntityActions, EntityStore } from '@skysmack/redux';
import { EditorNavService, EntityComponentPageTitle } from '@skysmack/portal-ui';
import { LocalObject } from '@skysmack/framework';

export abstract class DetailsBaseComponent<TAppState, TKey> extends BaseComponent<TAppState, TKey> implements OnInit, OnDestroy {
    public entityId: TKey;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public skysmackStore: NgSkysmackStore,
        public actions: EntityActions<any, TKey>,
        public store: EntityStore<any, TKey>,
        public fieldsConfig: EntityFieldsConfig<any, TKey>,
        public editorNavService: EditorNavService,
        public title: EntityComponentPageTitle
    ) {
        super(router, activatedRoute, skysmackStore);
    }

    ngOnInit() {
        super.ngOnInit();
        this.entityId = this.activatedRoute.snapshot.paramMap.get('id') as unknown as TKey;
        this.actions.getSingle(this.packagePath, this.entityId);

        this.fields$ = combineLatest([
            this.loadedPackage$,
            this.store.getSingle(this.packagePath, this.entityId).pipe(
                distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)) // Prevents endless loop for some detail components. Loop first observed for LodgingsReservationsDetailsComponent
            )
        ]).pipe(
            switchMap(([loadedPackage, record]) => {
                this.title.setTitle(this.getTitle(record));
                return this.fieldsConfig.getFields(loadedPackage, record);
            })
        );
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    protected abstract getTitle(record: LocalObject<any, any>): string;
}
