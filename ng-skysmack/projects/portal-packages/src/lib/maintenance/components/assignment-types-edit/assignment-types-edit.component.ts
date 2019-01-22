import { Component, OnInit } from '@angular/core';
import { AssignmentTypesAppState, AssignmentType } from '@skysmack/packages-maintenance';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordFormComponent, EditorNavService } from '@skysmack/portal-ui';
import { NgAssignmentTypesActions, NgSkysmackStore, NgAssignmentTypesFieldsConfig, NgAssignmentTypesStore, NgAssignmentTypeFormDependencies } from '@skysmack/ng-packages';

@Component({
  selector: 'ss-assignment-types-edit',
  templateUrl: './assignment-types-edit.component.html',
  styleUrls: ['./assignment-types-edit.component.scss']
})
export class AssignmentTypesEditComponent extends RecordFormComponent<AssignmentTypesAppState, AssignmentType, number, NgAssignmentTypeFormDependencies> implements OnInit {

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
    this.setEditFields();
  }
}
