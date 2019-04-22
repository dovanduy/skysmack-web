import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgPackagesActions } from '@skysmack/ng-core';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgPackagesStore } from '@skysmack/ng-core';
import { BaseComponent } from '@skysmack/portal-ui';
import { PackagesAppState } from '@skysmack/packages-skysmack-core';
import { Field } from '@skysmack/ng-ui';
import { FormHelper } from '@skysmack/ng-ui';
import { Package, LocalObject, toLocalObject, LocalObjectStatus } from '@skysmack/framework';
import { combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { NgPackagesFieldsConfig } from '../../ng-packages-fields-config';

@Component({
  selector: 'ss-packages-edit',
  templateUrl: './packages-edit.component.html'
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

    this.fields$ = combineLatest(
      this.store.getSingle(this.entityId),
      this.store.getAvailablePackages()
    ).pipe(
      switchMap(values => {
        const [_package, availablePackages] = values;
        this.selectedPackage = _package;
        return this.fieldsConfig.getFields(undefined, _package);
      })
    );

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
