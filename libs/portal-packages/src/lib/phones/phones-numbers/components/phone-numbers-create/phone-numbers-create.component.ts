import { Component, OnInit } from '@angular/core';
import { PhoneNumber, PhoneNumbersAppState } from '@skysmack/packages-phones';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgPhoneNumbersFieldsConfig } from '../../ng-phone-numbers-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';
import { NgPhoneNumbersActions, NgPhoneNumbersStore } from '@skysmack/ng-phones';

@Component({
  selector: 'ss-phone-numbers-create',
  templateUrl: './phone-numbers-create.component.html'
})
export class PhoneNumbersCreateComponent extends RecordFormComponent<PhoneNumbersAppState, PhoneNumber, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgPhoneNumbersActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgPhoneNumbersFieldsConfig,
    public store: NgPhoneNumbersStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }

}
