import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { BaseComponent } from '@skysmack/portal-fields';

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
