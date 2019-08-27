import { Routes } from '@angular/router';
import { FileStorageIndexComponent } from './file-storage-index/file-storage-index.component';
import { FileStorageCreateComponent } from './file-storage-create/file-storage-create.component';
import { FileStorageEditComponent } from './file-storage-edit/file-storage-edit.component';
import { FileStorageDashboardComponent } from './file-storage-dashboard/file-storage-dashboard.component';

export const fileStorageRoutes: Routes = [
  {
    path: '', children: [
      {
        path: '', component: FileStorageIndexComponent, children: [
          { path: 'create', component: FileStorageCreateComponent, pathMatch: 'full' },
          { path: 'edit/:id', component: FileStorageEditComponent, pathMatch: 'full' },
        ]
      },
    ]
  }
];

export const fileStorageComponents: any[] = [
  FileStorageIndexComponent,
  FileStorageCreateComponent,
  FileStorageEditComponent,
  FileStorageDashboardComponent
];

export const fileStorageEntryComponents: any[] = [
  FileStorageDashboardComponent
]
