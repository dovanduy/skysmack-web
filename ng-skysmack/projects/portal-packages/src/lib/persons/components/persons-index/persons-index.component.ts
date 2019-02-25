import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, DocumentRecordIndexComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgPersonsActions, NgPersonsFieldsConfig } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { NgPersonsStore } from '@skysmack/ng-packages';
import { Person, PersonsAppState } from '@skysmack/packages-persons';
import { NgPersonsMenu } from './../../ng-persons-menu';
import { EntityAction, Field } from '@skysmack/ng-ui';

@Component({
  selector: 'ss-persons-index',
  templateUrl: './persons-index.component.html',
  styleUrls: ['./persons-index.component.scss']
})
export class PersonsIndexComponent extends DocumentRecordIndexComponent<PersonsAppState, Person, number> implements OnInit {

  public fields: Field[];
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgPersonsActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgPersonsStore,
    public sidebarMenu: NgPersonsMenu,
    public fieldsConfig: NgPersonsFieldsConfig
  ) {
    super(router, activatedRoute, actions, redux, store);
  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
    this.fields = this.fieldsConfig.getStaticFields();
  }
}
