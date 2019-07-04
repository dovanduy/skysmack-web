import { Component } from '@angular/core';
import { BaseComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-core';

@Component({
  selector: 'ss-invoices-products-index',
  templateUrl: './invoices-products-index.component.html'
})
export class InvoicesProductsIndexComponent extends BaseComponent<any, any> {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
  ) {
    super(router, activatedRoute, skysmackStore);
  }
}
