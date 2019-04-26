import { Component, OnInit } from '@angular/core';
import { NgLodgingPricesActions, NgLodgingPricesStore } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { LodgingPricesAppState, LodgingPrice } from '@skysmack/packages-reservations-pricings';
import { NgLodgingPricesFieldsConfig } from '../../ng-lodging-prices-fields-config';

@Component({
  selector: 'ss-lodging-prices-edit',
  templateUrl: './lodging-prices-edit.component.html'
})
export class LodgingPricesEditComponent extends RecordFormComponent<LodgingPricesAppState, LodgingPrice, number> implements OnInit {
  protected productTypes$;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgLodgingPricesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgLodgingPricesFieldsConfig,
    public store: NgLodgingPricesStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}
