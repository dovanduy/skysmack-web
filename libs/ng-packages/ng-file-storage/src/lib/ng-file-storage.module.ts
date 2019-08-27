import { NgModule } from '@angular/core';
import { fileStorageReducer, FILE_STORAGE_REDUCER_KEY } from '@skysmack/packages-file-storage';
import { NgFileStorageEpics } from './file-storage/redux/ng-file-storage-epics';
import { registerRedux, NgSignalR } from '@skysmack/ng-framework';
import { SignalRPersonProvider } from './file-storage/signal-r-file-storage-provider';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgFileStorageModule {
  constructor(
    epics: NgFileStorageEpics,
    signalR: NgSignalR,
    fileStorageSRProvider: SignalRPersonProvider
  ) {
    registerRedux(FILE_STORAGE_REDUCER_KEY, fileStorageReducer, epics);
    signalR.instance.registerProvider(fileStorageSRProvider);
  }
}
