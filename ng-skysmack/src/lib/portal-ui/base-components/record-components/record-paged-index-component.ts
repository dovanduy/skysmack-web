import { Router, ActivatedRoute } from '@angular/router';
import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { NgSkysmackRedux } from 'lib/ng-packages/skysmack';
import { RecordIndexComponent } from './record-index-component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalPage, PagedQuery, LoadingState, linq, LocalObject, hasValue } from '@skysmack/framework';
import { OnInit } from '@angular/core';
import { NgRecordReduxStore } from 'lib/ng-redux/redux-stores/ng-record-redux-store';
import { Record } from '@skysmack/framework';
import { Observable, fromEvent, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

export class RecordPagedIndexComponent<TAppState, TRecord extends Record<TKey>, TKey> extends RecordIndexComponent<TAppState, TRecord, TKey> implements OnInit {

    public pages$: BehaviorSubject<LocalPage<TKey>[]> = new BehaviorSubject<LocalPage<TKey>[]>([]);
    public pagedEntities$: Observable<LocalObject<any>[]>;
    public pagedQuery = new PagedQuery();

    public nextPageNumber = 1;
    public nextPageSize = 50;

    public loadingState: LoadingState = LoadingState.Loading;

    public currentPageNumber = 1;
    public totalCount: number;

    private loaderIsVisible = false;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public actions: RecordActionsBase<TAppState, NgRedux<TAppState>>,
        public redux: NgSkysmackRedux,
        public store: NgRecordReduxStore<TAppState, TRecord, TKey>
    ) {
        super(router, activatedRoute, actions, redux, store);
    }

    ngOnInit() {
        super.ngOnInit();
        this.requestPage(true);
        // this.loadPages();
        // this.getPagedEntities();
        // this.subscriptionHandler.subscribe(this.getScrollAsStream().subscribe());
    }

    /**
     * Loads the next page stored in redux. Also requests the next page if any.
     */
    public loadPages() {
        // TODO: Fix

        // this.subscriptionHandler.subscribe(this.redux.getPageDictionary().pipe(
        //     hasValue(),
        //     map((dictionary: Dictionary<Dictionary<Page>>) => {
        //         const queryDictionary = dictionary[setKey(this.path, [this.nextPageSize])];
        //         if (queryDictionary) {
        //             const pages = Object.keys(queryDictionary)
        //                 .map(key => queryDictionary[key])
        //                 .filter(page => page.pagination.xPageNumber <= this.nextPageNumber)
        //                 .sort((a: Page, b: Page) => a.pagination.xPageNumber - b.pagination.xPageNumber);

        //             const lastPage = pages[pages.length - 1];
        //             this.pages$.next(pages);

        //             this.totalCount = lastPage.pagination.xTotalCount;
        //             this.currentPageNumber = lastPage.pagination.xPageNumber;

        //             const lastPageLinks = lastPage.pagination.links;

        //             if (lastPageLinks) {
        //                 if (lastPageLinks.next) {
        //                     setTimeout(() => {
        //                         this.loadingState = LoadingState.Awaiting;
        //                         this.requestPage();
        //                     }, 50);
        //                     this.nextPageNumber = lastPageLinks.next.pageNumber;
        //                     this.nextPageSize = lastPageLinks.next.pageSize;
        //                 } else {
        //                     this.loadingState = LoadingState.End;
        //                 }
        //             } else {
        //                 this.loadingState = LoadingState.End;
        //             }
        //         }
        //     })
        // ).subscribe());
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

            // TODO: Correctly set the pagedQuery here?
            this.pagedQuery.pageNumber = this.nextPageNumber;
            this.pagedQuery.pageSize = this.nextPageSize;

            this.actions.getPaged(this.path, this.pagedQuery);
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
        // TODO: Calculate loader is visible in the component instead.
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
            const pagedEntities$ = combineLatest(
                this.pages$,
                this.entities$
            ).pipe(
                map(values => {
                    return linq(values[0])
                        .defined()
                        .select(x => x.entityIds)
                        .selectMany()
                        .distinct()
                        .select(entityId => values[1].filter(entity => entity.object.id === entityId)[0])
                        .defined()
                        .ok();
                })
            );

            // TODO: Fix

            // this.pagedEntities$ = combineLatest(
            //     this.redux.getOfflineOutboxItems(this.path),
            //     this.redux.getJustCreatedEntities(this.path),
            //     pagedEntities$
            // ).pipe(
            //     map(values => {
            //         const outBox = values[0];
            //         const justCreated = values[1];
            //         const entities = values[2];

            //         return outBox.concat(justCreated.concat(entities));
            //     })
            // );
        }
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
