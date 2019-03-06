import { Record, StrIndex, LocalPageTypes, LocalObject } from "@skysmack/framework";
import { Observable } from 'rxjs';
import { EntityStore } from '../interfaces/entity-store';

export interface RecordStore<TRecord extends Record<TKey>, TKey> extends EntityStore<TRecord, TKey> {
    get(packagePath: string): Observable<LocalObject<TRecord, TKey>[]>;
    getSingle(packagePath: string, id: TKey): Observable<LocalObject<TRecord, TKey>>;
    getPages(packagePath: string): Observable<StrIndex<LocalPageTypes<TKey>>>;
}
