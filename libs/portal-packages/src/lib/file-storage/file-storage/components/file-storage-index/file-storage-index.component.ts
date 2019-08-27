import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTION_DETAILS, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgFileStorageStore, NgFileStorageActions } from '@skysmack/ng-file-storage';
import { FileStorageAppState, FILE_STORAGE_AREA_KEY } from '@skysmack/packages-file-storage';
import { MenuItem } from '@skysmack/framework';
import { NgFieldActions } from '@skysmack/ng-framework';
import { NgFileStorageFieldsConfig } from '../../../ng-file-storage-fields-config';
import { DocumentRecordIndexComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-file-storage-index',
  templateUrl: './file-storage-index.component.html'
})
export class FileStorageIndexComponent extends DocumentRecordIndexComponent<FileStorageAppState, any, number> implements OnInit {
  public static COMPONENT_KEY = 'fileStorage-index';
  public componentKey = FileStorageIndexComponent.COMPONENT_KEY;

  public areaKey: string = FILE_STORAGE_AREA_KEY;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('details', MENU_ITEM_ACTION_DETAILS, 'list'),
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit').setPermissions([
      // FileStoragePermissions.updateFileStorage
    ]),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this).setPermissions([
      // FileStoragePermissions.removeFileStorage
    ])
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgFileStorageActions,
    public skysmackStore: NgSkysmackStore,
    public store: NgFileStorageStore,
    public fieldsConfig: NgFileStorageFieldsConfig,
    public fieldActions: NgFieldActions,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, skysmackStore, store, fieldsConfig, fieldActions, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
