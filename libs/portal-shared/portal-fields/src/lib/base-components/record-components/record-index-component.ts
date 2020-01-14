import { BaseComponent } from '../base-component';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityActions, EntityStore } from '@skysmack/redux';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { LocalObject, LocalPage, PagedQuery, LoadingState, linq, DisplayColumn, defined, MenuItem, SubscriptionHandler } from '@skysmack/framework';
import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs';
import { OnInit } from '@angular/core';
import { Record } from '@skysmack/framework';
import { map, switchMap, distinctUntilChanged, delay, tap } from 'rxjs/operators';
import { EntityFieldsConfig } from '@skysmack/ng-fields';
import { EntityComponentPageTitle } from '@skysmack/portal-ui';
import { MenuItemActionProviders } from '@skysmack/portal-ui';
import { NgFieldActions } from '@skysmack/ng-framework';

export class RecordIndexComponent<TAppState, TRecord extends Record<TKey>, TKey> extends BaseComponent<TAppState, TKey> implements OnInit {
    public pages$: BehaviorSubject<LocalPage<TKey>[]> = new BehaviorSubject<LocalPage<TKey>[]>([]);
    public pagedEntities$: Observable<LocalObject<TRecord, TKey>[]>;
    public pagedQuery = new PagedQuery();
    public menuItemActions$ = new BehaviorSubject<MenuItem[]>([]);
    public menuItemActions: MenuItem[];
    protected subscriptionHandler = new SubscriptionHandler();

    public nextPageNumber = 1;
    public nextPageSize = this.pagedQuery.pageSize;

    public loadingState: LoadingState = LoadingState.Loading;
    public loadingState$: BehaviorSubject<LoadingState> = new BehaviorSubject(LoadingState.Loading);

