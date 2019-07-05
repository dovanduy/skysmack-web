// INCOMMENT TO ACTIVATE PACKAGE OVERVIEW
// import { Component, OnInit } from '@angular/core';
// import * as shape from 'd3-shape';
// import { NgPackagesActions } from '@skysmack/ng-packages';
// import { ActivatedRoute, Router } from '@angular/router';
// import { NgSkysmackStore } from '@skysmack/ng-core';
// import { Field } from '@skysmack/ng-dynamic-forms';
// import { NgPackagesFieldsConfig, NgPackagesStore } from '@skysmack/ng-packages';
// import { BaseComponent } from '@skysmack/portal-ui';
// import { PackagesAppState } from '@skysmack/packages-skysmack-core';
// import { colorSets } from './color-sets';
// import { NgPackagesMenu } from './../../ng-packages-menu';


// @Component({
//   selector: 'ss-portal-package-available-packages-overview',
//   templateUrl: './available-packages-overview.component.html',
//   styleUrls: ['./available-packages-overview.component.scss']
// })
// export class AvailablePackagesOverviewComponent extends BaseComponent<PackagesAppState, string> implements OnInit {
//   hierarchialGraph = { nodes: [], links: [] };
//   curve = shape.curveBundle.beta(1);
//   fitContainer = true;
//   autoZoom = true;
//   panOnZoom = true;
//   enableZoom = true;
//   autoCenter = true;
//   colorSchemes: any;
//   colorScheme: any;
//   selectedColorScheme: string;
//   orientation = 'TB'; // LR, RL, TB, BT
//   orientations: any[] = [
//     {
//       label: 'Left to Right',
//       value: 'LR'
//     },
//     {
//       label: 'Right to Left',
//       value: 'RL'
//     },
//     {
//       label: 'Top to Bottom',
//       value: 'TB'
//     },
//     {
//       label: 'Bottom to Top',
//       value: 'BT'
//     }
//   ];

//   // curve = shape.curveLinear;

//   public fields: Field[];

//   constructor(
//     public router: Router,
//     public activatedRoute: ActivatedRoute,
//     public redux: NgSkysmackStore,
//     public actions: NgPackagesActions,
//     public fieldsConfig: NgPackagesFieldsConfig,
//     public store: NgPackagesStore,
//     public sidebarMenu: NgPackagesMenu,
//   ) {
//     super(router, activatedRoute, redux);
//     Object.assign(this, {
//       colorSchemes: colorSets,
//     });
//     this.setColorScheme('picnic');
//   }

//   public ngOnInit(): void {
//     super.ngOnInit();
//     this.actions.getAvailablePackages();

//     this.subscriptionHandler.register(this.store.getAvailablePackages().subscribe(availablePackages => {
//       this.hierarchialGraph.nodes = [];
//       this.hierarchialGraph.links = [];
//       for (const availablePackage of availablePackages) {
//         this.hierarchialGraph.nodes.push({
//           id: availablePackage.object.type,
//           label: availablePackage.object.name
//         });
//         if (availablePackage.object.dependencyTypes && availablePackage.object.dependencyTypes.length > 0) {
//           for (const dependencyType of availablePackage.object.dependencyTypes) {
//             this.hierarchialGraph.links.push({
//               source: availablePackage.object.type,
//               target: dependencyType
//             });
//           }
//         }
//       }
//     }));
//   }
//   setColorScheme(name) {
//     this.selectedColorScheme = name;
//     this.colorScheme = this.colorSchemes.find(s => s.name === name);
//   }
// }

