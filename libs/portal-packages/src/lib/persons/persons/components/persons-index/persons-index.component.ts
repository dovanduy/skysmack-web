import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTION_DETAILS, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgPersonsActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgPersonsStore } from '@skysmack/ng-packages';
import { Person, PersonsAppState, PERSONS_AREA_KEY, PersonsPermissions } from '@skysmack/packages-persons';
import { NgPersonsMenu } from '../../../ng-persons-menu';
import { MenuItem } from '@skysmack/framework';
import { NgFieldActions } from '@skysmack/ng-framework';
import { NgPersonsFieldsConfig } from '../../../ng-persons-fields-config';
import { DocumentRecordIndexComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-persons-index',
  templateUrl: './persons-index.component.html'
})
export class PersonsIndexComponent extends DocumentRecordIndexComponent<PersonsAppState, Person, number> implements OnInit {
  public areaKey: string = PERSONS_AREA_KEY;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('details', MENU_ITEM_ACTION_DETAILS, 'list'),
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit').setPermissions([
      PersonsPermissions.updatePersons,
    ]),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this).setPermissions([
      PersonsPermissions.removePersons,
    ])
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgPersonsActions,
    public skysmackStore: NgSkysmackStore,
    public store: NgPersonsStore,
    public sidebarMenu: NgPersonsMenu,
    public fieldsConfig: NgPersonsFieldsConfig,
    public fieldActions: NgFieldActions,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, skysmackStore, store, fieldsConfig, fieldActions, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
