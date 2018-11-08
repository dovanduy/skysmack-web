import { Record, StrIndex, LocalPageTypes, LocalObject } from '@skysmack/framework';
import { RecordReduxStore, RecordState } from '@skysmack/redux';
import { Observable } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { PathSelector } from '@angular-redux/store';
import { filter } from 'rxjs/operators';

export abstract class NgRecordReduxStore<TState, TRecord extends Record<TKey>, TKey> implements RecordReduxStore<TRecord, TKey>  {
    public abstract stateKey: string;

    constructor(
        protected ngRedux: NgRedux<RecordState<TRecord, TKey>>
    ) { }

    public get(packagePath: string): Observable<LocalObject<TRecord>> {
        return this.ngRedux.select(this.getEntitiesSelector(packagePath));
    }

    public getSingle(packagePath: string, id: TKey): Observable<LocalObject<TRecord>> {
        return this.get(packagePath).pipe(
            filter(localRecord => localRecord.object.Id === id)
        );
    }

    public getPages(packagePath: string, pageSize: number, query: string, sort: string): Observable<StrIndex<LocalPageTypes<TKey>>> {
        var pages = this.ngRedux.select(this.getPagesSelector(packagePath)) as Observable<StrIndex<LocalPageTypes<TKey>>>;
        return pages.pipe(
            // filter()
        );
    }

    protected getEntitiesSelector(packagePath: string): PathSelector {
        return [packagePath, this.stateKey, 'entities'];
    }

    protected getPagesSelector(packagePath: string): PathSelector {
        return [packagePath, this.stateKey, 'pages'];
    }
}
