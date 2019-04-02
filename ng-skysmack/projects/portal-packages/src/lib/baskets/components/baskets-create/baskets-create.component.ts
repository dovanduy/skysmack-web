import { Component, OnInit } from '@angular/core';
import { Basket, BasketsAppState } from '@skysmack/packages-baskets';
import { NgBasketsActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { DocumentRecordFormComponent } from '@skysmack/portal-ui';
import { NgBasketsStore } from '@skysmack/ng-packages';
import { NgFieldActions, NgFieldStore } from '@skysmack/ng-redux';
import { NgBasketsFieldsConfig, NgBasketFormDependencies } from '../../ng-baskets-fields-config';

@Component({
  selector: 'ss-baskets-create',
  templateUrl: './baskets-create.component.html',
  styleUrls: ['./baskets-create.component.scss']
})
export class BasketsCreateComponent extends DocumentRecordFormComponent<BasketsAppState, Basket, number, NgBasketFormDependencies> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgBasketsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgBasketsFieldsConfig,
    public store: NgBasketsStore,
    public fieldActions: NgFieldActions,
    public fieldStore: NgFieldStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig, fieldActions, fieldStore);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }

}
