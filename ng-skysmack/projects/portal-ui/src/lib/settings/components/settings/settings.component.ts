import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalObject, RouteData, toLocalObject } from '@skysmack/framework';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { FormHelper, FieldsConfig, Validation } from '@skysmack/ng-ui';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgSettingsActions, NgSettingsStore } from '@skysmack/ng-redux';
import { SettingsAppState } from '@skysmack/redux';
import { EditorNavService } from '../../../components/common/container/editor-nav.service';
import { BaseComponent } from '../../../base-components/base-component';

@Component({
  selector: 'ss-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends BaseComponent<SettingsAppState, unknown> implements OnInit, OnDestroy {

  public editorItem: LocalObject<any, unknown>;
  public selectedSettings: LocalObject<any, unknown>;
  public fieldsConfig: FieldsConfig<any, any, any>;

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
    this.setFields();
  }

  ngOnDestroy() {
    this.editorNavService.hideEditorNav();
    super.ngOnDestroy();
  }

  public onSubmit(fh: FormHelper) {
    const values = fh.form.getRawValue();
    this.actions.update(toLocalObject(values, 'none'), this.packagePath);
  }

  protected setFields() {
    this.actions.get(this.packagePath);

    this.activatedRoute.data.pipe(
      map((data: RouteData) => {
        this.fieldsConfig = this.injector.get(data.fieldsConfigToken);
      })
    ).subscribe();

    this.fields$ = combineLatest(
      this.store.get(this.packagePath),
      this.skysmackStore.getEditorItem(),
    ).pipe(
      map(values => {
        const settings = values[0];
        this.editorItem = values[1] as LocalObject<any, unknown>;
        this.editorItem ? this.selectedSettings = this.editorItem : this.selectedSettings = settings;

        return this.fieldsConfig ? this.fieldsConfig.getFields(this.selectedSettings) : [];
      })
    );
  }
}
