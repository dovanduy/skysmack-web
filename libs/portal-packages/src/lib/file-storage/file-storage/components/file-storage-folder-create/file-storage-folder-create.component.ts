import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgFileStorageStore, NgFileStorageActions } from '@skysmack/ng-file-storage';
import { FileStorageAppState } from '@skysmack/packages-file-storage';
import { BaseComponent } from '@skysmack/portal-fields';
import { FormHelper, Field } from '@skysmack/ng-dynamic-forms';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NgFolderCreateFieldsConfig } from '../../../ng-folder-create-fields-config';

@Component({
  selector: 'ss-file-storage-folder-create',
  templateUrl: './file-storage-folder-create.component.html'
})
export class FileStorageFolderCreateComponent extends BaseComponent<FileStorageAppState, number> implements OnInit {

  public fields$: Observable<Field[]>;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public actions: NgFileStorageActions,
    public store: NgFileStorageStore,
    public fieldsConfig: NgFolderCreateFieldsConfig
  ) {
    super(router, activatedRoute, skysmackStore);
  }

  ngOnInit() {
    super.ngOnInit();
    this.fields$ = this.loadedPackage$.pipe(
      switchMap(loadedPackage => this.fieldsConfig.getFields(loadedPackage))
    );
  }

  public onCreateSubmit(fh: FormHelper) {
    fh.formValid(() => { });
  }
}
