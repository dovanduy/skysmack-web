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
import { Package, LocalObject, toLocalObject, LocalObjectStatus } from '@skysmack/framework';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ss-packages-edit',
  templateUrl: './packages-edit.component.html',
  styleUrls: ['./packages-edit.component.scss']
})
export class PackagesEditComponent extends BaseComponent<PackagesAppState, string> implements OnInit, OnDestroy {

  public fields: Field[];
  public selectedPackage: LocalObject<Package>;

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
    this.actions.getSingle(this.entityId);

    this.subscriptionHandler.register(combineLatest(
      this.store.getSingle(this.entityId),
      this.store.getAvailablePackages()
    ).pipe(
      map(values => {
        const [_package, availablePackages] = values;
        this.selectedPackage = _package;
        this.fields = this.fieldsConfig.getStaticFields(_package, { availablePackages });
      })
    ).subscribe());

    this.editorNavService.showEditorNav();
  }

  onUpdateSubmit(fh: FormHelper) {
    fh.formValid(() => {
      const newPackage = toLocalObject(fh.form.getRawValue());
      newPackage.oldObject = this.selectedPackage.object;
      newPackage.status = LocalObjectStatus.MODIFYING;
      this.actions.update([newPackage]);
      this.editorNavService.hideEditorNav();
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.editorNavService.hideEditorNav();
  }
}
