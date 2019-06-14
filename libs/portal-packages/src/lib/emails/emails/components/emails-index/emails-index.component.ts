import { Component, OnInit } from '@angular/core';
// import { EntityComponentPageTitle, RecordIndexComponent, EntityActionProviders, ENTITY_ACTION_DETAILS, ENTITY_ACTIONS_EDIT, ENTITY_ACTIONS_DELETE } from '@skysmack/portal-ui';
// import { Router, ActivatedRoute } from '@angular/router';
// import { NgEmailsActions } from '@skysmack/ng-packages';
// import { NgSkysmackStore } from '@skysmack/ng-core';
// import { NgEmailsStore } from '@skysmack/ng-packages';
// import { Invoice, EmailsAppState, INVOICES_AREA_KEY } from '@skysmack/packages-emails';
// import { NgEmailsMenu } from './../../ng-emails-menu';
// import { EntityAction } from '@skysmack/ng-ui';
// import { NgFieldActions } from '@skysmack/ng-framework';
// import { NgEmailsFieldsConfig } from '../../ng-emails-fields-config';

@Component({
  selector: 'ss-emails-index',
  templateUrl: './emails-index.component.html'
})
export class EmailsIndexComponent /* extends RecordIndexComponent<EmailsAppState, Invoice, number> */ implements OnInit {

  // public areaKey: string = EMAILS_AREA_KEY;
  // public entityActions: EntityAction[] = [
  //   new EntityAction().asUrlAction('edit', ENTITY_ACTIONS_EDIT, 'edit'),
  //   new EntityAction().asEventAction(ENTITY_ACTIONS_DELETE, this.delete, 'delete', this)
  // ];

  // constructor(
  //   public router: Router,
  //   public activatedRoute: ActivatedRoute,
  //   public actions: NgEmailsActions,
  //   public skysmackStore: NgSkysmackStore,
  //   public store: NgEmailsStore,
  //   public sidebarMenu: NgEmailsMenu,
  //   public fieldsConfig: NgEmailsFieldsConfig,
  //   public fieldActions: NgFieldActions,
  //   public title: EntityComponentPageTitle,
  //   public entityActionProviders: EntityActionProviders
  // ) {
  //   super(router, activatedRoute, actions, skysmackStore, store, fieldsConfig, fieldActions, entityActionProviders, title);
  // }

  ngOnInit() {
    // super.ngOnInit();
  }
}
