import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { NgPackagesStore, NgSkysmackStore, NgSkysmackActions } from '@skysmack/ng-core';
import { switchMap, map } from 'rxjs/operators';
import { Field, SelectFieldOption } from '@skysmack/ng-ui';
import { StrIndex } from '@skysmack/framework';
import { Observable } from 'rxjs';

@Component({
  selector: 'ss-available-permissions-field',
  templateUrl: './available-permissions-field.component.html'
})
export class AvailablePermissionsFieldComponent extends FieldBaseComponent<Field> implements OnInit {
  public permissions$: Observable<SelectFieldOption[]>;
  public selectedPackagePath: string;

  public requestedPermissions: StrIndex<boolean> = {};

  constructor(
    public packagesStore: NgPackagesStore,
    public skysmackStore: NgSkysmackStore,
    public skysmackActions: NgSkysmackActions
  ) { super(); }

  ngOnInit() {
    super.ngOnInit();
    this.selectedPackagePath = this.getOtherFieldValue('packagePath');
    this.getPermissions();
    this.resetOnPackagePathChange();
  }

  private getPermissions() {
    this.permissions$ = this.fh.form.valueChanges.pipe(
      switchMap(() => {
        const packagePath = this.getOtherFieldValue('packagePath');
        if (packagePath && !this.requestedPermissions[packagePath]) {
          this.skysmackActions.getAvailablePermissions(packagePath);
          this.requestedPermissions[packagePath] = true;
        }
        return this.skysmackStore.getAvailablePermissions(packagePath);
      }),
      map(permissions => Object.keys(permissions).map(key => {
        return {
          value: key,
          displayName: permissions[key]
        };
      }))
    );
  }

  private resetOnPackagePathChange() {
    this.subscriptionHandler.register(this.fh.form.valueChanges.subscribe(values => {
      if (this.selectedPackagePath !== values['packagePath']) {
        this.selectedPackagePath = values['packagePath'];
        this.setPermission(null);
      }
    }));
  }

  public setPermission(permission: string): void {
    this.setFieldValue(permission);
  }

  public trackById(index: any, item: any) {
    return item.id;
  }
}
