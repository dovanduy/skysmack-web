import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE, } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgApplicationsActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgApplicationsStore } from '@skysmack/ng-packages';
import { Application, ApplicationsAppState, APPLICATIONS_AREA_KEY } from '@skysmack/packages-identities';
import { NgApplicationsMenu } from '../../ng-applications-menu';
import { MenuItem } from '@skysmack/framework';
import { NgApplicationsFieldsConfig } from '../../ng-applications-fields-config';
import { RecordIndexComponent } from '@skysmack/portal-fields';


@Component({
  selector: 'ss-applications-index',
  templateUrl: './applications-index.component.html'
})
export class ApplicationsIndexComponent extends RecordIndexComponent<ApplicationsAppState, Application, number> implements OnInit {

  public areaKey: string = APPLICATIONS_AREA_KEY;
  public titleExtras = true;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgApplicationsActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgApplicationsStore,
    public sidebarMenu: NgApplicationsMenu,
    public fieldsConfig: NgApplicationsFieldsConfig,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
