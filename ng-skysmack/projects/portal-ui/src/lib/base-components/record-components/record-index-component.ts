import { BaseComponent } from '../base-component';
import { Router, ActivatedRoute } from '@angular/router';
import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { LocalObject, LocalPage, PagedQuery, LoadingState, hasValue, StrIndex, LocalPageTypes, linq, DisplayColumn } from '@skysmack/framework';
import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs';
import { NgRecordReduxStore } from '@skysmack/ng-redux';
import { OnInit } from '@angular/core';
import { Record } from '@skysmack/framework';
import { map } from 'rxjs/operators';
import { FieldsConfig } from '@skysmack/ng-ui';

export class RecordIndexComponent<TAppState, TRecord extends Record<TKey>, TKey> extends BaseComponent<TAppState, TKey> implements OnInit {
    public entities$: Observable<LocalObject<TRecord, TKey>[]>;
    public pages$: BehaviorSubject<LocalPage<TKey>[]> = new BehaviorSubject<LocalPage<TKey>[]>([]);
    public pagedEntities$: Observable<LocalObject<TRecord, TKey>[]>;
    public pagedQuery = new PagedQuery();

    public nextPageNumber = 1;
    public nextPageSize = this.pagedQuery.pageSize;

    public loadingState: LoadingState = LoadingState.Loading;

    public currentPageNumber = 1;
    public totalCount: number;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public actions: RecordActionsBase<TAppState, NgRedux<TAppState>>,
        public skysmackStore: NgSkysmackStore,
        public store: NgRecordReduxStore<TAppState, TRecord, TKey>,
        public fieldsConfig: FieldsConfig<TRecord, TKey, any>
    ) {
        super(router, activatedRoute, skysmackStore);
    }

    ngOnInit() {
        super.ngOnInit();
        this.getEntities();
        this.requestPage(true);
        this.loadPages();
        this.getPagedEntities();
        this.setFields();
    }

    public actionEvent(event: { action: Function, value: LocalObject<TRecord, TKey>, _this: any }) {
        event.action(event.value, event._this);
    }

    public requestPage(force = false) {
        if (force || (this.loadingState === LoadingState.OK || this.loadingState === LoadingState.Awaiting)) {
            this.loadingState = LoadingState.Loading;

            this.pagedQuery.pageNumber = this.nextPageNumber;
            this.pagedQuery.pageSize = this.nextPageSize;

            this.actions.getPaged(this.packagePath, this.pagedQuery);
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

    protected setFields() {
        this.fields$ = of(this.fieldsConfig.getStaticFields());
    }

    protected delete(value: LocalObject<TRecord, TKey>, _this: RecordIndexComponent<any, any, any>) {
        _this.actions.delete([value], _this.packagePath);
    }

    private getEntities() {
        this.entities$ = this.store.get(this.packagePath);
    }

    private loadPages() {
        this.subscriptionHandler.register(this.store.getPages(this.packagePath).pipe(
            hasValue(),
            map((dictionary: StrIndex<LocalPageTypes<TKey>>) => {
                // Part 1: Get current page
                const query = this.pagedQuery.rsqlFilter.toList().build();
                const queryDictionary = dictionary[query];
                if (queryDictionary) {
                    const sort = this.pagedQuery.sort.build();
                    const pages = queryDictionary.pages[this.pagedQuery.pageSize + ':' + sort];
                    const lastPageKey = this.currentPageNumber;
                    const lastPage: LocalPage<TKey> = pages[lastPageKey];

                    if (lastPage && lastPage.loadingState === LoadingState.OK) {
                        this.pages$.next(Object.keys(pages).map(key => {
                            if (Number(key) > 0 && Number(key) <= lastPageKey) {
                                return pages[key];
                            }
                        }));

                        // Part 2: Load next page
                        if (queryDictionary && queryDictionary.totalCount) {
                            this.totalCount = queryDictionary.totalCount;
                        }

                        this.currentPageNumber = lastPageKey + 1;
                        const lastPageLinks = lastPage.links;

                        if ((lastPageLinks && lastPageLinks.next)) {
                            this.loadingState = LoadingState.Awaiting;
                            this.nextPageNumber = lastPageLinks.next.pageNumber;
                            this.nextPageSize = lastPageLinks.next.pageSize;
                        } else {
                            this.loadingState = LoadingState.End;
                        }
                    }
                }
            })
        ).subscribe());
    }

    /**
     * Shows all entities from the entities$ stream, if the their id is part of one of the loaded pages.
     */
    private getPagedEntities() {
        if (this.pages$ && this.entities$) {
            this.pagedEntities$ = combineLatest(
                this.pages$,
                this.entities$
            ).pipe(
                map(values => {
                    const [pages, entities] = values;

                    const idsArray = linq<LocalPage<TKey>>(pages)
                        .defined()
                        .select(x => x.ids);

                    return entities.filter(entity => entity.isNew).concat(
                        linq<TKey>([])
                            .selectMany(idsArray)
                            .distinct()
                            .select(id => entities.filter(entity => entity.object.id === id)[0])
                            .defined()
                            .ok()
                    );
                })
            );
        }
    }
}
