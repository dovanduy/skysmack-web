import { Component, OnInit, ViewChild, ComponentFactoryResolver, Input } from '@angular/core';
import { DynamicSummaryDirective } from './dynamic-summary.directive';
import { Summary } from '@skysmack/framework';

@Component({
  selector: 'ss-summary-loader',
  templateUrl: './summary-loader.component.html',
  styleUrls: ['./summary-loader.component.scss']
})
export class SummaryLoaderComponent implements OnInit {
  @Input() summary: Summary<unknown>;
  @ViewChild(DynamicSummaryDirective, { static: true }) dynamicSummary: DynamicSummaryDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.summary.component);

    const viewContainerRef = this.dynamicSummary.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<any>componentRef.instance).providerPackagePath = this.summary.providerPackagePath;
    (<any>componentRef.instance).summary = this.summary;
  }
}
