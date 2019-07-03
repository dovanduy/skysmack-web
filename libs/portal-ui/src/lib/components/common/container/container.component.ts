import { Component, Input, ViewChild, OnInit, OnDestroy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { SidebarMenu } from './../../../models/sidebar-menu/sidebar-menu';
import { SubscriptionHandler } from '@skysmack/framework';
import { EditorNavService } from './editor-nav.service';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { Observable, of } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { NgAuthenticationStore } from '@skysmack/ng-framework';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'ss-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, OnDestroy {
  @Input() public sidebarMenu: SidebarMenu;
  @ViewChild(MatSidenav, { static: false }) public sidenav: MatSidenav;
  @ViewChild('editornav', { static: false }) public editornav: MatSidenav;

  @Output() public menuItemActionEvent = new EventEmitter<any>();

  public access$: Observable<boolean>;
  public authenticated$: Observable<boolean>;

  public path: string;
  public subscriptionHandler = new SubscriptionHandler();
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  constructor(
    public router: Router,
    public editorNavService: EditorNavService,
    public skysmackStore: NgSkysmackStore,
    public changeDetectorRef: ChangeDetectorRef,
    public authentication: NgAuthenticationStore
  ) { }

  ngOnInit(): void {
    this.path = this.router.url;

    const packagePath = this.router.url.split('/')[1];
    if (!packagePath || packagePath === '' || packagePath === 'skysmack') {
      this.access$ = of(true);
    } else {
      this.access$ = this.skysmackStore.getCurrentPackage(packagePath).pipe(
        map(_package => _package._package.access)
      );
      this.authenticated$ = this.authentication.isCurrentUserAuthenticated();
    }

    this.subscriptionHandler.register(this.access$.pipe(
      filter(access => access),
      map(() => this.changeDetectorRef.detectChanges()),
      switchMap(() => this.editornav.closedStart),
      map(() => {
        if (this.editorNavService.redirectPath && this.editorNavService.redirectPath.length > 0) {
          this.router.navigate([this.editorNavService.redirectPath]);
          this.editorNavService.redirectPath = '';
        }
      })
    ).subscribe());


    this.subscriptionHandler.register(this.access$.pipe(
      filter(access => access),
      map(() => this.changeDetectorRef.detectChanges()),
      switchMap(() => this.editorNavService.isVisible),
      map(visible => {
        if (visible && !this.editornav.opened) {
          this.editornav.open();
        } else if (!visible && this.editornav.opened) {
          this.editornav.close();
        }
      })
    ).subscribe());
  }


  ngOnDestroy(): void {
    this.subscriptionHandler.unsubscribe();
  }

  public isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }
}
