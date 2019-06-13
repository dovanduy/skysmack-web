import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, DocumentRecordIndexComponent, EntityActionProviders, ENTITY_ACTIONS_EDIT, ENTITY_ACTION_DETAILS, ENTITY_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgPersonsActions, NgPersonsPermissions } from '@skysmack/ng-packages';
import { NgSkysmackStore, NgSkysmackActions } from '@skysmack/ng-core';
import { NgPersonsStore } from '@skysmack/ng-packages';
import { Person, PersonsAppState, PERSONS_AREA_KEY } from '@skysmack/packages-persons';
import { NgPersonsMenu } from '../../../ng-persons-menu';
import { EntityAction } from '@skysmack/ng-ui';
import { NgFieldActions } from '@skysmack/ng-framework';
import { NgPersonsFieldsConfig } from '../../../ng-persons-fields-config';

@Component({
  selector: 'ss-persons-index',
  templateUrl: './persons-index.component.html'
})
export class PersonsIndexComponent extends DocumentRecordIndexComponent<PersonsAppState, Person, number> implements OnInit {
  public areaKey: string = PERSONS_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('details', ENTITY_ACTION_DETAILS, 'list'),
    new EntityAction().asUrlAction('edit', ENTITY_ACTIONS_EDIT, 'edit').setPermissions([
      NgPersonsPermissions.updatePersons,
    ]),
    new EntityAction().asEventAction(ENTITY_ACTIONS_DELETE, this.delete, 'delete', this).setPermissions([
      NgPersonsPermissions.removePersons,
    ])
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgPersonsActions,
    public skysmackStore: NgSkysmackStore,
    public skysmackActions: NgSkysmackActions,
    public store: NgPersonsStore,
    public sidebarMenu: NgPersonsMenu,
    public fieldsConfig: NgPersonsFieldsConfig,
    public fieldActions: NgFieldActions,
    public title: EntityComponentPageTitle,
    public entityActionProviders: EntityActionProviders,
    public permissions: NgPersonsPermissions
  ) {
    super(router, activatedRoute, actions, skysmackStore, store, fieldsConfig, fieldActions, entityActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
