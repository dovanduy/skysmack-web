import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SingleAssignment, SingleAssignmentsAppState } from '@skysmack/packages-maintenance';
import { NgSingleAssignmentsActions, NgSingleAssignmentsStore, NgAssignmentTypesActions } from '@skysmack/ng-maintenance';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgSingleAssignmentsFieldsConfig } from '../../ng-single-assignments-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { RecordFormComponent } from '@skysmack/portal-fields';
import { FormHelper } from '@skysmack/ng-dynamic-forms';

@Component({
  selector: 'ss-single-assignments-create',
  templateUrl: './single-assignments-create.component.html'
})
export class SingleAssignmentsCreateComponent extends RecordFormComponent<SingleAssignmentsAppState, SingleAssignment, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgSingleAssignmentsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgSingleAssignmentsFieldsConfig,
    public store: NgSingleAssignmentsStore,
    public assignmentTypesActions: NgAssignmentTypesActions,

  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }

  public onCreateSubmit(fh: FormHelper) {
    fh.formValid(() => {
      const localObject = this.extractFormValues(fh);
      localObject.object.from = (localObject.object.from.toISOString() as any).split('Z')[0] as any;
      localObject.object.due = (localObject.object.due.toISOString() as any).split('Z')[0] as any;
      this.editorItem ? localObject.localId = this.editorItem.localId : localObject.localId = localObject.localId;
      this.actions.add([localObject], this.packagePath);
      this.editorNavService.hideEditorNav();
    });
  }
}
