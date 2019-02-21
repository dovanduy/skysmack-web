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
  public selectedPackage: LocalObject<Package, string>;

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
      const newPackage = toLocalObject<Package, string>(fh.form.getRawValue(), 'path');
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
