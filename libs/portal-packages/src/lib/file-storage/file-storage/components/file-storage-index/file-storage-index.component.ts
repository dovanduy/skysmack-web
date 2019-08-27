import { Component, OnInit } from '@angular/core';
import { MenuItemActionProviders } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgFileStorageStore, NgFileStorageActions } from '@skysmack/ng-file-storage';
import { FileStorageAppState, FILE_STORAGE_AREA_KEY } from '@skysmack/packages-file-storage';
import { MenuItem } from '@skysmack/framework';
import { BaseComponent } from '@skysmack/portal-fields';
import { Observable } from 'rxjs';

@Component({
  selector: 'ss-file-storage-index',
  templateUrl: './file-storage-index.component.html'
})
export class FileStorageIndexComponent extends BaseComponent<FileStorageAppState, number> implements OnInit {
  public static COMPONENT_KEY = 'file-storage-index';
  public componentKey = FileStorageIndexComponent.COMPONENT_KEY;

  public areaKey: string = FILE_STORAGE_AREA_KEY;
  public menuItemActions: MenuItem[] = [];


  public settings$: Observable<any>;

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
    // this.actions.getSettings(this.packagePath);
    this.settings$ = this.store.getSettings(this.packagePath);
  }
}
