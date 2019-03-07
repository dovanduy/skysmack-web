import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseComponent, EditorNavService } from '@skysmack/portal-ui';
import { IdentitiesSettingsAppState, IdentitiesSettings } from '@skysmack/packages-identities';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { Router, ActivatedRoute } from '@angular/router';
import { NgIdentitiesSetingsActions, NgIdentitiesSettingsStore, NgIdentitiesSettingsFieldsConfig } from '@skysmack/ng-packages';
import { LocalObject } from '@skysmack/framework';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormHelper } from '@skysmack/ng-ui';

@Component({
  selector: 'ss-identities-settings',
  templateUrl: './identities-settings.component.html',
  styleUrls: ['./identities-settings.component.scss']
})
export class IdentitiesSettingsComponent extends BaseComponent<IdentitiesSettingsAppState, unknown> implements OnInit, OnDestroy {

  public editorItem: LocalObject<IdentitiesSettings, unknown>;
  public selectedSettings: LocalObject<IdentitiesSettings, unknown>;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgIdentitiesSetingsActions,
    public skysmackStore: NgSkysmackStore,
    public store: NgIdentitiesSettingsStore,
    public fieldsConfig: NgIdentitiesSettingsFieldsConfig
  ) {
    super(router, activatedRoute, skysmackStore);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setFields();
  }

  ngOnDestroy() {
    this.editorNavService.hideEditorNav();
    super.ngOnDestroy();
  }

  public onCreateSubmit(fh: FormHelper) {

  }

  protected setFields() {
    this.actions.get(this.packagePath);

    this.fields$ = combineLatest(
      this.store.getSettings(this.packagePath),
      this.skysmackStore.getEditorItem()
    ).pipe(
      map(values => {
        const settings = values[0];
        this.editorItem = values[1] as LocalObject<IdentitiesSettings, unknown>;
        this.editorItem ? this.selectedSettings = this.editorItem : this.selectedSettings = settings;

        return this.fieldsConfig.getFields(this.selectedSettings);
      })
    );
  }
}
