import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { NgPackagesStore } from '@skysmack/ng-packages';
import { flatten, notNull, AvailablePackage, LocalObject } from '@skysmack/framework';
import { Field } from '@skysmack/ng-ui';

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

  constructor(
    public packagesStore: NgPackagesStore
  ) { super(); }

  ngOnInit() {
    super.ngOnInit();
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

    const availablePackages$ = this.packagesStore.getAvailablePackages();

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
      this.packagesStore.get(),
      availablePackages$
    ).pipe(
      map(values => {
        const [dependencies, installedPackages, availablePackages] = values;

        // Set select field to invalid if number of selected dependencies doesn't match the required number.
        this.nrOfRequiredDependencies = (dependencies as string[]).length;
        if (this.nrOfRequiredDependencies !== this.getFieldValue()) {
          this.setOtherFieldErrors('type', { depsMissing: true });
        }

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

    // Remove errors if nr. of selected deps matches the needed amount.
    if (this.nrOfRequiredDependencies === this.getFieldValue().length) {
      this.setOtherFieldErrors('type', null);
    }
  }
}
