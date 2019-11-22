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
  selector: 'ss-pass-codes-edit',
  templateUrl: './pass-codes-edit.component.html'
})
export class PassCodesEditComponent extends DocumentRecordFormComponent<PassCodesAppState, PassCode, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgPassCodesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgPassCodesFieldsConfig,
    public store: NgPassCodesStore,
    public fieldActions: NgFieldActions
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig, fieldActions);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}