    public currentPageNumber = 1;
    public totalCount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public totalCount = 0;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public actions: EntityActions<any, TKey>,
        public skysmackStore: NgSkysmackStore,
        public store: EntityStore<any, TKey>,
        public fieldsConfig: EntityFieldsConfig<any, TKey>,
        public menuItemActionProviders: MenuItemActionProviders,
        public title?: EntityComponentPageTitle,
    ) {
        super(router, activatedRoute, skysmackStore, title);
    }

    ngOnInit() {
        super.ngOnInit();
        this.requestPage(true);
        this.loadPages();
        this.getPagedEntities();
        this.setFields();
        this.setEntityActions();
    }

    ngOnDestroy() {
        this.subscriptionHandler.unsubscribe();
    }

    protected actionsGetPaged() {
        this.actions.getPaged(this.packagePath, this.pagedQuery);
    }

    protected storeGet() {
        return this.store.get(this.packagePath);
    }

    protected storeGetPages() {
        return this.store.getPages(this.packagePath);
    }

    protected setFields() {
        this.fields$ = this.loadedPackage$.pipe(
            switchMap(loadedPackage => this.fieldsConfig.getFields(loadedPackage)),
        );
    }

    protected delete(_this: RecordIndexComponent<any, any, any>, value: LocalObject<TRecord, TKey>) {
        _this.actions.delete([value], _this.packagePath);
    }

    public actionEvent(event: { action: Function, _this: any, value?: LocalObject<TRecord, TKey> }) {
        event.action(event._this, event.value);
    }

    public requestPage(force = false) {
        if (force || (this.loadingState === LoadingState.OK || this.loadingState === LoadingState.Awaiting)) {
            this.loadingState = LoadingState.Loading;
            this.loadingState$.next(LoadingState.Loading);

            this.currentPageNumber = this.nextPageNumber;
            this.pagedQuery.pageNumber = this.nextPageNumber;
            this.pagedQuery.pageSize = this.nextPageSize;
            this.actionsGetPaged();
        }
    }

    public sortChanged(displayColumn: DisplayColumn) {
        this.pagedQuery.sort.remove(displayColumn.fieldKey);
        this.nextPageNumber = 1;
        this.currentPageNumber = 1;
        if (displayColumn.sortOrder !== undefined) {
            this.pagedQuery.sort.add(displayColumn.fieldKey, displayColumn.sortOrder);
        }
        this.requestPage(true);
    }

    private loadPages() {
        return this.storeGetPages().pipe(
            delay(0),
            map((dictionary) => {
                // Part 1: Get current page
                const query = this.pagedQuery.rsqlFilter.toList().build();
                const queryDictionary = dictionary[query];
                if (queryDictionary) {
                    const sort = this.pagedQuery.sort.build();
                    const pages = queryDictionary.pages[this.pagedQuery.pageSize + ':' + sort];
                    const lastPageKey = this.currentPageNumber;
                    const lastPage: LocalPage<TKey> = pages[lastPageKey];

                    if (lastPage) {
                        // Part 2: Load next page
                        if (queryDictionary && queryDictionary.totalCount && this.totalCount !== queryDictionary.totalCount) {
                            this.totalCount = queryDictionary.totalCount;
                            this.totalCount$.next(queryDictionary.totalCount);
                        }
                        const lastPageLinks = lastPage.links;

                        if ((lastPageLinks && lastPageLinks.next)) {
                            this.loadingState = LoadingState.Awaiting;
                            this.loadingState$.next(LoadingState.Awaiting);

                            this.nextPageNumber = lastPageLinks.next.pageNumber;
                            this.nextPageSize = lastPageLinks.next.pageSize;
                        } else if (lastPage.loadingState === LoadingState.OK) {
                            this.loadingState = LoadingState.End;
                            this.loadingState$.next(LoadingState.End);
                        }
                    }

                    const pages2 = Object.keys(pages).map(key => {
                        if (Number(key) > 0 && Number(key) <= lastPageKey) {
                            return pages[key];
                        }
                    });
                    return linq<TKey>([]).selectMany(linq<LocalPage<TKey>>(pages2)
                        .defined()
                        .select(x => x.ids))
                        .distinct()
                        .ok();
                }
            })
        );
    }

    /**
     * Shows all entities from the entities$ stream, if the their id is part of one of the loaded pages.
     */
    private getPagedEntities() {
        this.pagedEntities$ = combineLatest(
            this.loadPages(),
            this.storeGet()
        ).pipe(
            map(values => {
                const [pages, entities] = values;
                if (pages && entities) {
                    return [
                        ...entities.filter(entity => entity.isNew && !pages.includes(entity.objectIdentifier)),
                        ...linq(pages)
                            .defined()
                            .distinct()
                            .select(entityId => entities.filter(entity => entity.objectIdentifier === entityId)[0])
                            .defined()
                            .ok()
                    ];
                }
            }),
            defined()
        );
    }

    public setEntityActions(): void {
        this.subscriptionHandler.register(this.loadedPackage$.pipe(
            switchMap(loadedPackage => this.menuItemActionProviders.providers$.pipe(
                switchMap(providers => {
                    const extractedProviders = providers[loadedPackage && loadedPackage.packageManifest && loadedPackage.packageManifest.id];
                    if (extractedProviders && extractedProviders.length > 0) {
                        return combineLatest(
                            extractedProviders.map(provider => {
                                return provider.getMenuItemActions(loadedPackage._package.path, this.areaKey);
                            })
                        ).pipe(
                            distinctUntilChanged(),
                            map((values: [MenuItem[]]) => {
                                return values.reduce((acc: MenuItem[], cur: MenuItem[]) => acc.concat(cur), []).concat(this.menuItemActions);
                            })
                        );
                    } else {
                        return of(this.menuItemActions);
                    }
                })
            )),
            map(x => this.menuItemActions$.next(x))
        ).subscribe());
    }

    public refresh(): void {
        for (let index = 1; index <= this.currentPageNumber; index++) {
            this.pagedQuery.pageNumber = index;
            this.subscriptionHandler.register(this.activatedRoute.data.pipe(
                tap((data: { areaKey: string, additionalPaths: string[] }) => {
                    if (!this.packagePath) {
                        this.packagePath = this.router.url.split('/')[1];
                    }

                    if (this.actions instanceof NgFieldActions) {
                        this.actions.getPaged(this.packagePath, this.pagedQuery, data.additionalPaths);
                    } else {
                        this.actions.getPaged(this.packagePath, this.pagedQuery);
                    }
                })
            ).subscribe());
        }
    }
}
