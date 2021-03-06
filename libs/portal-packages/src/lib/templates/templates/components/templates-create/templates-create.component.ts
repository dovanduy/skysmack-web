import { Component, OnInit } from '@angular/core';
import { Template, TemplatesAppState } from '@skysmack/packages-templates';
import { NgTemplatesActions, NgTemplatesStore } from '@skysmack/ng-templates';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgTemplatesFieldsConfig } from '../../ng-templates-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';
import { FormHelper } from '@skysmack/ng-dynamic-forms';

@Component({
  selector: 'ss-templates-create',
  templateUrl: './templates-create.component.html'
})
export class TemplatesCreateComponent extends RecordFormComponent<TemplatesAppState, Template, number> implements OnInit {

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
    this.setCreateFields();
  }

  protected create(fh: FormHelper) {
    fh.formValid(() => {
      const localObject = this.extractFormValues(fh);

      // Convert dataRoutes back to a dictionary. Was turned into an array in fields config so it can be used with KeyValueFieldComponent.
      const dataRoutes: { key: string, value: string }[] = localObject.object.dataRoutes as any;
      localObject.object.dataRoutes = dataRoutes && dataRoutes.reduce((a, b) => {
        a[b.key] = b.value;
        return a;
      }, {});

      this.editorItem ? localObject.localId = this.editorItem.localId : localObject.localId = localObject.localId;
      this.actions.add([localObject], this.packagePath);
      this.editorNavService.hideEditorNav();
    });
  }
}
