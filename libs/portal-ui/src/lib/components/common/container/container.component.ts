import { Component, Input, ViewChild, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, RoutesRecognized } from '@angular/router';
import { SidebarMenu } from './../../../models/sidebar-menu/sidebar-menu';
import { SubscriptionHandler } from '@skysmack/framework';
import { EditorNavService } from './editor-nav.service';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { Observable, of } from 'rxjs';
import { map, filter, switchMap, pairwise, take, tap } from 'rxjs/operators';
import { NgAuthenticationStore, getPackageDendencyAsStream } from '@skysmack/ng-framework';

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
        const splittedPath = this.path.split('/');

        if (this.path.endsWith('/create')) {
          const newPath = this.path.slice(0, this.path.length - '/create'.length);
          this.router.navigate([newPath]);
        } else if (splittedPath.find(x => x === 'edit')) {
          const newPath = this.path.split('/edit/')[0];
          this.router.navigate([newPath]);
        } else if (splittedPath.find(x => x === 'details')) {
          const newPath = this.path.split('/details/')[0];
          this.router.navigate([newPath]);
        } else if (this.path.endsWith('skysmack/settings')) {
          const newPath = this.path.slice(0, this.path.length - 'skysmack/settings'.length);
          this.router.navigate([newPath]);
        } else if (this.path.endsWith('/settings')) {
          const newPath = this.path.slice(0, this.path.length - '/settings'.length);
          this.router.navigate([newPath]);
        } else if (this.path.endsWith('/change-password')) {
          const newPath = this.path.slice(0, this.path.length - '/change-password'.length);
          this.router.navigate([newPath]);
        } else if (this.path.endsWith('/pay')) {
          getPackageDendencyAsStream(this.skysmackStore, packagePath, [0]).pipe(
            tap(x => this.router.navigate([x.object.path])),
            take(1)
          ).subscribe();
        }
        else {
          this.router.navigate([this.path]);
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
