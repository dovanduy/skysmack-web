import { Component, OnInit } from '@angular/core';
import { EmailTemplate, EmailTemplatesAppState } from '@skysmack/packages-emails';
import { NgEmailTemplatesActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgEmailTemplatesStore } from '@skysmack/ng-packages';
import { NgEmailTemplatesFieldsConfig } from '../../ng-email-templates-fields-config';

@Component({
  selector: 'ss-email-templates-edit',
  templateUrl: './email-templates-edit.component.html'
})
export class EmailTemplatesEditComponent extends RecordFormComponent<EmailTemplatesAppState, EmailTemplate, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgEmailTemplatesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgEmailTemplatesFieldsConfig,
    public store: NgEmailTemplatesStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}
