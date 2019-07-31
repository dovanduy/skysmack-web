import { Component, OnInit } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgLodgingTypePricesActions, NgLodgingTypePricesStore } from '@skysmack/ng-reservations-pricings';
import { LodgingTypePricesAppState, LodgingTypePrice } from '@skysmack/packages-reservations-pricings';
import { NgLodgingTypePricesFieldsConfig } from '../../ng-lodging-type-prices-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-lodging-type-prices-create',
  templateUrl: './lodging-type-prices-create.component.html'
})
export class LodgingTypePricesCreateComponent extends RecordFormComponent<LodgingTypePricesAppState, LodgingTypePrice, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgLodgingTypePricesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgLodgingTypePricesFieldsConfig,
    public store: NgLodgingTypePricesStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }
}
