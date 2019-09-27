import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupReservationsAppState, GroupReservation, GROUP_RESERVATIONS_AREA_KEY } from '@skysmack/packages-lodging-reservations';
import { MenuItem } from '@skysmack/framework';
import { NgFieldActions } from '@skysmack/ng-framework';
import { NgGroupReservationsFieldsConfig } from '../../ng-group-reservations-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { DocumentRecordIndexComponent } from '@skysmack/portal-fields';
import { NgGroupReservationsActions, NgGroupReservationsStore } from '@skysmack/ng-lodging-reservations';

@Component({
  selector: 'ss-group-reservations-index',
  templateUrl: './group-reservations-index.component.html'
})
export class GroupReservationsIndexComponent extends DocumentRecordIndexComponent<GroupReservationsAppState, GroupReservation, number> implements OnInit {
  public static COMPONENT_KEY = 'group-reservations-index';
  public componentKey = GroupReservationsIndexComponent.COMPONENT_KEY;

  public areaKey = GROUP_RESERVATIONS_AREA_KEY;
  public titleExtras = true;

  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgGroupReservationsActions,
    public redux: NgSkysmackStore,
    public store: NgGroupReservationsStore,
    public fieldsConfig: NgGroupReservationsFieldsConfig,
    public fieldActions: NgFieldActions,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, fieldActions, menuItemActionProviders, title);
  }


  ngOnInit() {
    super.ngOnInit();
  }
}
