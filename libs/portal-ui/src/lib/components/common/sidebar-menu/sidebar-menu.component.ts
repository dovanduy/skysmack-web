import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarMenu } from './../../../models/sidebar-menu/sidebar-menu';
import { MenuItem, MenuAreaItems } from '@skysmack/framework';
import { NgMenuProviders } from '../../../navigation/ng-menu-providers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  @Input() public componentKey: string;
  @Output() public menuItemActionEvent = new EventEmitter<any>();
  public expansions: any = {};

  public menuAreaItems$: Observable<MenuAreaItems[]>;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public translate: TranslateService,
    public ngMenuProviders: NgMenuProviders
  ) {
  }

  ngOnInit() {
    this.removeEmptyMenuAreas();

    const packagePath = this.router.url.split('/')[1];
    this.menuAreaItems$ = this.ngMenuProviders.getMenuAreaItems(packagePath, this.componentKey).pipe(
      map(menuAreaItems => {
        return menuAreaItems.filter(menuAreaItem => menuAreaItem && menuAreaItem.providedIn && menuAreaItem.providedIn.includes('sidebar'));
      })
    );
  }

  public permissionsChecked(displaying: boolean, menuItem: MenuItem) {
    menuItem.display = displaying;
    const currentValues = this.sidebarMenu.primaryMenuAreas$.getValue();
    const menuArea = currentValues.find(x => x.area === menuItem.area);
    menuArea.display = currentValues.filter(x => x.area === menuItem.area && x.display).length > 0;
  }

  public removeEmptyMenuAreas() {
    const menuAreas = this.sidebarMenu.primaryMenuAreas$.getValue();
    const menuItems = this.sidebarMenu.primaryMenuItems$.getValue();
    const currentValues = menuAreas.filter(menuArea => menuItems.find(menuItem => menuItem.area === menuArea.area) ? true : false)
    this.sidebarMenu.primaryMenuAreas$.next(currentValues);
  }
}
