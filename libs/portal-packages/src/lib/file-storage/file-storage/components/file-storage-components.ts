import { Routes } from '@angular/router';
import { FileStorageIndexComponent } from './file-storage-index/file-storage-index.component';
import { FileStorageCreateComponent } from './file-storage-create/file-storage-create.component';
import { FileStorageEditComponent } from './file-storage-edit/file-storage-edit.component';
import { FileStorageDashboardComponent } from './file-storage-dashboard/file-storage-dashboard.component';
import { FileStorageInstallationComponent } from './file-storage-installation/file-storage-installation.component';
import { FileStorageUploadComponent } from './file-storage-upload/file-storage-upload.component';
import { FileStorageFolderCreateComponent } from './file-storage-folder-create/file-storage-folder-create.component';

export const fileStorageRoutes: Routes = [
  {
    path: '**', component: FileStorageIndexComponent
  }
];

export const fileStorageComponents: any[] = [
  FileStorageIndexComponent,
  FileStorageCreateComponent,
  FileStorageEditComponent,
  FileStorageInstallationComponent,
  FileStorageUploadComponent,
  FileStorageDashboardComponent,
  FileStorageFolderCreateComponent
];

export const fileStorageEntryComponents: any[] = [
  FileStorageDashboardComponent,
  FileStorageUploadComponent,
  FileStorageFolderCreateComponent
]
