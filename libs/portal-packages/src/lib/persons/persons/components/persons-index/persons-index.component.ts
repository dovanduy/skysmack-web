import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, DocumentRecordIndexComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgPersonsActions } from '@skysmack/ng-packages';
import { NgSkysmackStore, NgSkysmackActions } from '@skysmack/ng-core';
import { NgPersonsStore } from '@skysmack/ng-packages';
import { Person, PersonsAppState, PERSONS_AREA_KEY } from '@skysmack/packages-persons';
import { NgPersonsMenu } from '../../../ng-persons-menu';
import { EntityAction } from '@skysmack/ng-ui';
import { NgFieldActions } from '@skysmack/ng-redux';
import { NgPersonsFieldsConfig } from '../../../ng-persons-fields-config';

@Component({
  selector: 'ss-persons-index',
  templateUrl: './persons-index.component.html'
})
export class PersonsIndexComponent extends DocumentRecordIndexComponent<PersonsAppState, Person, number> implements OnInit {


  public area: string = PERSONS_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('details', 'Details', 'list'),
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgPersonsActions,
    public skysmackStore: NgSkysmackStore,
    public skysmackActions: NgSkysmackActions,
    public title: EntityComponentPageTitle,
    public store: NgPersonsStore,
    public sidebarMenu: NgPersonsMenu,
    public fieldsConfig: NgPersonsFieldsConfig,
    public fieldActions: NgFieldActions
  ) {
    super(router, activatedRoute, actions, skysmackStore, store, fieldsConfig, fieldActions);
  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
    this.skysmackActions.getPermissions(this.packagePath);
  }
}
