import { Component, OnInit } from '@angular/core';
import { Basket, BasketsAppState } from '@skysmack/packages-baskets';
import { NgBasketsActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { DocumentRecordFormComponent } from '@skysmack/portal-ui';
import { NgBasketsStore } from '@skysmack/ng-packages';
import { NgFieldActions } from '@skysmack/ng-redux';
import { NgBasketsFieldsConfig } from '../../ng-baskets-fields-config';

@Component({
  selector: 'ss-baskets-edit',
  templateUrl: './baskets-edit.component.html',
  styleUrls: ['./baskets-edit.component.scss']
})
export class BasketsEditComponent extends DocumentRecordFormComponent<BasketsAppState, Basket, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgBasketsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgBasketsFieldsConfig,
    public store: NgBasketsStore,
    public fieldActions: NgFieldActions
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig, fieldActions);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}
