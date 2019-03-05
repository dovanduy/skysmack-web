import { StrIndex, LocalPageTypes, LocalObject, FieldSchemaViewModel } from "@skysmack/framework";
import { Observable } from 'rxjs';
import { EntityStore } from '../interfaces/entity-store';

export interface FieldReduxStore extends EntityStore<FieldSchemaViewModel, string> {
    get(packagePath: string): Observable<LocalObject<FieldSchemaViewModel, string>[]>;
    getSingle(packagePath: string, key: string): Observable<LocalObject<FieldSchemaViewModel, string>>;
    getPages(packagePath: string): Observable<StrIndex<LocalPageTypes<string>>>;
}
