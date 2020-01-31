import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { NgPackagesStore } from '@skysmack/ng-packages';
import { AvailablePackage, LocalObject } from '@skysmack/framework';
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
  public selectBoxes: SelectBox[];
  public showBoxes = false;
  public nrOfRequiredDependencies: number;
  public depsMissingMessage: string;
  private packagePath: string;

  private selectedPackageType: string;
  private prevSelectedPackageType: string;

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
    const selectedPackageType$ = this.fh.form.controls['type'].valueChanges.pipe(
      map<any, string>(selectedPackageType => {
        if (lastType !== selectedPackageType || selectedPackageType === null) {
          lastType = selectedPackageType;
          this.setOtherFieldValue('dependencies', []);
          return selectedPackageType;
        }
      }),
    );

    const availablePackages$ = this.packagesStore.getAvailablePackages(this.packagePath);

    const dependencies$ = combineLatest([
      selectedPackageType$,
      availablePackages$
    ]).pipe(
      map(([selectedPackageType, availablePackages]) => {
        return availablePackages.find(availablePackage => availablePackage.object.type === selectedPackageType);
      }),
      map((availablePackage: LocalObject<AvailablePackage, string>) => {
        if (availablePackage) {
          // Read type to check for changes.
          this.selectedPackageType = availablePackage.object.type;
          return availablePackage.object.dependencyTypes;
        }
      }),
      map(depTypes => {
        // Hide select boxes if there are no dependencies
        depTypes ? this.showBoxes = true : this.showBoxes = false;
        return depTypes;
      })
    );

    this.selectBoxes$ = combineLatest([
      dependencies$,
      this.packagesStore.get(this.packagePath),
      availablePackages$
    ]).pipe(
      map(([dependencies, installedPackages, availablePackages]) => {
        dependencies = dependencies ? dependencies : [];

        let index = 0;

        // Only create new selectboxes when choosing another package type.
        if (this.prevSelectedPackageType === undefined || this.prevSelectedPackageType !== this.selectedPackageType) {
          this.prevSelectedPackageType = this.selectedPackageType;

          this.selectBoxes = (dependencies as string[]).map(dependency => {
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

          // Set default selected dependecy foreach selectbox, if any values are available and correct number of dependencies aren't already set
          if (!this.getOtherFieldValue('dependencies') || this.getOtherFieldValue('dependencies').length !== this.selectBoxes.length) {
            this.selectBoxes.forEach(selectBox => {
              if (selectBox.values && selectBox.values[0]) {
                const firstValue = selectBox.values[0].value;
                selectBox.selectedValue = firstValue;
                this.setDependencies(selectBox, firstValue);
              }
            });
          }
        }

        // Validate that required deps has been set.
        this.nrOfRequiredDependencies = (dependencies as string[]).length;
        if (this.nrOfRequiredDependencies !== this.getOtherFieldValue('dependencies').length) {
          // All not set
          this.fh.form.controls.dependencies.setErrors({ depsMissing: true });
          this.depsMissingMessage = 'Select a package for each dependency.';
        } else {
          // All set
          this.fh.form.controls.dependencies.setErrors(null);
          this.depsMissingMessage = undefined;
        }

        return this.selectBoxes;
      })
    );
  }

  public setDependencies(selectBox: SelectBox, selectedDepType: string): void {
    let deps = this.getOtherFieldValue('dependencies');

    deps = deps ? deps : [];
    deps[selectBox.index] = selectedDepType;
    this.setOtherFieldValue('dependencies', deps);
  }
}
