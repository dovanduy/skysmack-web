import { Observable, BehaviorSubject, combineLatest, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { OnInit } from '@angular/core';
import { EntityCrudIndex } from './entity-crud-index';
import { LoadingState, LocalObject, hasValue, StrIndex, setKey, linq } from '@skysmack/framework';

export class EntityCrudIndexPaged extends EntityCrudIndex implements OnInit {

    public pages$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]); // Was Page
    public pagedEntities$: Observable<LocalObject<any>[]>;

    public nextPageNumber = 1;
    public nextPageSize = 50;

    public loadingState: LoadingState = LoadingState.Loading;

    public currentPageNumber = 1;
    public totalCount: number;

    private loaderIsVisible = false;

    ngOnInit() {
        super.ngOnInit();
        this.requestPage(true);
        this.loadPages();
        this.getPagedEntities();
        this.subscriptionHandler.subscribe(this.getScrollAsStream().subscribe());
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
            this.redux.requestPage(this.path, this.nextPageNumber, this.nextPageSize, this.filterBuilder, this.sortBuilder);
        }
    }

    /**
     * Loads the next page stored in redux. Also requests the next page if any.
     */
    public loadPages() {
        this.subscriptionHandler.subscribe(this.redux.getPageDictionary().pipe(
            hasValue(),
            map((dictionary: StrIndex<StrIndex<any>>) => { // Was Page
                const queryDictionary = dictionary[setKey(this.path, [this.nextPageSize])];
                if (queryDictionary) {
                    const pages = Object.keys(queryDictionary)
                        .map(key => queryDictionary[key])
                        .filter(page => page.pagination.xPageNumber <= this.nextPageNumber)
                        .sort((a: any, b: any) => a.pagination.xPageNumber - b.pagination.xPageNumber); // Was Page

                    const lastPage = pages[pages.length - 1];
                    this.pages$.next(pages);

                    this.totalCount = lastPage.pagination.xTotalCount;
                    this.currentPageNumber = lastPage.pagination.xPageNumber;

                    const lastPageLinks = lastPage.pagination.links;

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

            this.pagedEntities$ = combineLatest(
                this.redux.getOfflineOutboxItems(this.path),
                this.redux.getJustCreatedEntities(this.path),
                pagedEntities$
            ).pipe(
                map((values: any[]) => {
                    const outBox = values[0];
                    const justCreated = values[1];
                    const entities = values[2];

                    return outBox.concat(justCreated.concat(entities));
                })
            );
        }
    }


    /** CURRENTLY NOT USED
     * Refreshes a specific page number.
     * @param pageNumber The number of the page to refresh.
     */
    public refreshPage(pageNumber) {
        this.redux.requestPage(this.path, pageNumber, this.nextPageSize, this.filterBuilder, this.sortBuilder);
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

