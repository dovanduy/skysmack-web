import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { combineLatest } from 'rxjs';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';
import { switchMap, map, take } from 'rxjs/operators';
import { BaseComponent } from './base-component';
import { EntityFieldsConfig } from '../fields';
import { EntityActions, EntityStore } from '@skysmack/redux';
import { EditorNavService } from '../components/common/container/editor-nav.service';

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
        this.setSidebarCloseUrl();
        super.ngOnInit();
        this.editorNavService.showEditorNav();
        this.actions.getSingle(this.packagePath, this.entityId);

        this.fields$ = combineLatest(
            this.loadedPackage$,
            this.store.getSingle(this.packagePath, this.entityId)
        ).pipe(switchMap(([loadedPackage, record]) => this.fieldsConfig.getFields(loadedPackage, record)));
    }

    protected setSidebarCloseUrl() {
        this.activatedRoute.url.pipe(
            map((pathSegments: UrlSegment[]) => {
                const nonEmptyPathSegments = pathSegments.filter(x => x.path.length > 0).map(x => x.path);
                if (nonEmptyPathSegments.length > 0) {
                    this.editorNavService.redirectPath = this.router.url.substring(0, this.router.url.length - nonEmptyPathSegments.join('/').length - 1);
                } else {
                    this.editorNavService.redirectPath = '';
                }
            }),
            take(1)
        ).subscribe();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.editorNavService.hideEditorNav();
    }

}
