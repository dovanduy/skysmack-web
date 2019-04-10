import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AssignmentTypesAppState, AssignmentType, ASSIGNMENT_TYPES_AREA_KEY } from '@skysmack/packages-maintenance';
import { EntityComponentPageTitle, RecordIndexComponent } from '@skysmack/portal-ui';
import { EntityAction } from '@skysmack/ng-ui';
import { NgAssignmentTypesActions, NgSkysmackStore, NgAssignmentTypesStore } from '@skysmack/ng-packages';
import { NgAssignmentTypesMenu } from '../../ng-assignment-types-menu';
import { NgAssignmentTypesFieldsConfig } from '../../ng-assignment-types-fields-config';

@Component({
  selector: 'ss-assignment-types-index',
  templateUrl: './assignment-types-index.component.html'
})
export class AssignmentTypesIndexComponent extends RecordIndexComponent<AssignmentTypesAppState, AssignmentType, number> implements OnInit {

  public area: string = ASSIGNMENT_TYPES_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgAssignmentTypesActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgAssignmentTypesStore,
    public sidebarMenu: NgAssignmentTypesMenu,
    public fieldsConfig: NgAssignmentTypesFieldsConfig
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig);

  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}
