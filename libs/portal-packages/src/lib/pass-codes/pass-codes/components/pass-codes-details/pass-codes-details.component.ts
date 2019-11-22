import { Component, OnInit } from '@angular/core';
import { EditorNavService } from '@skysmack/portal-ui';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgPassCodesActions, NgPassCodesStore } from '@skysmack/ng-pass-codes';
import { PassCodesAppState } from '@skysmack/packages-pass-codes';
import { NgPassCodesFieldsConfig } from '../../../ng-pass-codes-fields-config';
import { DetailsBaseComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-pass-codes-details',
  templateUrl: './pass-codes-details.component.html'
})
export class PassCodesDetailsComponent extends DetailsBaseComponent<PassCodesAppState, number> implements OnInit {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public actions: NgPassCodesActions,
    public store: NgPassCodesStore,
    public fieldsConfig: NgPassCodesFieldsConfig,
    public editorNavService: EditorNavService
  ) {
    super(router, activatedRoute, skysmackStore, actions, store, fieldsConfig, editorNavService);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
