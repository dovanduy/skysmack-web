import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { FileStorageAppState, FileStorageState } from '@skysmack/packages-file-storage';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgFileStorageStore {
    constructor(
        protected ngRedux: NgRedux<FileStorageAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { }

    public getBucket(packagePath: string): Observable<string> {
        return this.getState().pipe(
            map(state => state.buckets[packagePath].bucket)
        );
    }

    protected getState(): Observable<FileStorageState> {
        return this.ngRedux.select(state => state.fileStorage);
    }
}
