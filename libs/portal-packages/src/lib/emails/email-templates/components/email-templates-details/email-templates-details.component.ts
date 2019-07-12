import { Component, OnInit } from '@angular/core';
import { EditorNavService } from '@skysmack/portal-ui';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgEmailTemplatesFieldsConfig } from '../../ng-email-templates-fields-config';
import { NgEmailTemplatesActions, NgEmailTemplatesStore } from '../../../../../../../ng-packages/ng-emails/src/lib';
import { EmailTemplatesAppState } from '@skysmack/packages-emails';
import { DetailsBaseComponent } from '@skysmack/portal-fields';

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
