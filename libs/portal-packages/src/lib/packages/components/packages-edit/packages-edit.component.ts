import { Component, OnInit } from '@angular/core';
import { NgPackagesActions } from '@skysmack/ng-core';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgPackagesStore } from '@skysmack/ng-core';
import { PackagesAppState } from '@skysmack/packages-skysmack-core';
import { Package } from '@skysmack/framework';
import { NgPackagesFieldsConfig } from '../../ng-packages-fields-config';

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
    this.actions.getAvailablePackages();
    this.setEditFields();
  }
}
