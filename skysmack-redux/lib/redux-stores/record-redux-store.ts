import { Record, StrIndex, LocalPageTypes, LocalObject } from "skysmack-framework";
import { Observable } from 'rxjs';

export interface RecordReduxStore<TRecord extends Record<TKey>, TKey> {
    get(packagePath: string): Observable<LocalObject<TRecord>>;
    getSingle(packagePath: string, id: TKey): Observable<LocalObject<TRecord>>;
    getPages(packagePath: string, pageSize: number, query: string, sort: string): Observable<StrIndex<LocalPageTypes<TKey>>>;
}
