import { Component, OnInit } from '@angular/core';
import { RecordIndexComponent, EntityComponentPageTitle } from 'lib/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgPersonsActions } from 'lib/ng-packages/persons/redux/ng-persons-actions';
import { NgSkysmackRedux } from 'lib/ng-packages/skysmack';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { NgRedux } from '@angular-redux/store';


@Component({
  selector: 'ss-persons-index',
  templateUrl: './persons-index.component.html',
  styleUrls: ['./persons-index.component.scss']
})
export class PersonsIndexComponent extends RecordIndexComponent implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgPersonsActions,
    public redux: NgSkysmackRedux,
    public title: EntityComponentPageTitle,
    public ngRedux: NgRedux<any>
  ) {
    super(router, activatedRoute, actions, redux);

  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.path);
    timer(500).pipe(take(1)).subscribe(() => this.actions.getPaged(this.path, this.pagedQuery));
  }
}
