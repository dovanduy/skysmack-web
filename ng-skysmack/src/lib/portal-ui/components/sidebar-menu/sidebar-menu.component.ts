import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SidebarMenu } from 'ui/models/sidebar-menu/sidebar-menu';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
export class SidebarMenuComponent {
  @Input() public sidebarMenu: SidebarMenu;
  public expansions: any = {};

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public translate: TranslateService
  ) { }

  /** Toggles the expanded state */
  public toggleExpand(category: string) {
    this.expansions[category] = !this.expansions[category];
  }

  /** Gets whether expanded or not */
  public getExpanded(category: string): boolean {
    return this.expansions[category] === undefined ? true : this.expansions[category];
  }

}
