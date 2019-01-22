import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentType, AssignmentTypesAppState } from '@skysmack/packages-maintenance';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgAssignmentTypesActions, NgSkysmackStore, NgAssignmentTypesFieldsConfig, NgAssignmentTypesStore, NgAssignmentTypeFormDependencies } from '@skysmack/ng-packages';

@Component({
  selector: 'ss-assignment-types-create',
  templateUrl: './assignment-types-create.component.html',
  styleUrls: ['./assignment-types-create.component.scss']
})
export class AssignmentTypesCreateComponent extends RecordFormComponent<AssignmentTypesAppState, AssignmentType, number, NgAssignmentTypeFormDependencies> implements OnInit {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgAssignmentTypesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgAssignmentTypesFieldsConfig,
    public store: NgAssignmentTypesStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }

}
