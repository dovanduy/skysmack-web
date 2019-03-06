import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { NgPackagesStore, NgSkysmackStore } from '@skysmack/ng-packages';
import { switchMap, map } from 'rxjs/operators';
import { Field } from '@skysmack/ng-ui';

@Component({
  selector: 'ss-available-permissions-field',
  templateUrl: './available-permissions-field.component.html',
  styleUrls: ['./available-permissions-field.component.scss']
})
export class AvailablePermissionsFieldComponent extends FieldBaseComponent implements OnInit {
  public permissions: string[];
  public selectedPackagePath: string;

  constructor(
    public packagesStore: NgPackagesStore,
    public skysmackStore: NgSkysmackStore
  ) { super(); }

  ngOnInit() {
    super.ngOnInit();
  }

  public init(fields: Field[]) {
    this.selectedPackagePath = this.getOtherFieldValue('packagePath');
    this.getPermissions();
    this.resetOnPackagePathChange();
  }

  private getPermissions() {
    this.subscriptions.push(this.fh.form.valueChanges.pipe(
      switchMap(() => this.skysmackStore.getCurrentPackage(this.getOtherFieldValue('packagePath'))),
      switchMap(x => this.packagesStore.getPermissions(x._package.type)),
      map(permissions => {
        if (permissions && permissions.length > 0) {
          this.permissions = permissions;
        } else {
          this.permissions = undefined;
        }
      })
    ).subscribe());
  }

  private resetOnPackagePathChange() {
    this.subscriptions.push(this.fh.form.valueChanges.subscribe(values => {
      if (this.selectedPackagePath !== values['packagePath']) {
        this.selectedPackagePath = values['packagePath'];
        this.setPermission(null);
      }
    }));
  }


  public setPermission(permission: string): void {
    this.setFieldValue(permission);
  }
}
