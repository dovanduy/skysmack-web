import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgPackagesActions } from 'lib/ng-packages/packages/redux/ng-packages-actions';
import { NgSkysmackStore } from 'lib/ng-packages/skysmack/redux/ng-skysmack-store';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from 'lib/portal-ui/components/common/container/editor-nav.service';
import { NgPackagesFieldsConfig } from 'lib/ng-packages/packages/ng-packages-fields-config';
import { NgPackagesStore } from 'lib/ng-packages/packages';
import { BaseComponent } from 'lib/portal-ui/base-components/base-component';
import { PackagesAppState } from '@skysmack/packages';
import { Field } from 'lib/portal-ui/fields/field';
import { FormHelper } from 'lib/portal-ui/forms/form-helper';
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
