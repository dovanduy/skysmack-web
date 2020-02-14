import { Component, OnInit } from '@angular/core';
import { Definition, DefinitionsAppState } from '@skysmack/packages-workflows';
import { NgDefinitionsActions, NgDefinitionsStore } from '@skysmack/ng-workflows';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgDefinitionsFieldsConfig } from '../../ng-definitions-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-definitions-create',
  templateUrl: './definitions-create.component.html'
})
export class DefinitionsCreateComponent extends RecordFormComponent<DefinitionsAppState, Definition, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgDefinitionsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgDefinitionsFieldsConfig,
    public store: NgDefinitionsStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }
}
