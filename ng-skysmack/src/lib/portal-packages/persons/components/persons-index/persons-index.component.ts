import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, EntityAction, RecordPagedIndexComponent } from 'lib/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgPersonsActions } from 'lib/ng-packages/persons/redux/ng-persons-actions';
import { NgSkysmackRedux } from 'lib/ng-packages/skysmack';
import { NgPersonsStore, NgPersonsMenu } from 'lib/ng-packages/persons';
import { Person, PersonsAppState } from '@skysmack/packages-persons';


@Component({
  selector: 'ss-persons-index',
  templateUrl: './persons-index.component.html',
  styleUrls: ['./persons-index.component.scss']
})
export class PersonsIndexComponent extends RecordPagedIndexComponent<PersonsAppState, Person, number> implements OnInit {

  public displayedColumns = ['firstName', 'lastName'];
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete')
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgPersonsActions,
    public redux: NgSkysmackRedux,
    public title: EntityComponentPageTitle,
    public store: NgPersonsStore,
    public sidebarMenu: NgPersonsMenu
  ) {
    super(router, activatedRoute, actions, redux, store);

  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.path);
  }
}
