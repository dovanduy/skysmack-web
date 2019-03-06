import { StrIndex, LocalPageTypes, LocalObject, FieldSchemaViewModel } from "@skysmack/framework";
import { Observable } from 'rxjs';
import { EntityStore } from '../interfaces/entity-store';

export interface FieldStore extends EntityStore<FieldSchemaViewModel, string> {
    get(stateKey: string): Observable<LocalObject<FieldSchemaViewModel, string>[]>;
    getSingle(stateKey: string, key: string): Observable<LocalObject<FieldSchemaViewModel, string>>;
    getPages(stateKey: string): Observable<StrIndex<LocalPageTypes<string>>>;
}
