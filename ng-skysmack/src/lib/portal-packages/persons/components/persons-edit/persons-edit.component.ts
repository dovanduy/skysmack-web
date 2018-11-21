import { Component, OnInit } from '@angular/core';
import { Person, PersonsAppState } from '@skysmack/packages-persons';
import { NgPersonsActions } from 'lib/ng-packages/persons/redux/ng-persons-actions';
import { NgSkysmackRedux } from 'lib/ng-packages/skysmack/redux/ng-skysmack-redux';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from 'lib/portal-ui/components/common/container/editor-nav.service';
import { NgPersonsFieldsConfig } from 'lib/ng-packages/persons/ng-persons-fields-config';
import { DocumentRecordFormComponent } from 'lib/portal-ui/base-components/record-components/document-record-form-component';
import { NgPersonsStore } from 'lib/ng-packages/persons';

@Component({
  selector: 'ss-persons-edit',
  templateUrl: './persons-edit.component.html',
  styleUrls: ['./persons-edit.component.scss']
})
export class PersonsEditComponent extends DocumentRecordFormComponent<PersonsAppState, Person, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgPersonsActions,
    public redux: NgSkysmackRedux,
    public fieldsConfig: NgPersonsFieldsConfig,
    public store: NgPersonsStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.initDocumentRecordEditComponent();
  }
}
