import { Component, OnInit } from '@angular/core';
import * as shape from 'd3-shape';
import { NgPackagesActions } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { Field } from '@skysmack/ng-ui';
import { NgPackagesFieldsConfig, NgPackagesStore } from '@skysmack/ng-packages';
import { BaseComponent } from '@skysmack/portal-ui';
import { PackagesAppState } from '@skysmack/packages-skysmack-core';


@Component({
  selector: 'ss-portal-package-available-packages-overview',
  templateUrl: './available-packages-overview.component.html',
  styleUrls: ['./available-packages-overview.component.scss']
})
export class AvailablePackagesOverviewComponent extends BaseComponent<PackagesAppState, string> implements OnInit {
  hierarchialGraph = {nodes: [], links: []};
  curve = shape.curveBundle.beta(1);
  // curve = shape.curveLinear;

  public fields: Field[];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public redux: NgSkysmackStore,
    public actions: NgPackagesActions,
    public fieldsConfig: NgPackagesFieldsConfig,
    public store: NgPackagesStore,

  ) {
    super(router, activatedRoute, redux);
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.actions.getAvailablePackages();

    this.subscriptionHandler.register(this.store.getAvailablePackages().subscribe(availablePackages => {
      this.hierarchialGraph.nodes = [];
      this.hierarchialGraph.links = [];
      for (const availablePackage of availablePackages) {
        this.hierarchialGraph.nodes.push({
          id: availablePackage.object.type,
          label: availablePackage.object.name
        });
        if (availablePackage.object.dependencyTypes && availablePackage.object.dependencyTypes.length > 0) {
          for (const dependencyType of availablePackage.object.dependencyTypes) {
            this.hierarchialGraph.links.push({
              source: availablePackage.object.type,
              target: dependencyType
            });
          }
        }
      }
    }));
  }
}

