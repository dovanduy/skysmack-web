import { Router } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { EntityActions, EntityStore } from '@skysmack/redux';
import { Input, OnInit, OnDestroy } from '@angular/core';
import { Summary, SubscriptionHandler, LocalObject, RSQLFilterBuilder, PagedQuery, Record } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { getPackageDendencyAsStream } from '@skysmack/ng-framework';
import { take, map, filter, switchMap, tap } from 'rxjs/operators';

export class SummaryBaseComponent<TKey> implements OnInit, OnDestroy {
    @Input() public providerPackagePath: string;
    @Input() public summary: Summary<TKey>;

    protected subscriptionHandler = new SubscriptionHandler();
    public packagePath: string;

    constructor(
        protected router: Router,
        protected skysmackStore: NgSkysmackStore,
    ) { }

    ngOnInit() {
        this.packagePath = this.router.url.split('/')[1];
    }

    ngOnDestroy() {
        this.subscriptionHandler.unsubscribe();
    }

    protected getExtendedDataIds(packagePath$: Observable<string>, store: EntityStore<any, TKey>): Observable<number[]> {
        return store.getSingle(this.packagePath, this.summary.entityId).pipe(
            take(1),
            switchMap(record => packagePath$.pipe(
                map(packagePath => {
                    const extendedData = record.object['extendedData'];
                    return extendedData && extendedData[`${packagePath}.ids`] as number[];
                })
            )),
            filter(x => x !== undefined && x !== null)
        );
    }

    protected getDependencyPackagePath(indexes: number[]): Observable<string> {
        return getPackageDendencyAsStream(this.skysmackStore, this.providerPackagePath, indexes).pipe(
            map(_package => _package.object.path)
        );
    }

    protected requestRecords(packagePath$: Observable<string>, recordIds$: Observable<number[]>, actions: EntityActions<any, TKey>): void {
        this.subscriptionHandler.register(recordIds$.pipe(
            take(1),
            switchMap(recordIds => packagePath$.pipe(
                take(1),
                tap(packagePath => {
                    const rsqlFilter = new RSQLFilterBuilder();
                    rsqlFilter.column('id').in(recordIds);
                    const query = new PagedQuery({ rsqlFilter });
                    actions.getPaged(packagePath, query);
                })
            ))
        ).subscribe());
    }

    protected getRecords(packagePath$: Observable<string>, recordIds$: Observable<TKey[]>, store: EntityStore<any, TKey>): Observable<LocalObject<any, TKey>[]> {
        return packagePath$.pipe(
            switchMap(packagePath => store.get(packagePath).pipe(
                switchMap(records => recordIds$.pipe(
                    map(recordIds => records.filter(record => recordIds.includes(record.object.id)))
                ))
            ))
        );
    }
}
