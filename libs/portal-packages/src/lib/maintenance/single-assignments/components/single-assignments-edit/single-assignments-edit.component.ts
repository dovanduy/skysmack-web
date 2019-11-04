import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SingleAssignment, SingleAssignmentsAppState } from '@skysmack/packages-maintenance';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgSingleAssignmentsActions, NgSingleAssignmentsStore, NgAssignmentTypesActions } from '@skysmack/ng-maintenance';
import { NgSingleAssignmentsFieldsConfig } from '../../ng-single-assignments-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { RecordFormComponent } from '@skysmack/portal-fields';
import { FormHelper } from '@skysmack/ng-dynamic-forms';
import { LocalObjectStatus } from '@skysmack/framework';

@Component({
  selector: 'ss-single-assignments-edit',
  templateUrl: './single-assignments-edit.component.html'
})
export class SingleAssignmentsEditComponent extends RecordFormComponent<SingleAssignmentsAppState, SingleAssignment, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgSingleAssignmentsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgSingleAssignmentsFieldsConfig,
    public store: NgSingleAssignmentsStore,
    public assignmentTypesActions: NgAssignmentTypesActions
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }

  protected update(fh: FormHelper) {
    fh.formValid(() => {
      const oldValue = { ...this.selectedEntity };
      const newValue = this.extractFormValues(fh, this.selectedEntity);
      newValue.oldObject = oldValue.object;
      newValue.status = LocalObjectStatus.MODIFYING;
      if (newValue.object.from.toISOString) {
        newValue.object.from = (newValue.object.from.toISOString() as any).split('Z')[0] as any;
      }
      if (newValue.object.due.toISOString) {
        newValue.object.due = (newValue.object.due.toISOString() as any).split('Z')[0] as any;
      }

      this.actions.update([newValue], this.packagePath);
      this.editorNavService.hideEditorNav();
    });
  }
}
