import { Component, OnInit } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgLodgingAllocatedPricesActions, NgLodgingAllocatedPricesStore } from '@skysmack/ng-packages';
import { LodgingAllocatedPricesAppState, LodgingAllocatedPrice } from '@skysmack/packages-reservations-pricings';
import { NgLodgingAllocatedPricesFieldsConfig } from '../../ng-lodging-allocated-prices-fields-config';

@Component({
  selector: 'ss-lodging-allocated-prices-create',
  templateUrl: './lodging-allocated-prices-create.component.html'
})
export class LodgingAllocatedPricesCreateComponent extends RecordFormComponent<LodgingAllocatedPricesAppState, LodgingAllocatedPrice, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgLodgingAllocatedPricesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgLodgingAllocatedPricesFieldsConfig,
    public store: NgLodgingAllocatedPricesStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }
}
