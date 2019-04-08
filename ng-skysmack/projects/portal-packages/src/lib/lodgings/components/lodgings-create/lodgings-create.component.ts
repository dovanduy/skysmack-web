import { Component, OnInit } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { DocumentRecordFormComponent } from '@skysmack/portal-ui';
import { LodgingsAppState, Lodging } from '@skysmack/packages-lodgings';
import { NgLodgingsActions } from '@skysmack/ng-packages';
import { NgLodgingsStore } from '@skysmack/ng-packages';
import { NgLodgingTypesActions } from '@skysmack/ng-packages';
import { PagedQuery } from '@skysmack/framework';
import { NgFieldActions } from '@skysmack/ng-redux';
import { NgLodgingsFieldsConfig } from '../../ng-lodgings-fields-config';

@Component({
  selector: 'ss-lodgings-create',
  templateUrl: './lodgings-create.component.html'
})
export class LodgingsCreateComponent extends DocumentRecordFormComponent<LodgingsAppState, Lodging, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public store: NgLodgingsStore,
    public actions: NgLodgingsActions,
    public lodgingTypeActions: NgLodgingTypesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgLodgingsFieldsConfig,
    public fieldActions: NgFieldActions
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig, fieldActions);
  }

  ngOnInit() {
    super.ngOnInit();
    this.lodgingTypeActions.getPaged(this.packagePath, new PagedQuery());
    this.setCreateFields();
  }
}
