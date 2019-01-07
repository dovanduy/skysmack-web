import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgPackagesActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgPackagesFieldsConfig } from '@skysmack/ng-packages';
import { NgPackagesStore } from '@skysmack/ng-packages';
import { BaseComponent } from '@skysmack/portal-ui';
import { PackagesAppState } from '@skysmack/packages-skysmack-core';
import { Field } from '@skysmack/ng-ui';
import { FormHelper } from '@skysmack/ng-ui';
import { LocalObjectStatus, toLocalObject, Package } from '@skysmack/framework';

@Component({
  selector: 'ss-packages-create',
  templateUrl: './packages-create.component.html',
  styleUrls: ['./packages-create.component.scss']
})
export class PackagesCreateComponent extends BaseComponent<PackagesAppState, string> implements OnInit, OnDestroy {

  public fields: Field[];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgPackagesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgPackagesFieldsConfig,
    public store: NgPackagesStore,
  ) {
    super(router, activatedRoute, redux);
  }

  ngOnInit() {
    super.ngOnInit();
    this.actions.getAvailablePackages();

    this.subscriptionHandler.register(this.store.getAvailablePackages().subscribe(availablePackages => {
      this.fields = this.fieldsConfig.getStaticFields(undefined, { availablePackages });
    }));

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
