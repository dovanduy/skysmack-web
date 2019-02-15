import { BaseComponent } from '../base-component';
import { Router, ActivatedRoute } from '@angular/router';
import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { LocalObject, LocalPage, PagedQuery, LoadingState, hasValue, StrIndex, LocalPageTypes, linq } from '@skysmack/framework';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { NgRecordReduxStore } from '@skysmack/ng-redux';
import { OnInit } from '@angular/core';
import { Record } from '@skysmack/framework';
import { map } from 'rxjs/operators';

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
        public store: NgRecordReduxStore<TAppState, TRecord, TKey>
    ) {
        super(router, activatedRoute, skysmackStore);
    }

    ngOnInit() {
        super.ngOnInit();
        this.getEntities();
        this.requestPage(true);
        this.loadPages();
        this.getPagedEntities();
    }

    public actionEvent(event: { action: Function, value: LocalObject<TRecord, TKey>, _this: any }) {
        event.action(event.value, event._this);
    }


    public requestPage(force: boolean) {
        if (force) {
            this.loadingState = LoadingState.Loading;

            this.pagedQuery.pageNumber = this.nextPageNumber;
            this.pagedQuery.pageSize = this.nextPageSize;

            this.actions.getPaged(this.packagePath, this.pagedQuery);
        }
    }

    protected delete(value: LocalObject<TRecord, TKey>, _this: RecordIndexComponent<any, any, any>) {
        _this.actions.delete([value], _this.packagePath);
    }

    private getEntities() {
        this.entities$ = this.store.get(this.packagePath);
    }

    private loadPages() {
        this.subscriptionHandler.register(this.store.getPages(this.packagePath).pipe(
            hasValue<StrIndex<LocalPageTypes<TKey>>>(),
            map(dictionary => {
                // Part 1: Get current page
                const query = this.pagedQuery.rsqlFilter.toList().build();
                const queryDictionary = dictionary[query];
                if (queryDictionary) {
                    const sort = this.pagedQuery.sort.build();
                    const pages = queryDictionary.pages[this.pagedQuery.pageSize + ':' + sort];
                    const pageKeys = Object.keys(pages);
                    const lastPageKey = Number(pageKeys[pageKeys.length - 1]);
                    const lastPage: LocalPage<TKey> = pages[lastPageKey];

                    this.pages$.next(Object.keys(pages).map(key => {
                        if (Number(key) > 0) {
                            return pages[key];
                        }
                    }));

                    // Part 2: Load next page
                    if (queryDictionary && queryDictionary.totalCount) {
                        this.totalCount = queryDictionary.totalCount;
                    }

                    this.currentPageNumber = lastPageKey;
                    const lastPageLinks = lastPage.links;

                    if (lastPageLinks) {
                        if (lastPageLinks.next) {
                            setTimeout(() => {
                                this.loadingState = LoadingState.Awaiting;
                                this.requestPage();
                            }, 50);
                            this.nextPageNumber = lastPageLinks.next.pageNumber;
                            this.nextPageSize = lastPageLinks.next.pageSize;
                        } else {
                            this.loadingState = LoadingState.End;
                        }
                    } else {
                        // HERE
                        this.loadingState = LoadingState.Loading;
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
