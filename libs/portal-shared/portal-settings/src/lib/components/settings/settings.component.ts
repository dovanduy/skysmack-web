import { Component, OnInit, Injector } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalObject, RouteData, toLocalObject } from '@skysmack/framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { FormHelper } from '@skysmack/ng-dynamic-forms';
import { combineLatest, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { NgSettingsActions, NgSettingsStore } from '@skysmack/ng-framework';
import { SettingsAppState } from '@skysmack/redux';
import { EditorNavService } from '@skysmack/portal-ui';
import { BaseComponent } from '@skysmack/portal-fields';
import { FieldsConfig } from '@skysmack/ng-fields';

@Component({
  selector: 'ss-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent extends BaseComponent<SettingsAppState<any>, unknown> implements OnInit {

  public editorItem: LocalObject<any, unknown>;
  public selectedSettings: LocalObject<any, unknown>;
  public fieldsConfig: FieldsConfig<any, any>;
  public settingsKey: string;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgSettingsActions,
    public skysmackStore: NgSkysmackStore,
    public store: NgSettingsStore,
    public injector: Injector
  ) {
    super(router, activatedRoute, skysmackStore);
  }

  ngOnInit() {
    super.ngOnInit();
    this.editorNavService.showEditorNav();
    const settingsKey = this.router.url.split('/')[3];
    this.settingsKey = settingsKey ? settingsKey : 'default';
    this.actions.get(this.packagePath, this.settingsKey);
    this.setFields();
  }

  public onSettingsSubmit(fh: FormHelper) {
    const values = fh.form.getRawValue();
    this.actions.update(toLocalObject(values, 'none'), this.packagePath, this.settingsKey);
    this.ngOnDestroy();
  }

  protected setFields() {
    this.subscriptionHandler.register(this.activatedRoute.data.pipe(
      map((data: RouteData) => {
        this.fieldsConfig = this.injector.get(data.fieldsConfigToken);
      })
    ).subscribe());

    this.fields$ = combineLatest(
      this.store.get(this.packagePath, this.settingsKey),
      this.skysmackStore.getEditorItem(),
    ).pipe(
      switchMap(values => {
        const settings = values[0];
        this.editorItem = values[1] as LocalObject<any, unknown>;
        this.editorItem ? this.selectedSettings = this.editorItem : this.selectedSettings = settings;
        return this.fieldsConfig ? this.fieldsConfig.getFields(undefined, this.selectedSettings) : of([]);
      })
    );
  }
}
