import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { fileStorageRoutes } from './file-storage/components/file-storage-components';
import { DefaultComponent } from '@skysmack/portal-ui';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...fileStorageRoutes
      ]
    }
  ])],
  exports: [RouterModule]
})
export class FileStorageRoutingModule { }
