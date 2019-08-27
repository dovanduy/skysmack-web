import { NgModule } from '@angular/core';
import { fileStorageReducer, FILE_STORAGE_REDUCER_KEY } from '@skysmack/packages-file-storage';
import { NgFileStorageEpics } from './file-storage/redux/ng-file-storage-epics';
import { registerRedux } from '@skysmack/ng-framework';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgFileStorageModule {
  constructor(
    epics: NgFileStorageEpics,
  ) {
    registerRedux(FILE_STORAGE_REDUCER_KEY, fileStorageReducer, epics);
  }
}
