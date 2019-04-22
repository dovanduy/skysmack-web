import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgPackagesActions } from '@skysmack/ng-core';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { BaseComponent } from '@skysmack/portal-ui';
import { PackagesAppState } from '@skysmack/packages-skysmack-core';
import { FormHelper } from '@skysmack/ng-ui';
import { LocalObjectStatus, toLocalObject, Package } from '@skysmack/framework';
import { map, switchMap } from 'rxjs/operators';
import { NgPackagesFieldsConfig } from '../../ng-packages-fields-config';

@Component({
  selector: 'ss-packages-create',
  templateUrl: './packages-create.component.html'
})
export class PackagesCreateComponent extends BaseComponent<PackagesAppState, string> implements OnInit, OnDestroy {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgPackagesActions,
    public store: NgSkysmackStore,
    public fieldsConfig: NgPackagesFieldsConfig,
  ) {
    super(router, activatedRoute, store);
  }

  ngOnInit() {
    super.ngOnInit();
    this.actions.getAvailablePackages();
    this.fields$ = this.loadedPackage$.pipe(switchMap(loadedPackage => this.fieldsConfig.getFields(loadedPackage)));
    this.editorNavService.showEditorNav();
  }

  onCreateSubmit(fh: FormHelper) {
    fh.formValid(() => {
      this.actions.add([toLocalObject<Package, string>(
        fh.form.getRawValue(),
        'path',
        undefined,
        LocalObjectStatus.CREATING,
        undefined,
        true
      )]);
      this.editorNavService.hideEditorNav();
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.editorNavService.hideEditorNav();
  }
}
