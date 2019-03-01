import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalObject, DynamicFieldRouteData } from '@skysmack/framework';
import { DocumentRecordActionsBase, DocumentRecordState } from '@skysmack/redux';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityAction } from '@skysmack/ng-ui';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { EntityComponentPageTitle } from './../../../models/entity-component-page-title';
import { NgDocumentRecordReduxStore } from '@skysmack/ng-redux';
import { NgDynamicFieldsMenu } from '../../ng-dynamic-fields-menu';
import { RecordIndexComponent } from '../../../base-components/record-components/record-index-component';
import { BaseComponent } from '../../../base-components/base-component';

@Component({
  selector: 'ss-dynamic-fields-index',
  templateUrl: './dynamic-fields-index.component.html',
  styleUrls: ['./dynamic-fields-index.component.scss']
})
export class DynamicFieldsIndexComponent extends BaseComponent<any, any> implements OnInit { // extends RecordIndexComponent<DocumentRecordState<any, any>, any, any> implements OnInit {

  public entities$: Observable<LocalObject<any, any>[]>;
  public actions: DocumentRecordActionsBase<any, any>;
  public store: NgDocumentRecordReduxStore<any, any, any>;

  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public title: EntityComponentPageTitle,
    public redux: NgSkysmackStore,
    public sidebarMenu: NgDynamicFieldsMenu,
    public injector: Injector
  ) {
    // super(router, activatedRoute, undefined, redux, undefined, undefined);
    super(router, activatedRoute, redux);
  }

  ngOnInit() {
    super.ngOnInit();
    this.subscriptionHandler.register(this.activatedRoute.data.pipe(
      map((data: DynamicFieldRouteData) => {
        this.store = this.injector.get(data.storeToken);
        this.actions = this.injector.get(data.actionToken);

        this.actions.getFields(this.packagePath);
        this.entities$ = this.store.getFields(this.packagePath);
      })
    ).subscribe());
  }

  public actionEvent(event: { action: Function, value: LocalObject<any, any>, _this: any }) {
    event.action(event.value, event._this);
  }

  protected delete(value: LocalObject<any, any>, _this: DynamicFieldsIndexComponent) {
    _this.actions.deleteFields([value], _this.packagePath);
  }
}
