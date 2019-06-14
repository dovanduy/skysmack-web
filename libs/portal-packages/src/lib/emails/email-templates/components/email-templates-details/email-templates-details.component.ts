import { Component, OnInit } from '@angular/core';
import { EditorNavService, DetailsBaseComponent } from '@skysmack/portal-ui';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgEmailTemplatesFieldsConfig } from '../../ng-email-templates-fields-config';
import { NgEmailTemplatesActions, NgEmailTemplatesStore } from '@skysmack/ng-packages';
import { EmailTemplatesAppState } from '@skysmack/packages-emails';

@Component({
  selector: 'ss-email-templates-details',
  templateUrl: './email-templates-details.component.html'
})
export class EmailTemplatesDetailsComponent extends DetailsBaseComponent<EmailTemplatesAppState, number> implements OnInit {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public actions: NgEmailTemplatesActions,
    public store: NgEmailTemplatesStore,
    public fieldsConfig: NgEmailTemplatesFieldsConfig,
    public editorNavService: EditorNavService
  ) {
    super(router, activatedRoute, skysmackStore, actions, store, fieldsConfig, editorNavService);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
