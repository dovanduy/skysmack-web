import { Component, OnInit } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgLodgingPricesActions, NgLodgingPricesStore } from '@skysmack/ng-packages';
import { LodgingPricesAppState, LodgingPrice } from '@skysmack/packages-reservations-pricings';
import { NgLodgingPricesFieldsConfig } from '../../ng-lodging-prices-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-lodging-prices-create',
  templateUrl: './lodging-prices-create.component.html'
})
export class LodgingPricesCreateComponent extends RecordFormComponent<LodgingPricesAppState, LodgingPrice, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgLodgingPricesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgLodgingPricesFieldsConfig,
    public store: NgLodgingPricesStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }
}
