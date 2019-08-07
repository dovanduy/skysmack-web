import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE, } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgApplicationsActions, NgApplicationsStore } from '@skysmack/ng-identities';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { Application, ApplicationsAppState, APPLICATIONS_AREA_KEY } from '@skysmack/packages-identities';
import { MenuItem } from '@skysmack/framework';
import { NgApplicationsFieldsConfig } from '../../ng-applications-fields-config';
import { RecordIndexComponent } from '@skysmack/portal-fields';


@Component({
  selector: 'ss-applications-index',
  templateUrl: './applications-index.component.html'
})
export class ApplicationsIndexComponent extends RecordIndexComponent<ApplicationsAppState, Application, number> implements OnInit {
  public static COMPONENT_KEY = 'applications-index';
  public componentKey = ApplicationsIndexComponent.COMPONENT_KEY;

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
    public fieldsConfig: NgApplicationsFieldsConfig,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
