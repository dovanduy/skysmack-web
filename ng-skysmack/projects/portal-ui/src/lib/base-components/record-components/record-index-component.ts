import { BaseComponent } from '../base-component';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityActions, EntityStore } from '@skysmack/redux';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { LocalObject, LocalPage, PagedQuery, LoadingState, linq, DisplayColumn, defined } from '@skysmack/framework';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { OnInit } from '@angular/core';
import { Record } from '@skysmack/framework';
import { map, switchMap } from 'rxjs/operators';
import { EntityFieldsConfig } from '../../fields/entity-fields-config';

export class RecordIndexComponent<TAppState, TRecord extends Record<TKey>, TKey> extends BaseComponent<TAppState, TKey> implements OnInit {
    public pages$: BehaviorSubject<LocalPage<TKey>[]> = new BehaviorSubject<LocalPage<TKey>[]>([]);
    public pagedEntities$: Observable<LocalObject<TRecord, TKey>[]>;
    public pagedQuery = new PagedQuery();

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
        public fieldsConfig: EntityFieldsConfig<any, TKey>
    ) {
        super(router, activatedRoute, skysmackStore);
    }

    ngOnInit() {
        super.ngOnInit();
        this.requestPage(true);
        this.loadPages();
        this.getPagedEntities();
        this.setFields();
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

    protected delete(value: LocalObject<TRecord, TKey>, _this: RecordIndexComponent<any, any, any>) {
        _this.actions.delete([value], _this.packagePath);
    }

    public actionEvent(event: { action: Function, value: LocalObject<TRecord, TKey>, _this: any }) {
        event.action(event.value, event._this);
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

                        // if (lastPage.ids && lastPage.ids !== null && lastPage.ids.length > 0) {
                        //     return Object.keys(pages).map(key => {
                        //         if (Number(key) > 0 && Number(key) <= lastPageKey) {
                        //             return pages[key];
                        //         }
                        //     });
                        // }
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
                    // const idsArray = linq<TKey>([]).selectMany(linq<LocalPage<TKey>>(pages)
                    //     .defined()
                    //     .select(x => x.ids))
                    //     .distinct()
                    //     .ok();

                    return entities
                        .filter(entity => entity.isNew && !pages.includes(entity.objectIdentifier))
                        .concat(entities.filter(entity => pages.includes(entity.objectIdentifier)));
                }
                // else if (entities) {
                //     console.log('normal entities');
                //     return entities.filter(entity => entity.isNew);
                // }
                // console.log('empty array');
                // return [];
            }),
            defined()
        );
    }
}
