import { Component, OnInit, Optional, Inject } from '@angular/core';
import { EditorNavService } from '@skysmack/portal-ui';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgEmailTemplatesFieldsConfig } from '../../ng-email-templates-fields-config';
import { NgEmailTemplatesActions, NgEmailTemplatesStore } from '../../../../../../../ng-packages/ng-emails/src/lib';
import { EmailTemplatesAppState } from '@skysmack/packages-emails';
import { DetailsBaseComponent } from '@skysmack/portal-fields';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    public editorNavService: EditorNavService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { entityId: number }
  ) {
    super(router, activatedRoute, skysmackStore, actions, store, fieldsConfig, editorNavService, data);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
