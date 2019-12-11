import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { AXIS_PHYSICAL_ACCESS_CONTROL_AREA_KEY } from '@skysmack/ng-axis-physical-access-control';
import { BaseComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-axis-physical-access-control-index',
  templateUrl: './axis-physical-access-control-index.component.html'
})
export class AxisPhysicalAccessControlIndexComponent extends BaseComponent<unknown, unknown> implements OnInit {
  public static COMPONENT_KEY = 'axis-physical-access-control-index';
  public componentKey = AxisPhysicalAccessControlIndexComponent.COMPONENT_KEY;

  public areaKey: string = AXIS_PHYSICAL_ACCESS_CONTROL_AREA_KEY;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public store: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, store, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
