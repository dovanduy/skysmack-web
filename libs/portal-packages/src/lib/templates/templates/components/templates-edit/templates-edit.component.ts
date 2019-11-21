import { Component, OnInit } from '@angular/core';
import { Template, TemplatesAppState } from '@skysmack/packages-templates';
import { NgTemplatesActions, NgTemplatesStore } from '@skysmack/ng-templates';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgTemplatesFieldsConfig } from '../../ng-templates-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';
import { FormHelper } from '@skysmack/ng-dynamic-forms';
import { LocalObjectStatus, reinstantiateLocalRecord } from '@skysmack/framework';

@Component({
  selector: 'ss-templates-edit',
  templateUrl: './templates-edit.component.html'
})
export class TemplatesEditComponent extends RecordFormComponent<TemplatesAppState, Template, number> implements OnInit {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgTemplatesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgTemplatesFieldsConfig,
    public store: NgTemplatesStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }

  protected create(fh: FormHelper) {
    fh.formValid(() => {
      const localObject = this.extractFormValues(fh);



      this.editorItem ? localObject.localId = this.editorItem.localId : localObject.localId = localObject.localId;
      this.actions.add([localObject], this.packagePath);
      this.editorNavService.hideEditorNav();
    });
  }

  protected update(fh: FormHelper) {
    fh.formValid(() => {
      const oldValue = { ...this.selectedEntity };
      const newValue = this.extractFormValues(fh, this.selectedEntity);

      // Convert dataRoutes back to a dictionary. Was turned into an array in fields config so it can be used with KeyValueFieldComponent.
      const dataRoutes: { key: string, value: string }[] = newValue.object.dataRoutes as any;
      newValue.object.dataRoutes = dataRoutes && dataRoutes.reduce((a, b) => {
        a[b.key] = b.value;
        return a;
      }, {});

      newValue.oldObject = oldValue.object;
      newValue.status = LocalObjectStatus.MODIFYING;

      // newValue reference somehow overrides above changes done to dataRoutes. To ensure they aren't overwritten, a clone is made.
      const clonedValue = reinstantiateLocalRecord(JSON.parse(JSON.stringify(newValue, undefined, 2)));


      this.actions.update([clonedValue], this.packagePath);
      this.editorNavService.hideEditorNav();
    });
  }
}
