import { Component, OnInit } from '@angular/core';
import { Template, TemplatesAppState } from '@skysmack/packages-templates';
import { NgTemplatesActions, NgTemplatesStore } from '@skysmack/ng-templates';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgTemplatesFieldsConfig } from '../../ng-templates-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';
import { FormHelper } from '@skysmack/ng-dynamic-forms';
import { LocalObjectStatus } from '@skysmack/framework';

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
      newValue.object.dataRoutes = (newValue.object.dataRoutes as unknown as { key: string, value: string }[]).reduce((a, b) => {
        a[b.key] = b.value;
        return a;
      }, {});


      console.log(JSON.stringify(oldValue, undefined, 2), JSON.stringify(newValue, undefined, 2));

      newValue.oldObject = oldValue.object;
      newValue.status = LocalObjectStatus.MODIFYING;


      this.actions.update([newValue], this.packagePath);
      this.editorNavService.hideEditorNav();
    });
  }
}
