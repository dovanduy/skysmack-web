import { Component, OnInit } from '@angular/core';
import { EditorNavService } from '@skysmack/portal-ui';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgFileStorageActions, NgFileStorageStore } from '@skysmack/ng-file-storage';
import { FileStorageAppState } from '@skysmack/packages-file-storage';
import { NgFileStorageFieldsConfig } from '../../../ng-file-storage-fields-config';
import { DetailsBaseComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-file-storage-details',
  templateUrl: './file-storage-details.component.html'
})
export class FileStorageDetailsComponent extends DetailsBaseComponent<FileStorageAppState, number> implements OnInit {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public actions: NgFileStorageActions,
    public store: NgFileStorageStore,
    public fieldsConfig: NgFileStorageFieldsConfig,
    public editorNavService: EditorNavService
  ) {
    super(router, activatedRoute, skysmackStore, actions, store, fieldsConfig, editorNavService);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
