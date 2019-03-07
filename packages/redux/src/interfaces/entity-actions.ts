import { LocalObject, PagedQuery, StrIndex } from '@skysmack/framework';

export interface EntityActions<TObject, TKey> {
    cancelAction(entities: LocalObject<TObject, TKey>, packagePath: string, additionalPaths?: string[]): void;
    getPaged(packagePath: string, pagedQuery: PagedQuery): void;
    getSingle(packagePath: string, key: TKey): void;
    add(entities: LocalObject<TObject, TKey>[], packagePath: string): void;
    update(records: LocalObject<TObject, TKey>[], packagePath: string): void;
    delete(records: LocalObject<TObject, TKey>[], packagePath: string): void;
    getMessageParams(record: LocalObject<any, any>): StrIndex<string>;
}