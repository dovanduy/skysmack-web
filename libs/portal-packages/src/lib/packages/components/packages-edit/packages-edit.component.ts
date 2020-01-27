import { Component, OnInit } from '@angular/core';
import { NgPackagesActions, NgPackagesStore } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { PackagesAppState } from '@skysmack/packages-skysmack-core';
import { Package, LocalObjectStatus } from '@skysmack/framework';
import { NgPackagesFieldsConfig } from '../../ng-packages-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';
import { FormHelper } from '@skysmack/ng-dynamic-forms';

@Component({
  selector: 'ss-packages-edit',
  templateUrl: './packages-edit.component.html'
})
export class PackagesEditComponent extends RecordFormComponent<PackagesAppState, Package, string> implements OnInit {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgPackagesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgPackagesFieldsConfig,
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
      const oldValue = { ...this.selectedEntity };
      const newValue = this.extractFormValues(fh, this.selectedEntity);
      delete newValue.object.type;
      delete newValue.object.dependencies;

      newValue.oldObject = oldValue.object;
      newValue.status = LocalObjectStatus.MODIFYING;

      this.actions.update([newValue], this.packagePath);
      this.editorNavService.hideEditorNav();
    });
  }
}
