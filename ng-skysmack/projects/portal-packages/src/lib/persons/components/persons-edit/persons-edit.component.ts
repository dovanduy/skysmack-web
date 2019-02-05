import { Component, OnInit } from '@angular/core';
import { Person, PersonsAppState } from '@skysmack/packages-persons';
import { NgPersonsActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgPersonsFieldsConfig, NgPersonFormDependencies } from '@skysmack/ng-packages';
import { DocumentRecordFormComponent } from '@skysmack/portal-ui';
import { NgPersonsStore } from '@skysmack/ng-packages';

import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalObject } from '@skysmack/framework';

@Component({
  selector: 'ss-persons-edit',
  templateUrl: './persons-edit.component.html',
  styleUrls: ['./persons-edit.component.scss']
})
export class PersonsEditComponent extends DocumentRecordFormComponent<PersonsAppState, Person, number, NgPersonFormDependencies> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgPersonsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgPersonsFieldsConfig,
    public store: NgPersonsStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
  protected setEditFields() {
    this.subscriptionHandler.register(
      combineLatest(
        this.initEditDocRecord(),
        this.skysmackStore.getEditorItem()
      ).pipe(
        map(values => {
          const entity = values[0][0];
          const fields = values[0][1];
          this.editorItem = values[1] as LocalObject<Person, number>;
          this.editorItem ? this.selectedEntity = this.editorItem : this.selectedEntity = entity;

          this.fields = this.getFields(this.selectedEntity, fields);
        })
      ).subscribe()
    );
  }

}
