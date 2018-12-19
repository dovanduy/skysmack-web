import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'lib/portal-ui/base-components/base-component';
import { EntityAction } from 'lib/portal-ui/models/entity-action';
import { LocalObject } from '@skysmack/framework/lib/models/local-object';
import { Observable } from 'rxjs';
import { NgDynamicFieldsMenu } from '../../ng-dynamic-fields-menu';
import { NgSkysmackStore } from 'lib/ng-packages/skysmack/redux/ng-skysmack-store';
import { EntityComponentPageTitle } from 'lib/portal-ui/models/entity-component-page-title';
import { NgSkysmackActions } from 'lib/ng-packages/skysmack/redux/ng-skysmack-actions';

@Component({
  selector: 'ss-dynamic-fields-index',
  templateUrl: './dynamic-fields-index.component.html',
  styleUrls: ['./dynamic-fields-index.component.scss']
})
export class DynamicFieldsIndexComponent extends BaseComponent<unknown, unknown> implements OnInit {

  public packages$: Observable<LocalObject<any>[]>;

  public displayedColumns = ['name', 'path'];
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgSkysmackActions, // Replace
    public store: NgSkysmackStore, // Replace
    public title: EntityComponentPageTitle,
    public sidebarMenu: NgDynamicFieldsMenu
  ) {
    super(router, activatedRoute, store);
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(x => console.log(x));
  }

  public actionEvent(event: { action: Function, value: LocalObject<any>, _this: any }) {
    event.action(event.value, event._this);
  }

  private delete(value: LocalObject<any>, _this: DynamicFieldsIndexComponent) {
    // _this.actions.delete([value]);
  }
}
