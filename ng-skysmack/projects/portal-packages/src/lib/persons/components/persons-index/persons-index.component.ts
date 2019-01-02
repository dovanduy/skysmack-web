import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, EntityAction, DocumentRecordIndexComponet } from 'lib/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgPersonsActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { NgPersonsStore, NgPersonsMenu } from '@skysmack/ng-packages';
import { Person, PersonsAppState } from '@skysmack/packages-persons';


@Component({
  selector: 'ss-persons-index',
  templateUrl: './persons-index.component.html',
  styleUrls: ['./persons-index.component.scss']
})
export class PersonsIndexComponent extends DocumentRecordIndexComponet<PersonsAppState, Person, number> implements OnInit {

  public displayedColumns = ['firstName', 'lastName'];
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
    public sidebarMenu: NgPersonsMenu
  ) {
    super(router, activatedRoute, actions, redux, store);

  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}
