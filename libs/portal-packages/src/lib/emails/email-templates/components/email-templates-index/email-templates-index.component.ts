import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, EntityActionProviders, ENTITY_ACTION_DETAILS, ENTITY_ACTIONS_EDIT, ENTITY_ACTIONS_DELETE, RecordIndexComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgEmailTemplatesActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgEmailTemplatesStore } from '@skysmack/ng-packages';
import { EmailTemplate, EmailTemplatesAppState, EMAIL_TEMPLATES_AREA_KEY } from '@skysmack/packages-emails';
import { NgEmailTemplatesMenu } from './../../ng-email-templates-menu';
import { EntityAction } from '@skysmack/ng-ui';
import { NgEmailTemplatesFieldsConfig } from '../../ng-email-templates-fields-config';

@Component({
  selector: 'ss-email-templates-index',
  templateUrl: './email-templates-index.component.html'
})
export class EmailTemplatesIndexComponent extends RecordIndexComponent<EmailTemplatesAppState, EmailTemplate, number> implements OnInit {

  public areaKey: string = EMAIL_TEMPLATES_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('items', 'EMAIL_TEMPLATES.ENTITY_ACTION.ITEMS', 'reorder'),
    new EntityAction().asUrlAction('details', ENTITY_ACTION_DETAILS, 'list'),
    new EntityAction().asUrlAction('edit', ENTITY_ACTIONS_EDIT, 'edit'),
    new EntityAction().asEventAction(ENTITY_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgEmailTemplatesActions,
    public skysmackStore: NgSkysmackStore,
    public store: NgEmailTemplatesStore,
    public sidebarMenu: NgEmailTemplatesMenu,
    public fieldsConfig: NgEmailTemplatesFieldsConfig,
    public title: EntityComponentPageTitle,
    public entityActionProviders: EntityActionProviders
  ) {
    super(router, activatedRoute, actions, skysmackStore, store, fieldsConfig, entityActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
