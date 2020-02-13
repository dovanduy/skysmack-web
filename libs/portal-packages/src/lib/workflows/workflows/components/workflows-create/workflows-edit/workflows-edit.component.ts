import { Component, OnInit } from '@angular/core';
import { Workflow, WorkflowsAppState } from '@skysmack/packages-workflows';
import { NgWorkflowsActions, NgWorkflowsStore } from '@skysmack/ng-workflows';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgWorkflowsFieldsConfig } from '../../ng-workflows-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-workflows-edit',
  templateUrl: './workflows-edit.component.html'
})
export class WorkflowsEditComponent extends RecordFormComponent<WorkflowsAppState, Workflow, number> implements OnInit {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgWorkflowsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgWorkflowsFieldsConfig,
    public store: NgWorkflowsStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}
