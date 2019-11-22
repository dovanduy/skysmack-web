import { Component, OnInit } from '@angular/core';
import { PassCode, PassCodesAppState } from '@skysmack/packages-pass-codes';
import { NgPassCodesActions, NgPassCodesStore } from '@skysmack/ng-pass-codes';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { DocumentRecordFormComponent } from '@skysmack/portal-fields';
import { NgFieldActions } from '@skysmack/ng-framework';
import { NgPassCodesFieldsConfig } from '../../../ng-pass-codes-fields-config';

@Component({
  selector: 'ss-pass-codes-create',
  templateUrl: './pass-codes-create.component.html'
})
export class PassCodesCreateComponent extends DocumentRecordFormComponent<PassCodesAppState, PassCode, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgPassCodesActions,
    public skysmackStore: NgSkysmackStore,
    public fieldsConfig: NgPassCodesFieldsConfig,
    public store: NgPassCodesStore,
    public fieldActions: NgFieldActions
  ) {
    super(router, activatedRoute, editorNavService, actions, skysmackStore, store, fieldsConfig, fieldActions);
  }

  ngOnInit() {
    super.ngOnInit();
    if (true) {
      const dasf = 'test';
    }
    this.setCreateFields();
  }
}
