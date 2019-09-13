import { Component, OnInit } from '@angular/core';
import { MenuItemActionProviders } from '@skysmack/portal-ui';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgFileStorageStore, NgFileStorageActions, NgFileStorageRequests } from '@skysmack/ng-file-storage';
import { FileStorageAppState, FILE_STORAGE_AREA_KEY, StorageQuery, FileStorageItem } from '@skysmack/packages-file-storage';
import { MenuItem, HttpSuccessResponse } from '@skysmack/framework';
import { BaseComponent } from '@skysmack/portal-fields';
import { Observable, combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'ss-file-storage-index',
  templateUrl: './file-storage-index.component.html'
})
export class FileStorageIndexComponent extends BaseComponent<FileStorageAppState, number> implements OnInit {
  public static COMPONENT_KEY = 'file-storage-index';
  public componentKey = FileStorageIndexComponent.COMPONENT_KEY;

  public areaKey: string = FILE_STORAGE_AREA_KEY;
  public menuItemActions: MenuItem[] = [];

  public currentRequest: StorageQuery;
  public currentLocation: string;

  public bucket$: Observable<string>;
  public filesAndFolders$: Observable<FileStorageItem[]>;
  public folders$: Observable<FileStorageItem[]>;
  public items$: Observable<FileStorageItem[]>;
  public empty$: Observable<boolean>;
  public folderPath$: Observable<string>;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public actions: NgFileStorageActions,
    public store: NgFileStorageStore,
    public menuItemActionProviders: MenuItemActionProviders,
    private requests: NgFileStorageRequests
  ) {
    super(router, activatedRoute, skysmackStore);
  }

  ngOnInit() {
    super.ngOnInit();
    this.actions.getBucket(this.packagePath);
    this.bucket$ = this.store.getBucket(this.packagePath);

    this.currentLocation = '/' + this.router.url.split('/').slice(1).join('/');
    this.navigateToFolder(this.currentLocation);

    this.router.events.pipe(
      filter(x => x instanceof NavigationEnd),
      map((event: NavigationEnd) => this.navigateToFolder(event.url))
    ).subscribe();
  }

  public navigateToFolder(folderPath?: string) {
    if (folderPath && this.currentLocation !== folderPath) {
      this.currentLocation = folderPath;
      this.router.navigate([folderPath])
    }

    const splitted = folderPath.split('/');
    const paths = splitted.slice(2, splitted.length);
    const newPath = paths.length === 1 ? paths[0] + '/' : paths.join('/') + '/';

    this.currentRequest = new StorageQuery({
      prefix: newPath === '/' ? '' : newPath,
      delimiter: '/',
      includeTrailingDelimiter: true,
      pageNumber: 1,
      pageSize: 10
    });

    this.filesAndFolders$ = this.requests.getFolderWithFiles(this.currentRequest).pipe(
      map((x: HttpSuccessResponse<FileStorageItem[]>) => x.body),
    );

    this.folders$ = this.filesAndFolders$.pipe(
      map(items => items.filter(item => !item.contentType))
    )

    this.items$ = this.filesAndFolders$.pipe(
      map(items => items.filter(item => item.contentType))
    )

    this.empty$ = combineLatest(
      this.folders$,
      this.items$
    ).pipe(
      map(([folders, items]) => {
        if (folders.length === 0 && items.length === 0) {
          return true
        }
        return false;
      })
    );
  }
}
