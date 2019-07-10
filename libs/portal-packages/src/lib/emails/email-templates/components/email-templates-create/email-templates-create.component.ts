import { Component, OnInit } from '@angular/core';
import { EmailTemplate, EmailTemplatesAppState } from '@skysmack/packages-emails';
import { NgEmailTemplatesActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgEmailTemplatesStore } from '@skysmack/ng-packages';
import { NgEmailTemplatesFieldsConfig } from '../../ng-email-templates-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-email-templates-create',
  templateUrl: './email-templates-create.component.html'
})
export class EmailTemplatesCreateComponent extends RecordFormComponent<EmailTemplatesAppState, EmailTemplate, number> implements OnInit {

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
    this.setCreateFields();
  }

}
