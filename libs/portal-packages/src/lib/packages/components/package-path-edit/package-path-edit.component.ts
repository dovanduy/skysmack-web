import { Component, OnInit } from '@angular/core';
import { NgPackagesActions, NgPackagesStore } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { PackagesAppState } from '@skysmack/packages-skysmack-core';
import { Package } from '@skysmack/framework';
import { NgPackagePathEditFieldsConfig } from '../../ng-package-path-edit-fields-config';
import { FormHelper } from '@skysmack/ng-dynamic-forms';
import { RecordFormComponent } from '@skysmack/portal-fields';
import { ChangePackagePath } from 'libs/packages/skysmack-core/src/packages/models/change-package-path';

@Component({
  selector: 'ss-package-path-edit',
  templateUrl: './package-path-edit.component.html'
})
export class PackagePathEditComponent extends RecordFormComponent<PackagesAppState, Package, string> implements OnInit {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgPackagesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgPackagePathEditFieldsConfig,
    public store: NgPackagesStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }

  protected update(fh: FormHelper) {
    fh.formValid(() => {
      const changePackagePath = new ChangePackagePath(fh.form.getRawValue());
      this.actions.changePath([changePackagePath], this.packagePath);
    });
  }
}
