import { Component, OnInit } from '@angular/core';
import { Webhook, WebhooksAppState } from '@skysmack/packages-webhooks';
import { NgWebhooksActions, NgWebhooksStore } from '@skysmack/ng-webhooks';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgWebhooksFieldsConfig } from '../../ng-webhooks-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-webhooks-create',
  templateUrl: './webhooks-create.component.html'
})
export class WebhooksCreateComponent extends RecordFormComponent<WebhooksAppState, Webhook, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgWebhooksActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgWebhooksFieldsConfig,
    public store: NgWebhooksStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }
}
