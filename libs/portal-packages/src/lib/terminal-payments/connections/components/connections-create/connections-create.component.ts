import { Component, OnInit } from '@angular/core';
import { ConnectionsAppState, Connection, ConnectionKey } from '@skysmack/packages-terminal-payments';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordFormComponent, EditorNavService } from '@skysmack/portal-ui';
import { NgConnectionsActions } from '@skysmack/ng-packages';
import { NgConnectionsStore } from '@skysmack/ng-packages';
import { NgConnectionsFieldsConfig } from '../../ng-connections-fields-config';
import { FormHelper } from '@skysmack/ng-dynamic-forms';
import { toLocalObject, LocalObjectStatus } from '@skysmack/framework';

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
