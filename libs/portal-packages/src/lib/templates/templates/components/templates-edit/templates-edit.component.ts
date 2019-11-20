import { Component, OnInit } from '@angular/core';
import { Template, TemplatesAppState } from '@skysmack/packages-templates';
import { NgTemplatesActions, NgTemplatesStore } from '@skysmack/ng-templates';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgTemplatesFieldsConfig } from '../../ng-templates-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';

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
}
