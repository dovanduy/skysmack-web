import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarMenu } from './../../../models/sidebar-menu/sidebar-menu';

@Component({
  selector: 'ss-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
  animations: [
    trigger('bodyExpansion', [
      state('collapsed', style({ height: '0px', display: 'none' })),
      state('expanded', style({ height: '*', display: 'block' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
    ]),
  ],
})
export class SidebarMenuComponent implements OnInit {
  @Input() public sidebarMenu: SidebarMenu;
  public expansions: any = {};

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public translate: TranslateService
  ) {
  }

  ngOnInit() {
    this.removeEmptyMenuAreas();
  }

  public removeEmptyMenuAreas() {
    const menuAreas = this.sidebarMenu.primaryMenuAreas;
    const menuItems = this.sidebarMenu.primaryMenuItems;
    this.sidebarMenu.primaryMenuAreas = menuAreas.filter(menuArea => menuItems.find(menuItem => menuItem.area === menuArea.area) ? true : false);
  }

  /** Toggles the expanded state */
  public toggleExpand(category: string) {
    this.expansions[category] = !this.expansions[category];
  }

  /** Gets whether expanded or not */
  public getExpanded(category: string): boolean {
    return this.expansions[category] === undefined ? true : this.expansions[category];
  }

}
