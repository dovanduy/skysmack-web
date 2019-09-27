import { Component, OnInit } from '@angular/core';
import { GroupReservationsAppState, GroupReservation } from '@skysmack/packages-lodging-reservations';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgFieldActions } from '@skysmack/ng-framework';
import { NgGroupReservationsFieldsConfig } from '../../ng-group-reservations-fields-config';
import { DocumentRecordFormComponent } from '@skysmack/portal-fields';
import { NgGroupReservationsActions, NgGroupReservationsStore } from '@skysmack/ng-lodging-reservations';

@Component({
  selector: 'ss-group-reservations-create',
  templateUrl: './group-reservations-create.component.html'
})
export class GroupReservationsCreateComponent extends DocumentRecordFormComponent<GroupReservationsAppState, GroupReservation, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgGroupReservationsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgGroupReservationsFieldsConfig,
    public store: NgGroupReservationsStore,
    public fieldActions: NgFieldActions
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig, fieldActions);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }
}
