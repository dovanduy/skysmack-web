import { Component, OnInit } from '@angular/core';
import { ConnectionsAppState, Connection, ConnectionKey } from '@skysmack/packages-terminal-payments';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgConnectionsActions, NgConnectionsStore } from '@skysmack/ng-terminal-payments';
import { NgConnectionsFieldsConfig } from '../../ng-connections-fields-config';
import { FormHelper } from '@skysmack/ng-dynamic-forms';
import { toLocalObject, LocalObjectStatus } from '@skysmack/framework';
import { RecordFormComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-connections-create',
  templateUrl: './connections-create.component.html'
})
export class ConnectionsCreateComponent extends RecordFormComponent<ConnectionsAppState, Connection, ConnectionKey> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgConnectionsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgConnectionsFieldsConfig,
    public store: NgConnectionsStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }

  protected create(fh: FormHelper) {
    fh.formValid(() => {
      const localObject = toLocalObject(new Connection({ id: fh.form.getRawValue() }));
      this.editorItem ? localObject.localId = this.editorItem.localId : localObject.localId = localObject.localId;
      localObject.status = LocalObjectStatus.CREATING;
      localObject.isNew = true;
      this.actions.add([localObject], this.packagePath);
      this.editorNavService.hideEditorNav();
    });
  }
}
