import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { map, tap } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { NgPackagesStore } from '@skysmack/ng-core';
import { flatten, notNull, AvailablePackage, LocalObject } from '@skysmack/framework';
import { Field } from '@skysmack/ng-dynamic-forms';
import { Router } from '@angular/router';

class SelectBox {
  index: number;
  dependency: string;

  name: string;

  selectedValue: string;
  values: {
    value: string,
    displayName: string
  }[];

  public constructor(init?: Partial<SelectBox>) {
    Object.assign(this, init);
  }
}

@Component({
  selector: 'ss-package-dependencies-field',
  templateUrl: './package-dependencies-field.component.html'
})
export class PackageDependenciesFieldComponent extends FieldBaseComponent<Field> implements OnInit {
  public selectedDepTypes = {};
  public selectBoxes$: Observable<SelectBox[]>;
  public showBoxes = false;
  public nrOfRequiredDependencies: number;

  private packagePath: string;

  constructor(
    public packagesStore: NgPackagesStore,
    public router: Router
  ) { super(); }

  ngOnInit() {
    super.ngOnInit();
    this.packagePath = this.router.url.split('/')[1];
    this.createSelectBoxes();
  }

  public createSelectBoxes(): void {
    let lastType = '';
    const selectedPackageType$ = this.fh.form.valueChanges.pipe(
      map<any, string>(formValues => {
        // Prevents endless loop when resetting dependencies field.
        if (lastType !== formValues['type']) {
          lastType = formValues['type'];
          this.setOtherFieldValue('dependencies', []);
          return formValues['type'];
        }
      }),
      notNull(),
    );

    const availablePackages$ = this.packagesStore.getAvailablePackages(this.packagePath);

    const dependencies$ = combineLatest(
      selectedPackageType$,
      availablePackages$
    ).pipe(
      map(values => {
        const [selectedPackageType, availablePackages] = values;
        return availablePackages.filter(availablePackage => availablePackage.object.type === selectedPackageType);
      }),
      flatten(),
      map((availablePackage: LocalObject<AvailablePackage, string>) => availablePackage.object.dependencyTypes),
      map(depTypes => {
        // Hide select boxes if there are no dependencies
        depTypes ? this.showBoxes = true : this.showBoxes = false;
        return depTypes;
      }),
      notNull()
    );

    this.selectBoxes$ = combineLatest(
      dependencies$,
      this.packagesStore.get(this.packagePath),
      availablePackages$
    ).pipe(
      map(values => {
        const [dependencies, installedPackages, availablePackages] = values;

        this.nrOfRequiredDependencies = (dependencies as string[]).length;
        this.checkDependenciesAreSet();

        let index = 0;
        // Only run this when setting NEW dependencies, not when valus are set...
        return (dependencies as string[]).map(dependency => {
          const possibleValues = installedPackages
            .filter(installedPackage => installedPackage.object.type === dependency)
            .map(installedPackage => ({
              value: installedPackage.object.path,
              displayName: installedPackage.object.name
            }));

          const foundPackage = availablePackages.find(x => x.object.type === dependency);
          const name = foundPackage ? foundPackage.object.name : '';
          return new SelectBox({
            index: index++,
            name,
            dependency,
            values: possibleValues
          });
        });
      }),
    );
  }

  public setDependencies(selectBox: SelectBox, selectedDepType: string): void {
    let deps = this.getOtherFieldValue('dependencies');

    deps = deps ? deps : [];
    deps[selectBox.index] = selectedDepType;

    this.setOtherFieldValue('dependencies', deps);
    this.checkDependenciesAreSet();
  }

  public checkDependenciesAreSet() {
    const currentValue = this.getFieldValue();
    const currentValueAsNumber = Array.isArray(currentValue) ? currentValue.length : 0;

    if (this.nrOfRequiredDependencies !== currentValueAsNumber) {
      // Not all required deps have been selected. Set error.
      this.setOtherFieldErrors('type', { depsMissing: true });
    } else {
      // The required number of deps have been selected. Remove error.
      this.setOtherFieldErrors('type', null);
    }
  }
}
