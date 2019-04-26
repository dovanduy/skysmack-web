import { Component, OnInit } from '@angular/core';
import { NgLodgingTypeAllocatedPricesActions, NgLodgingTypeAllocatedPricesStore } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { LodgingTypeAllocatedPricesAppState, LodgingTypeAllocatedPrice } from '@skysmack/packages-reservations-pricings';
import { NgLodgingTypeAllocatedPricesFieldsConfig } from '../../ng-lodging-type-allocated-prices-fields-config';

@Component({
  selector: 'ss-lodging-type-allocated-prices-edit',
  templateUrl: './lodging-type-allocated-prices-edit.component.html'
})
export class LodgingTypeAllocatedPricesEditComponent extends RecordFormComponent<LodgingTypeAllocatedPricesAppState, LodgingTypeAllocatedPrice, number> implements OnInit {
  protected productTypes$;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgLodgingTypeAllocatedPricesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgLodgingTypeAllocatedPricesFieldsConfig,
    public store: NgLodgingTypeAllocatedPricesStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}
