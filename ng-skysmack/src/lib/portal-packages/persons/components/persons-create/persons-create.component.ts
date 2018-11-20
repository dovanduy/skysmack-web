import { Component, OnInit } from '@angular/core';
import { Person, PersonsAppState } from '@skysmack/packages-persons';
import { NgPersonsActions } from 'lib/ng-packages/persons/redux/ng-persons-actions';
import { NgSkysmackRedux } from 'lib/ng-packages/skysmack/redux/ng-skysmack-redux';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordFormComponent } from 'lib/portal-ui/base-components/record-components/record-form-component';
import { EditorNavService } from 'lib/portal-ui/components/common/container/editor-nav.service';
import { NgPersonsFieldsConfig } from 'lib/ng-packages/persons/ng-persons-fields-config';

@Component({
  selector: 'ss-persons-create',
  templateUrl: './persons-create.component.html',
  styleUrls: ['./persons-create.component.scss']
})
export class PersonsCreateComponent extends RecordFormComponent<PersonsAppState, Person, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgPersonsActions,
    public redux: NgSkysmackRedux,
    public fieldsConfig: NgPersonsFieldsConfig,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.initPackageCreateForm();
  }

}
