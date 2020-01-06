import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTION_DETAILS, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { EmailTemplate, EmailTemplatesAppState, EMAIL_TEMPLATES_AREA_KEY } from '@skysmack/packages-emails';
import { MenuItem, LocalObject } from '@skysmack/framework';
import { NgEmailTemplatesFieldsConfig } from '../../ng-email-templates-fields-config';
import { RecordIndexComponent } from '@skysmack/portal-fields';
import { NgEmailTemplatesActions, NgEmailTemplatesStore } from '@skysmack/ng-emails'
import { EmailTemplatesDetailsComponent } from '../email-templates-details/email-templates-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'ss-email-templates-index',
  templateUrl: './email-templates-index.component.html'
})
export class EmailTemplatesIndexComponent extends RecordIndexComponent<EmailTemplatesAppState, EmailTemplate, number> implements OnInit {
  public static COMPONENT_KEY = 'email-templates';
  public componentKey = EmailTemplatesIndexComponent.COMPONENT_KEY;

  public areaKey: string = EMAIL_TEMPLATES_AREA_KEY;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asEventAction(MENU_ITEM_ACTION_DETAILS, (_this: EmailTemplatesIndexComponent, value: LocalObject<EmailTemplate, number>) => {
      _this.dialog.open(EmailTemplatesDetailsComponent, {
        width: '500px',
        data: { entityId: value.object.id }
      });
    }, 'list', this),
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgEmailTemplatesActions,
    public skysmackStore: NgSkysmackStore,
    public store: NgEmailTemplatesStore,
    public fieldsConfig: NgEmailTemplatesFieldsConfig,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders,
    private dialog: MatDialog
  ) {
    super(router, activatedRoute, actions, skysmackStore, store, fieldsConfig, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
