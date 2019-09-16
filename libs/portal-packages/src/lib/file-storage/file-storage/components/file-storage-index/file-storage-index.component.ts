import { Component, OnInit } from '@angular/core';
import { MenuItemActionProviders } from '@skysmack/portal-ui';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgFileStorageStore, NgFileStorageActions } from '@skysmack/ng-file-storage';
import { FileStorageAppState, FILE_STORAGE_AREA_KEY, StorageQuery, FileStorageItem } from '@skysmack/packages-file-storage';
import { MenuItem, LocalPage, LoadingState, linq, LocalObject, defined } from '@skysmack/framework';
import { BaseComponent } from '@skysmack/portal-fields';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'ss-file-storage-index',
  templateUrl: './file-storage-index.component.html',
  styleUrls: ['./file-storage-index.component.scss']
})
export class FileStorageIndexComponent extends BaseComponent<FileStorageAppState, number> implements OnInit {
  public static COMPONENT_KEY = 'file-storage-index';
  public componentKey = FileStorageIndexComponent.COMPONENT_KEY;

  public areaKey: string = FILE_STORAGE_AREA_KEY;
  public menuItemActions: MenuItem[] = [];

  public currentRequest: StorageQuery = new StorageQuery({
    prefix: '/',
    delimiter: '/',
    includeTrailingDelimiter: true,
    query: ''
  });

  public currentLocation: string;

  public nextPageNumber = 1;
  public nextPageSize = this.currentRequest.pageSize;

  public totalCount: number;
  public totalCount$ = new BehaviorSubject(0);

  public loadingState: LoadingState;
  public loadingState$ = new BehaviorSubject(LoadingState.Loading);
  public breadCrumbs$ = new BehaviorSubject<string[]>([]);

  public bucket$: Observable<string>;
  public pagedEntities$: Observable<LocalObject<FileStorageItem, string>[]>;
  public folders$: Observable<LocalObject<FileStorageItem, string>[]>;
  public items$: Observable<LocalObject<FileStorageItem, string>[]>;
  public empty$: Observable<boolean>;
  public folderPath$: Observable<string>;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public actions: NgFileStorageActions,
    public store: NgFileStorageStore,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, skysmackStore);
  }

  ngOnInit() {
    super.ngOnInit();
    this.initBucket();
    this.initFolderNavigation();
    this.loadPages();
    this.getPagedEntities();
    this.initFileStreams();
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
      includeTrailingDelimiter: true
    });

    this.updateBreadCrumbs(this.currentRequest.prefix);

    const query = `${this.currentRequest.prefix}:${this.currentRequest.delimiter}:${this.currentRequest.includeTrailingDelimiter}`;
    this.currentRequest.query = query;

    this.actions.getStorageItems(this.packagePath, this.currentRequest);
  }

  public actionEvent(event: { action: Function, _this: any }) {
    event.action(event._this);
  }

  public deleteFile(file: LocalObject<FileStorageItem, string>): void {
    this.actions.delete([file], this.packagePath);
  }

  private initBucket(): void {
    this.actions.getBucket(this.packagePath);
    this.bucket$ = this.store.getBucket(this.packagePath);
  }

  private initFolderNavigation() {
    this.currentLocation = '/' + this.router.url.split('/').slice(1).join('/');
    this.navigateToFolder(this.currentLocation);
    this.subscriptionHandler.register(this.router.events.pipe(
      filter(x => x instanceof NavigationEnd),
      map((event: NavigationEnd) => this.navigateToFolder(event.url))
    ).subscribe());
  }

  private loadPages() {
    return this.store.getPages(this.packagePath).pipe(
      map((dictionary) => {
        const query = this.currentRequest.query;
        const queryDictionary = dictionary[query];
        if (queryDictionary) {
          // const sort = this.pagedQuery.sort.build();
          // this.pagedQuery.pageSize + ':' + sort
          const pages = queryDictionary.pages[this.currentRequest.pageSize + ':'];
          const lastPageKey = this.currentRequest.pageNumber;
          const lastPage: LocalPage<string> = pages[lastPageKey + ':'];

          if (lastPage) {
            // Part 2: Load next page
            if (queryDictionary && queryDictionary.totalCount && this.totalCount !== queryDictionary.totalCount) {
              this.totalCount = queryDictionary.totalCount;
              this.totalCount$.next(queryDictionary.totalCount);
            }
            const lastPageLinks = lastPage.links;

            if ((lastPageLinks && lastPageLinks.next)) {
              this.loadingState = LoadingState.Awaiting;
              this.loadingState$.next(LoadingState.Awaiting);

              this.nextPageNumber = lastPageLinks.next.pageNumber;
              this.nextPageSize = lastPageLinks.next.pageSize;
            } else if (lastPage.loadingState === LoadingState.OK) {
              this.loadingState = LoadingState.End;
              this.loadingState$.next(LoadingState.End);
            }
          }

          const pages2 = Object.keys(pages).map(key => {
            if (Number(key) > 0 && Number(key) <= lastPageKey) {
              return pages[key];
            }
          });

          return linq<string>([]).selectMany(linq<LocalPage<string>>(pages2)
            .defined()
            .select(x => x.ids))
            .distinct()
            .ok();
        }
      })
    );
  }

  private getPagedEntities() {
    this.pagedEntities$ = combineLatest(
      this.loadPages(),
      this.store.get(this.packagePath)
    ).pipe(
      map(values => {
        const [pages, entities] = values;
        if (pages && entities) {
          return [
            ...entities.filter(entity => entity.isNew && !pages.includes(entity.objectIdentifier)),
            ...linq(pages)
              .defined()
              .distinct()
              .select(entityId => entities.filter(entity => entity.objectIdentifier === entityId)[0])
              .defined()
              .ok()
          ];
        }
      }),
      defined(),
      map((entities: LocalObject<FileStorageItem, string>[]) =>
        entities
          .map(entity => {
            entity.object.name = entity.object.name.replace(this.currentRequest.prefix, '');
            return entity;
          })
          .filter(entity => entity.object.name.length !== 0)
      )
    );
  }

  private initFileStreams() {
    this.folders$ = this.pagedEntities$.pipe(
      map(items => items.filter(item => !item.object.contentType))
    )

    this.items$ = this.pagedEntities$.pipe(
      map(items => items.filter(item => item.object.contentType))
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

  private updateBreadCrumbs(prefix: string) {
    const splitted = prefix.split('/').slice(0, -1);
    this.breadCrumbs$.next(splitted);
  }
}
