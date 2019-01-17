import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { filter, map, take } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { NgPackagesStore } from '@skysmack/ng-packages';
import { flatten, notNull, log } from '@skysmack/framework';

interface SelectBox {
  index: number;
  dependency: string;
  values: {
    value: string,
    displayName: string
  }[];
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

  public setDependencies(selectBox: SelectBox, selectedDepType: string): void {
    let deps = this.getOtherFieldValue('dependencies');

    deps = deps ? deps : [];
    deps[selectBox.index] = selectedDepType;

    this.setOtherFieldValue('dependencies', deps);
  }

  private createSelectBoxes(): void {
    let lastType = '';
    const selectedPackageType$ = this.fh.form.valueChanges.pipe(
      map<any, string>(values => {
        // Prevents endless loop when resestting dependencies field.
        if (lastType !== values['type']) {
          lastType = values['type'];
          this.setOtherFieldValue('dependencies', []);
        }

        return values['type'];
      }),
      notNull()
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
        // Hide select boxes if there is no dependencies
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
        return dependencies.map(dependency => {
          const possibleValues = installedPackages
            .filter(installedPackage => installedPackage.object.type === dependency)
            .map(installedPackage => ({
              value: installedPackage.object.path,
              displayName: installedPackage.object.name
            }));

          const foundPackage = availablePackages.find(x => x.object.type === dependency);
          const name = foundPackage ? foundPackage.object.name : '';

          return {
            index: index++,
            name,
            dependency,
            values: possibleValues
          } as SelectBox;
        });
      })
    );
  }
}
