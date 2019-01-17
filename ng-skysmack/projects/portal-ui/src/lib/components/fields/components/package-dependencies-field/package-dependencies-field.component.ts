import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { filter, map, take } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { NgPackagesStore } from '@skysmack/ng-packages';
import { flatten, notNull, log } from '@skysmack/framework';

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
  templateUrl: './package-dependencies-field.component.html',
  styleUrls: ['./package-dependencies-field.component.scss']
})
export class PackageDependenciesFieldComponent extends FieldBaseComponent implements OnInit {
  public selectedDepTypes = {};
  public selectBoxes$: Observable<SelectBox[]>;
  public showBoxes = false;

  constructor(
    public packagesStore: NgPackagesStore
  ) { super(); }

  ngOnInit() {
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
      map(availablePackage => availablePackage.object.dependencyTypes),
      map(depTypes => {
        // Hide select boxes if there are no dependencies
        depTypes ? this.showBoxes = true : this.showBoxes = false;
        return depTypes;
      }),
      notNull<string[]>()
    );

    this.selectBoxes$ = combineLatest(
      dependencies$,
      this.packagesStore.get(),
      availablePackages$
    ).pipe(
      map(values => {
        const [dependencies, installedPackages, availablePackages] = values;
        let index = 0;
        // Only run this when setting NEW dependencies, not when valus are set...
        return dependencies.map(dependency => {
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
          })
        });
      }),
    );
  }

  public setDependencies(selectBox: SelectBox, selectedDepType: string): void {
    let deps = this.getOtherFieldValue('dependencies');

    deps = deps ? deps : [];
    deps[selectBox.index] = selectedDepType;

    this.setOtherFieldValue('dependencies', deps);
  }
}
