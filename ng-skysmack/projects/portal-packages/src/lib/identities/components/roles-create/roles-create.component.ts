import { Component, OnInit } from '@angular/core';
import { Role, RolesAppState } from '@skysmack/packages-identities';
import { NgRolesActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { NgRolesStore } from '@skysmack/ng-packages';
import { RecordFormComponent, EditorNavService } from '@skysmack/portal-ui';
import { NgRolesFieldsConfig } from '../../ng-roles-fields-config';

@Component({
  selector: 'ss-roles-create',
  templateUrl: './roles-create.component.html',
  styleUrls: ['./roles-create.component.scss']
})
export class RolesCreateComponent extends RecordFormComponent<RolesAppState, Role, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgRolesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgRolesFieldsConfig,
    public store: NgRolesStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }

}
