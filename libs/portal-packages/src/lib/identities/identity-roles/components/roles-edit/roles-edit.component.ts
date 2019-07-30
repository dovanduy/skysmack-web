import { Component, OnInit } from '@angular/core';
import { Role, RolesAppState } from '@skysmack/packages-identities';
import { NgRolesActions, NgRolesStore } from '@skysmack/ng-identities';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgRolesFieldsConfig } from '../../ng-roles-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-roles-edit',
  templateUrl: './roles-edit.component.html'
})
export class RolesEditComponent extends RecordFormComponent<RolesAppState, Role, number> implements OnInit {

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
    this.setEditFields();
  }
}
