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
import { NgFieldActions, NgFieldStore } from '@skysmack/ng-redux';
import { NgLodgingsFieldsConfig, NgLodgingFormDependencies } from '../../ng-lodgings-fields-config';

@Component({
  selector: 'ss-lodgings-create',
  templateUrl: './lodgings-create.component.html',
  styleUrls: ['./lodgings-create.component.scss']
})
export class LodgingsCreateComponent extends DocumentRecordFormComponent<LodgingsAppState, Lodging, number, NgLodgingFormDependencies> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public store: NgLodgingsStore,
    public actions: NgLodgingsActions,
    public lodgingTypeActions: NgLodgingTypesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgLodgingsFieldsConfig,
    public fieldActions: NgFieldActions,
    public fieldStore: NgFieldStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig, fieldActions, fieldStore);
  }

  ngOnInit() {
    super.ngOnInit();
    this.lodgingTypeActions.getPaged(this.packagePath, new PagedQuery());
    this.setCreateFields();
  }
}
