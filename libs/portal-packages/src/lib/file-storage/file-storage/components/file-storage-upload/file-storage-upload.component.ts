import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgFileStorageStore, NgFileStorageActions } from '@skysmack/ng-file-storage';
import { FileStorageAppState } from '@skysmack/packages-file-storage';
import { BaseComponent } from '@skysmack/portal-fields';
import { FormHelper, Field } from '@skysmack/ng-dynamic-forms';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { NgFileStorageUploadFieldsConfig } from '../../../ng-file-storage-upload-fields-config';

@Component({
  selector: 'ss-file-storage-upload',
  templateUrl: './file-storage-upload.component.html'
})
export class FileStorageUploadComponent extends BaseComponent<FileStorageAppState, number> implements OnInit {

  public fields$: Observable<Field[]>;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public actions: NgFileStorageActions,
    public store: NgFileStorageStore,
    public fieldsConfig: NgFileStorageUploadFieldsConfig
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
    fh.formValid(() => {
      this.actions.updateSettings(this.packagePath, fh.form.value);
    });
  }
}
