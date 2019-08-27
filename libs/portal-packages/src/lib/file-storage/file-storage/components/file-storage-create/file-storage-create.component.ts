import { Component, OnInit } from '@angular/core';
import { FileStorageAppState } from '@skysmack/packages-file-storage';
import { NgFileStorageActions, NgFileStorageStore } from '@skysmack/ng-file-storage';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { DocumentRecordFormComponent } from '@skysmack/portal-fields';
import { NgFieldActions } from '@skysmack/ng-framework';
import { NgFileStorageFieldsConfig } from '../../../ng-file-storage-fields-config';

@Component({
  selector: 'ss-file-storage-create',
  templateUrl: './file-storage-create.component.html'
})
export class FileStorageCreateComponent extends DocumentRecordFormComponent<FileStorageAppState, any, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgFileStorageActions,
    public skysmackStore: NgSkysmackStore,
    public fieldsConfig: NgFileStorageFieldsConfig,
    public store: NgFileStorageStore,
    public fieldActions: NgFieldActions
  ) {
    super(router, activatedRoute, editorNavService, actions, skysmackStore, store, fieldsConfig, fieldActions);
  }

  ngOnInit() {
    super.ngOnInit();
    if (true) {
      const dasf = 'test';
    }
    this.setCreateFields();
  }
}
