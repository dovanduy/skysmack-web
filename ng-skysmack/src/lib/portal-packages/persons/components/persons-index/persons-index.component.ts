import { Component, OnInit } from '@angular/core';
import { RecordIndexComponent } from 'lib/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgPersonsActions } from 'lib/ng-packages/persons/redux/ng-persons-actions';
import { NgPersonsRedux } from 'lib/ng-packages/persons/redux/ng-persons-redux';

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
    public redux: NgPersonsRedux,
  ) {
    super(router, activatedRoute, actions, redux);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
