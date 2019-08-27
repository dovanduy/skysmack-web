import { Component, OnInit } from '@angular/core';
import { FileStorageAppState } from '@skysmack/packages-file-storage';
import { NgFileStorageActions, NgFileStorageStore } from '@skysmack/ng-file-storage';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { BaseComponent } from '@skysmack/portal-fields';
import { NgFileStorageFieldsConfig } from '../../../ng-file-storage-fields-config';

@Component({
  selector: 'ss-file-storage-edit',
  templateUrl: './file-storage-edit.component.html'
})
export class FileStorageEditComponent extends BaseComponent<FileStorageAppState, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgFileStorageActions,
    public skysmackStore: NgSkysmackStore,
    public fieldsConfig: NgFileStorageFieldsConfig,
    public store: NgFileStorageStore,
  ) {
    super(router, activatedRoute, skysmackStore);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
