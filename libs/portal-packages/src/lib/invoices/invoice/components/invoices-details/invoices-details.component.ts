import { Component, OnInit } from '@angular/core';
import { BaseComponent, EditorNavService } from '@skysmack/portal-ui';
import { InvoicesAppState } from 'libs/packages/invoices/src';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-core';

@Component({
  selector: 'skysmack-invoices-details',
  templateUrl: './invoices-details.component.html'
})
export class InvoicesDetailsComponent extends BaseComponent<InvoicesAppState, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public editorNavService: EditorNavService
  ) {
    super(router, activatedRoute, skysmackStore);
  }

  ngOnInit() {
    this.editorNavService.showEditorNav();
  }

}
