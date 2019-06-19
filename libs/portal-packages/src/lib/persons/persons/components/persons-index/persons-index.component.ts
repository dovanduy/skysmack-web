import { Component, OnInit, Inject } from '@angular/core';
import { EntityComponentPageTitle, DocumentRecordIndexComponent, EntityActionProviders, ENTITY_ACTIONS_EDIT, ENTITY_ACTION_DETAILS, ENTITY_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgPersonsActions } from '@skysmack/ng-packages';
import { NgSkysmackStore, NgSkysmackActions } from '@skysmack/ng-core';
import { NgPersonsStore } from '@skysmack/ng-packages';
import { Person, PersonsAppState, PERSONS_AREA_KEY, PersonsPermissions } from '@skysmack/packages-persons';
import { NgPersonsMenu } from '../../../ng-persons-menu';
import { EntityAction } from '@skysmack/ng-ui';
import { SignalR } from '@skysmack/signal-r';
import { NgFieldActions } from '@skysmack/ng-framework';
import { NgPersonsFieldsConfig } from '../../../ng-persons-fields-config';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { SignalRPersonProvider } from '../../../signal-r-persons-provider';

@Component({
  selector: 'ss-persons-index',
  templateUrl: './persons-index.component.html'
})
export class PersonsIndexComponent extends DocumentRecordIndexComponent<PersonsAppState, Person, number> implements OnInit {
  public areaKey: string = PERSONS_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('details', ENTITY_ACTION_DETAILS, 'list'),
    new EntityAction().asUrlAction('edit', ENTITY_ACTIONS_EDIT, 'edit').setPermissions([
      PersonsPermissions.updatePersons,
    ]),
    new EntityAction().asEventAction(ENTITY_ACTIONS_DELETE, this.delete, 'delete', this).setPermissions([
      PersonsPermissions.removePersons,
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
    @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
  ) {
    super(router, activatedRoute, actions, skysmackStore, store, fieldsConfig, fieldActions, entityActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();      
    SignalR.API_DOMAIN = this.apiDomain;
    const signalr = SignalR.Instance;
    signalr.registerProvider(new SignalRPersonProvider({ name: 'PersonsProvider' }));

    // super.ngOnInit();
    // console.log("packagePath: " + this.packagePath);
    // setTimeout(() => {      
    //   console.log('joining package...');
    //   signalr.join(this.packagePath);
    // }, 1000);    
  }
}
