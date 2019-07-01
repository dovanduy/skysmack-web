import { SubscriptionHandler } from '@skysmack/framework';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { Observable, merge } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';
import { take, map, filter } from 'rxjs/operators';
import { Field } from '@skysmack/ng-ui';
import { getAdditionalPaths, getPackageDendencyAsStream } from '@skysmack/ng-framework';
import { LoadedPackage } from '@skysmack/ng-framework';
import { EntityComponentPageTitle } from '../models/entity-component-page-title';

export class BaseComponent<TAppState, TKey> implements OnInit, OnDestroy {
    public subscriptionHandler = new SubscriptionHandler();
    public fields$: Observable<Field[]>;
    public entityId: TKey;
    public packagePath: string;
    public additionalPaths: string[] = [];
    public loadedPackage$: Observable<LoadedPackage>;

    public areaKey = '';

    public dependencyIndexes = [];
    public titleFallback = 'Skysmack';
    public titleExtras = false;


    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public skysmackStore: NgSkysmackStore,
        public title?: EntityComponentPageTitle
    ) { }

    ngOnInit() {
        // Used together with dynamic routing in fallback component.
        this.router.onSameUrlNavigation = 'ignore';
        this.setPackagePath();
        this.setAdditionalPaths();
        this.getParams();
        this.getCurrentPackage();
        this.setTitle();
    }

    ngOnDestroy() {
        this.subscriptionHandler.unsubscribe();
    }

    public redirect(path: string) {
        this.router.navigate([path]);
    }

    private getParams() {
        if (this.entityId === undefined) {
            if (this.activatedRoute) {
                this.subscriptionHandler.register(this.activatedRoute.params
                    .pipe(take(1))
                    .subscribe(params => {
                        if (params['id']) {
                            this.entityId = params['id'];
                        } else if (params['key']) {
                            // Fields have a "key" as id. Set to id if present.
                            this.entityId = params['key'];
                        }
                    })
                );
            }
        }
    }

    private getCurrentPackage() {
        this.loadedPackage$ = this.skysmackStore.getCurrentPackage(this.packagePath);
    }

    private setPackagePath() {
        this.packagePath = this.router.url.split('/')[1];
    }

    private setAdditionalPaths() {
        this.additionalPaths = getAdditionalPaths(this.router, this.packagePath);
    }

    private setTitle() {
        if (this.title) {
            let titleExtra;
            if (this.titleExtras) {
                titleExtra = `${this.areaKey.toUpperCase()}.INDEX.TITLE_EXTRAS`;
            }

            const isInstalledPackage$ = getPackageDendencyAsStream(this.skysmackStore, this.packagePath, this.dependencyIndexes).pipe(
                filter(_package => _package.object !== undefined && _package.object !== null),
                map(_package => this.title.setTitle(_package.object.name, titleExtra))
            );

            const fallback$ = this.loadedPackage$.pipe(
                filter(loadedPackage => loadedPackage._package === undefined || loadedPackage._package === null),
                map(() => this.title.setTitle(this.titleFallback, titleExtra))
            );

            merge(isInstalledPackage$, fallback$).pipe(take(1)).subscribe();
        }
    }
}
