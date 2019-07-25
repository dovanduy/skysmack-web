import { Component, OnInit, ViewChild, ComponentFactoryResolver, Input } from '@angular/core';
import { DynamicDashboardDirective } from './dynamic-dashboard.directive';

@Component({
  selector: 'ss-dashboard-loader',
  templateUrl: './dashboard-loader.component.html',
  styleUrls: ['./dashboard-loader.component.scss']
})
export class DashboardLoaderComponent implements OnInit {
  @Input() dashboard: any;
  @ViewChild(DynamicDashboardDirective, { static: true }) dynamicDashboard: DynamicDashboardDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.dashboard);

    const viewContainerRef = this.dynamicDashboard.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
  }
}
