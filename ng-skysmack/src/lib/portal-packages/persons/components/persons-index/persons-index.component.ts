import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, EntityAction, RecordPagedIndexComponent } from 'lib/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgPersonsActions } from 'lib/ng-packages/persons/redux/ng-persons-actions';
import { NgSkysmackRedux } from 'lib/ng-packages/skysmack';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { NgPersonsStore } from 'lib/ng-packages/persons';
import { Person } from '@skysmack/packages-persons';


@Component({
  selector: 'ss-persons-index',
  templateUrl: './persons-index.component.html',
  styleUrls: ['./persons-index.component.scss']
})
export class PersonsIndexComponent extends RecordPagedIndexComponent<Person> implements OnInit {

  public displayedColumns = ['firstName', 'lastName'];
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    // new EntityAction().asEventAction('Delete', this.delete, 'delete')
  ];


  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgPersonsActions,
    public redux: NgSkysmackRedux,
    public title: EntityComponentPageTitle,
    public store: NgPersonsStore
  ) {
    super(router, activatedRoute, actions, redux);

  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.path);
    timer(500).pipe(take(1)).subscribe(() => {
      this.entities$ = this.store.get(this.path);
      this.actions.getPaged(this.path, this.pagedQuery);
    });
  }
}
