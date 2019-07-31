import { Component, OnInit } from '@angular/core';
import { NgPackagesActions, NgPackagesStore } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { PackagesAppState } from '@skysmack/packages-skysmack-core';
import { Package } from '@skysmack/framework';
import { NgPackagesFieldsConfig } from '../../ng-packages-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';

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
}
