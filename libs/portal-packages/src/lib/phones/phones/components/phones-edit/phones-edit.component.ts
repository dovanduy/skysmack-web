import { Component, OnInit } from '@angular/core';
import { Phone, PhonesAppState } from '@skysmack/packages-phones';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { switchMap } from 'rxjs/operators';
import { NgPhonesFieldsConfig } from '../../ng-phones-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';
import { NgPhonesActions, NgPhonesStore } from '@skysmack/ng-phones';

@Component({
  selector: 'ss-phones-edit',
  templateUrl: './phones-edit.component.html'
})
export class PhonesEditComponent extends RecordFormComponent<PhonesAppState, Phone, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgPhonesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgPhonesFieldsConfig,
    public store: NgPhonesStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}
