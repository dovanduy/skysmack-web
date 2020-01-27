import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { FileStorageAppState, FileStorageState, FileStorageItem } from '@skysmack/packages-file-storage';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { safeUndefinedTo, StrIndex, LocalPageTypes, hasValue, LocalObject, dictionaryToArray } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgFileStorageStore {
    constructor(
        protected ngRedux: NgRedux<FileStorageAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { }

    public getBucket(packagePath: string): Observable<string> {
        return this.getState().pipe(
            map(state => state.buckets[packagePath]),
            safeUndefinedTo('object'),
            map(x => (x as any).bucket)
        );
    }

    public updatingBucket(packagePath: string): Observable<boolean> {
        return this.getState().pipe(
            map(state => state.updatingBucket[packagePath]),
        );
    }


    public get(packagePath: string): Observable<LocalObject<FileStorageItem, string>[]> {
        return this.ngRedux.select(state => state.fileStorage).pipe(
            map(state => state.localRecords[packagePath]),
            safeUndefinedTo('object'),
            dictionaryToArray<LocalObject<FileStorageItem, string>>()
        );
    }

    public getPages(packagePath: string): Observable<StrIndex<LocalPageTypes<string>>> {
        return this.ngRedux.select(state => state.fileStorage).pipe(
            map(state => state.localPageTypes[packagePath]),
            hasValue()
        );
    }

    protected getState(): Observable<FileStorageState> {
        return this.ngRedux.select(state => state.fileStorage);
    }
}
