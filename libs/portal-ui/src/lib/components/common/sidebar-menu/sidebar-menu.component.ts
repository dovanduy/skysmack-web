import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MenuAreaItems } from '@skysmack/framework';
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
  @Input() public componentKey: string;
  @Output() public menuItemActionEvent = new EventEmitter<any>();
  @Output() public anyMenuItems = new EventEmitter<boolean>(true);
  public menuAreaItems$: Observable<MenuAreaItems[]>;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public translate: TranslateService,
    public ngMenuProviders: NgMenuProviders
  ) {
  }

  ngOnInit() {
    const packagePath = this.router.url.split('/')[1];
    this.menuAreaItems$ = this.ngMenuProviders.getMenuAreaItems(packagePath, this.componentKey).pipe(
      map(menuAreaItems => {
        const items = menuAreaItems.filter(menuAreaItem => menuAreaItem && menuAreaItem.providedIn && menuAreaItem.providedIn.includes('sidebar'));
        this.anyMenuItems.emit(items.length > 0);
        return items;
      })
    );
  }
}
