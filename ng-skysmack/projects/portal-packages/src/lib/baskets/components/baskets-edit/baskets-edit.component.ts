import { Component, OnInit } from '@angular/core';
import { Basket, BasketsAppState } from '@skysmack/packages-baskets';
import { NgBasketsActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgBasketsFieldsConfig, NgBasketFormDependencies } from '@skysmack/ng-packages';
import { DocumentRecordFormComponent } from '@skysmack/portal-ui';
import { NgBasketsStore } from '@skysmack/ng-packages';
import { NgFieldActions, NgFieldReduxStore } from '@skysmack/ng-redux';

@Component({
  selector: 'ss-baskets-edit',
  templateUrl: './baskets-edit.component.html',
  styleUrls: ['./baskets-edit.component.scss']
})
export class BasketsEditComponent extends DocumentRecordFormComponent<BasketsAppState, Basket, number, NgBasketFormDependencies> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgBasketsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgBasketsFieldsConfig,
    public store: NgBasketsStore,
    public fieldActions: NgFieldActions,
    public fieldStore: NgFieldReduxStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig, fieldActions, fieldStore);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}
