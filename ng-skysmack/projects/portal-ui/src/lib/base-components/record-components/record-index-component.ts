import { BaseComponent } from '../base-component';
import { Router, ActivatedRoute } from '@angular/router';
import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { LocalObject, LocalPage, PagedQuery, LoadingState, hasValue, StrIndex, LocalPageTypes, linq } from '@skysmack/framework';
import { Observable, BehaviorSubject, fromEvent, combineLatest } from 'rxjs';
import { NgRecordReduxStore } from '@skysmack/ng-redux';
import { OnInit } from '@angular/core';
import { Record } from '@skysmack/framework';
import { map } from 'rxjs/operators';

export class RecordIndexComponent<TAppState, TRecord extends Record<TKey>, TKey> extends BaseComponent<TAppState, TKey> implements OnInit {
    public entities$: Observable<LocalObject<TRecord, TKey>[]>;
    public createdEntities$: Observable<LocalObject<any, TKey>[]>;
    public pages$: BehaviorSubject<LocalPage<TKey>[]> = new BehaviorSubject<LocalPage<TKey>[]>([]);
    public pagedEntities$: Observable<LocalObject<any, TKey>[]>;
    public pagedQuery = new PagedQuery();

    public nextPageNumber = 1;
    public nextPageSize = this.pagedQuery.pageSize;

    public loadingState: LoadingState = LoadingState.Loading;

    public currentPageNumber = 1;
    public totalCount: number;

    private loaderIsVisible = false;

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
        // this.subscriptionHandler.subscribe(this.getScrollAsStream().subscribe());
    }

    /**
 * Listens for and fires entity actions when set in the component.
 * @param event Event emitted from the ss-data-table
 */
    public actionEvent(event: { action: Function, value: LocalObject<TRecord, TKey>, _this: any }) {
        event.action(event.value, event._this);
    }

    /**
     * Angular track by function used to track local objects in ngFor loops.
     */
    public trackByObjectId(item: LocalObject<any, TKey>) {
        return item ? item.object.id : undefined;
    }

    /**
     * Deletes an entity
     * @param entity The entity to delete.
     */
    protected delete(value: LocalObject<TRecord, TKey>, _this: RecordIndexComponent<any, any, any>) {
        _this.actions.delete([value], _this.packagePath);
    }

    /**
     * Loads the next page stored in skysmackStore. Also requests the next page if any.
     */
    public loadPages() {
        this.subscriptionHandler.register(this.store.getPages(this.packagePath).pipe(
            hasValue<StrIndex<LocalPageTypes<TKey>>>(),
            map(dictionary => {
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
                    this.totalCount = queryDictionary.totalCount;
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
                        this.loadingState = LoadingState.End;
                    }
                }
            })
        ).subscribe());
    }

    /**
     * Loads the next page of entities if:
     * 1. Forced to do so
     * 2. The loading state is awaiting AND
     *      - loaderIsVisible (inViewport directive is in view port :D )
     *      - OR the user is scrolling close to the end of the page.
     * @param force Gets a page regardless of other conditions if set to true.
     */
    public requestPage(force = false) {
        if (force || (this.loadingState === LoadingState.Awaiting && (this.loaderIsVisible || this.getMaxScroll() - window.pageYOffset < 100))) {
            this.loadingState = LoadingState.Loading;

            this.pagedQuery.pageNumber = this.nextPageNumber;
            this.pagedQuery.pageSize = this.nextPageSize;

            this.actions.getPaged(this.packagePath, this.pagedQuery);
        }
    }

    /**
     * Requests a new page (if conditions are met) while the user is scrolling
     */
    public getScrollAsStream(): Observable<void> {
        return fromEvent(window, 'scroll').pipe(
            map(() => { this.requestPage(); })
        );
    }

    /**
     * Requests the next page when option is true.
     * @param param0 Object with the property visisble set to true or false. If true, anotherpage is requested.
     */
    public onIntersection({ visible = false }) {
        this.loaderIsVisible = visible;
        if (visible) {
            setTimeout(() => { this.requestPage(); }, 50);
        }
    }


    /**
     * Shows all entities from the entities$ stream, if the their id is part of one of the loaded pages.
     */
    public getPagedEntities() {
        if (this.pages$ && this.entities$) {
            this.pagedEntities$ = combineLatest(
                this.pages$,
                this.entities$
            ).pipe(
                map(values => {
                    const idsArray = linq<LocalPage<TKey>>(values[0])
                        .defined()
                        .select(x => x.ids);

                    return linq<TKey>([]).selectMany(idsArray).distinct()
                        .select(id => values[1].filter(entity => entity.object.id === id)[0])
                        .defined()
                        .ok();
                })
            );
        }
    }

    private getEntities() {
        this.entities$ = this.store.get(this.packagePath);
    }

    /**
     * Gets the max distance the user can scroll in a cross browser safe manner.
     */
    private getMaxScroll(): number {
        const scrollHeight = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.body.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight,
            document.documentElement.clientHeight
        );

        const clientHeight = document.documentElement.clientHeight;

        return (scrollHeight - clientHeight);
    }
}
