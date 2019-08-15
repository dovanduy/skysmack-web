import { Component, Input, ViewChild, OnInit, OnDestroy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { SubscriptionHandler } from '@skysmack/framework';
import { EditorNavService } from './editor-nav.service';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { Observable, of } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { NgAuthenticationStore } from '@skysmack/ng-framework';
import { MatDialog } from '@angular/material/dialog';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'ss-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, OnDestroy {
  @Input() public componentKey: string;
  @ViewChild(MatSidenav, { static: false }) public sidenav: MatSidenav;
  @ViewChild('editornav', { static: false }) public editornav: MatSidenav;

  @Output() public menuItemActionEvent = new EventEmitter<any>();

  public anyMenuItems: EventEmitter<boolean> = new EventEmitter<boolean>(true);

  public access$: Observable<boolean>;
  public authenticated$: Observable<boolean>;

  public path: string;
  public subscriptionHandler = new SubscriptionHandler();
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public skysmackStore: NgSkysmackStore,
    public changeDetectorRef: ChangeDetectorRef,
    public authentication: NgAuthenticationStore,
    public dialogRef: MatDialog
  ) { }

  ngOnInit(): void {
    this.path = this.router.url;    

    this.subscriptionHandler.register(this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        if (this.activatedRoute.firstChild) {
          setTimeout(() => {
            this.editorNavService.showEditorNav();
          }, 0);
        } else {
          this.editorNavService.hideEditorNav();
        }
      })
    ).subscribe());

    if (this.activatedRoute.firstChild) {
      setTimeout(() => {
        this.editorNavService.showEditorNav();
      }, 0);
    } else {
      this.editorNavService.hideEditorNav();
    }

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
      map(() => this.changeDetectorRef.detectChanges())
    ).subscribe());

    this.subscriptionHandler.register(this.editornav.closedStart.pipe(
      map(() => {
        if (this.editorNavService.redirectPath && this.editorNavService.redirectPath.length > 0) {
          this.router.navigate([this.editorNavService.redirectPath]);
        } else {
          // Loop activated routes from current container to last parent
          // Last parent should be the first part of url segment
          var routePaths = [];
          var route = this.activatedRoute;
          do {
            // Push in reverse order, since parents are pushed in reverse order
            const parentRoutes = route.snapshot.url.map(url => url.path).filter(path => path.length).reverse();
            if (parentRoutes && parentRoutes.length) {
              routePaths.push(...parentRoutes);
            }
            route = route.parent;
          } while (route);
          // This happens reversed, so reverse again and route
          this.router.navigate(routePaths.reverse());
        }
        this.editorNavService.redirectPath = '';
      })
    ).subscribe());

    this.subscriptionHandler.register(this.editorNavService.isVisible.pipe(
      map(visible => {
        if (visible && !this.editornav.opened) {
          this.editornav.open();
        } else if (!visible && this.editornav.opened) {
          this.editornav.close();
        }
        if (!visible) {
          if (this.dialogRef) {
            setTimeout(() => {
              this.dialogRef.closeAll();
            }, 0);
          }
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
