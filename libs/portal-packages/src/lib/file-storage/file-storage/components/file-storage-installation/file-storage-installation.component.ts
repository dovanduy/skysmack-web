import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgFileStorageStore, NgFileStorageActions } from '@skysmack/ng-file-storage';
import { FileStorageAppState, Bucket } from '@skysmack/packages-file-storage';
import { BaseComponent } from '@skysmack/portal-fields';
import { FormHelper, Field } from '@skysmack/ng-dynamic-forms';
import { NgFileStorageFieldsConfig } from '../../../ng-file-storage-fields-config';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NgRedux } from '@angular-redux/store';

@Component({
  selector: 'ss-file-storage-installation',
  templateUrl: './file-storage-installation.component.html',
  styleUrls: ['./file-storage-installation.component.scss']
})
export class FileStorageInstallationComponent extends BaseComponent<FileStorageAppState, number> implements OnInit {

  public fields$: Observable<Field[]>;
  public showLoadingWheel$: Observable<boolean>;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public actions: NgFileStorageActions,
    public store: NgFileStorageStore,
    public fieldsConfig: NgFileStorageFieldsConfig,
    protected ngRedux: NgRedux<any>,
  ) {
    super(router, activatedRoute, skysmackStore);
  }

  ngOnInit() {
    super.ngOnInit();

    this.fields$ = this.loadedPackage$.pipe(
      switchMap(loadedPackage => this.fieldsConfig.getFields(loadedPackage))
    );

    this.showLoadingWheel$ = this.store.updatingBucket(this.packagePath);
  }

  public onCreateSubmit(fh: FormHelper) {
    fh.formValid(() => {
      this.actions.updateBucket(this.packagePath, new Bucket(fh.form.value));
    });
  }
}
