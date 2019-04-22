import { Observable } from 'rxjs';
import { LocalObject, StrIndex, LocalPageTypes } from '@skysmack/framework';

export interface EntityStore<TObject, TKey> {
    get(packagePath: string): Observable<LocalObject<TObject, TKey>[]>;
    getSingle(packagePath: string, key: TKey): Observable<LocalObject<TObject, TKey>>;
    getPages(packagePath: string): Observable<StrIndex<LocalPageTypes<TKey>>>;
}
