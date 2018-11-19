import { Component, Input, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { SidebarMenu } from './../../../models/sidebar-menu/sidebar-menu';
import { SubscriptionHandler } from '@skysmack/framework';
import { EditorNavService } from './editor-nav.service';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'ss-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, OnDestroy {
  @Input() public sidebarMenu: SidebarMenu;
  @ViewChild(MatSidenav) public sidenav: MatSidenav;
  @ViewChild('editornav') public editornav: MatSidenav;

  public path: string;
  public subscriptionHandler = new SubscriptionHandler();
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  constructor(
    public router: Router,
    public editorNavService: EditorNavService
  ) { }

  ngOnInit(): void {
    this.path = this.router.url;

    this.subscriptionHandler.subscribe(this.editornav.closedStart.subscribe(() => {
      const splittedPath = this.path.split('/');

      if (this.path.endsWith('/create')) {
        const newPath = this.path.slice(0, this.path.length - '/create'.length);
        this.router.navigate([newPath]);
      } else if (splittedPath.find(x => x === 'edit')) {
        const newPath = this.path.split('/edit/')[0];
        this.router.navigate([newPath]);
      } else {
        this.router.navigate([this.path]);
      }
    }));

    this.subscriptionHandler.subscribe(this.editorNavService.isVisible.subscribe(visible => {
      if (visible && !this.editornav.opened) {
        this.editornav.open();
      } else if (!visible && this.editornav.opened) {
        this.editornav.close();
      }
    }));
  }


  ngOnDestroy(): void {
    this.subscriptionHandler.unsubscribe();
  }

  public isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }
}
