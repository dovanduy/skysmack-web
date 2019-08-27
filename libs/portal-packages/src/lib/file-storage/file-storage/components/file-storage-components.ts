import { Routes } from '@angular/router';
import { FileStorageIndexComponent } from './file-storage-index/file-storage-index.component';
import { FileStorageCreateComponent } from './file-storage-create/file-storage-create.component';
import { FileStorageEditComponent } from './file-storage-edit/file-storage-edit.component';
import { FileStorageDetailsComponent } from './file-storage-details/file-storage-details.component';
import { FILE_STORAGE_AREA_KEY, FILE_STORAGE_ADDITIONAL_PATHS } from '@skysmack/packages-file-storage';
import { FileStorageDashboardComponent } from './file-storage-dashboard/file-storage-dashboard.component';
import { getFieldsRoutes } from '@skysmack/portal-fields';

export const fileStorageRoutes: Routes = [
  {
    path: '', children: [
      {
        path: '', component: FileStorageIndexComponent, children: [
          { path: 'create', component: FileStorageCreateComponent, pathMatch: 'full' },
          { path: 'edit/:id', component: FileStorageEditComponent, pathMatch: 'full' },
          { path: 'details/:id', component: FileStorageDetailsComponent, pathMatch: 'full' },
        ]
      },
      getFieldsRoutes(FILE_STORAGE_AREA_KEY, FILE_STORAGE_ADDITIONAL_PATHS)
    ]
  }
];

export const fileStorageComponents: any[] = [
  FileStorageIndexComponent,
  FileStorageCreateComponent,
  FileStorageEditComponent,
  FileStorageDetailsComponent,
  FileStorageDashboardComponent
];

export const fileStorageEntryComponents: any[] = [
  FileStorageDashboardComponent
]
