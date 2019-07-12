import { Component, OnInit } from '@angular/core';
import { EmailTemplate, EmailTemplatesAppState } from '@skysmack/packages-emails';
import { NgEmailTemplatesActions, NgEmailTemplatesStore } from '../../../../../../../ng-packages/ng-emails/src/lib';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgEmailTemplatesFieldsConfig } from '../../ng-email-templates-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';

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
