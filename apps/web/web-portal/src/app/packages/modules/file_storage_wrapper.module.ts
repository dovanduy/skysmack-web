import { NgModule } from '@angular/core';
import { FileStorageModule } from './../../../../../../../libs/portal-packages/src/lib/file-storage/file-storage.module';


@NgModule({
  imports: [
    FileStorageModule
  ]
})
export class FileStorageWrapperModule { }
