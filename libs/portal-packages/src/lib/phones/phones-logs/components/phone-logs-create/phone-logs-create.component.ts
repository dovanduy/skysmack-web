import { Component, OnInit } from '@angular/core';
import { PhoneLog, PhoneLogsAppState } from '@skysmack/packages-phones';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgPhoneLogsFieldsConfig } from '../../ng-phone-logs-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';
import { NgPhoneLogsActions, NgPhoneLogsStore } from '@skysmack/ng-phones';

@Component({
  selector: 'ss-phone-logs-create',
  templateUrl: './phone-logs-create.component.html'
})
export class PhoneLogsCreateComponent extends RecordFormComponent<PhoneLogsAppState, PhoneLog, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgPhoneLogsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgPhoneLogsFieldsConfig,
    public store: NgPhoneLogsStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }

}
