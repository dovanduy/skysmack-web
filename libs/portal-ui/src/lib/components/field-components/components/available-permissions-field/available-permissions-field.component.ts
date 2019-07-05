import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { NgPackagesStore } from '@skysmack/ng-packages';
import { switchMap, map, startWith } from 'rxjs/operators';
import { Field, SelectFieldOption } from '@skysmack/ng-dynamic-forms';
import { StrIndex } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { NgSkysmackStore, NgSkysmackActions } from '@skysmack/ng-skysmack';

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
      startWith(null),
      switchMap(() => {
        const packagePath = this.getOtherFieldValue('packagePath');
        if (packagePath && !this.requestedPermissions[packagePath]) {
          this.skysmackActions.getAvailablePermissions(packagePath);
          this.requestedPermissions[packagePath] = true;
        }
        return this.skysmackStore.getAvailablePermissions(packagePath);
      }),
      map(permissions => {
        const upperCasePermissions = this.upperCaseProperties(permissions);
        return Object.keys(upperCasePermissions).map(key => {
          return {
            value: key,
            displayName: upperCasePermissions[key]
          };
        });
      })
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

  private upperCaseProperties(dictionary: StrIndex<any>): StrIndex<any> {
    return Object.keys(dictionary).reduce((acc, key) => {
      const upperCaseKey = key.slice(0, 1).toUpperCase() + key.slice(1);
      acc[upperCaseKey] = dictionary[key];
      return acc;
    }, {});
  }
}
