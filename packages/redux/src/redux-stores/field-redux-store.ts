import { StrIndex, LocalPageTypes, LocalObject, FieldSchemaViewModel } from "@skysmack/framework";
import { Observable } from 'rxjs';

export interface FieldReduxStore {
    get(packagePath: string): Observable<LocalObject<FieldSchemaViewModel, string>[]>;
    getSingle(packagePath: string, key: string): Observable<LocalObject<FieldSchemaViewModel, string>>;
    getPages(packagePath: string, pageSize: number, query: string, sort: string): Observable<StrIndex<LocalPageTypes<FieldSchemaViewModel>>>;
}
