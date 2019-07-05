import { Component, OnInit } from '@angular/core';
import { NgLodgingTypePricesActions, NgLodgingTypePricesStore } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { LodgingTypePricesAppState, LodgingTypePrice } from '@skysmack/packages-reservations-pricings';
import { NgLodgingTypePricesFieldsConfig } from '../../ng-lodging-type-prices-fields-config';

@Component({
  selector: 'ss-lodging-type-prices-edit',
  templateUrl: './lodging-type-prices-edit.component.html'
})
export class LodgingTypePricesEditComponent extends RecordFormComponent<LodgingTypePricesAppState, LodgingTypePrice, number> implements OnInit {
  protected productTypes$;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgLodgingTypePricesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgLodgingTypePricesFieldsConfig,
    public store: NgLodgingTypePricesStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}
