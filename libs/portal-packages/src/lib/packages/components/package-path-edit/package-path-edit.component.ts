import { Component, OnInit } from '@angular/core';
import { NgPackagesActions } from '@skysmack/ng-core';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgPackagesStore } from '@skysmack/ng-core';
import { PackagesAppState } from '@skysmack/packages-skysmack-core';
import { Package } from '@skysmack/framework';
import { NgPackagePathEditFieldsConfig } from '../../ng-package-path-edit-fields-config';
import { FormHelper } from '@skysmack/ng-dynamic-forms';

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
      // const oldValue = { ...this.selectedEntity };
      // const newValue = this.extractFormValues(fh, this.selectedEntity);
      // newValue.oldObject = oldValue.object;
      // newValue.status = LocalObjectStatus.MODIFYING;
      // this.actions.update([newValue], this.packagePath); // Create proper redux flow?
      console.log('UPDATING PACKAGE PATH', fh.form.value);
      this.editorNavService.hideEditorNav();
    });
  }
}
