import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from 'lib/portal-ui/fields/field-base-component';
import { filter, map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { NgPackagesStore } from 'lib/ng-packages/packages';
import { flatten, notNull } from '@skysmack/framework';

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

  constructor(
    public packagesStore: NgPackagesStore
  ) { super(); }

  ngOnInit() {
    this.createSelectBoxes();
  }

  public setDependencies(selectBoxIndex, selectedDepType: string): void {
    // this.selectedDepTypes[dependency] = selectedDepType;

    // let deps = this.getOtherFieldValue('dependencies');
    // deps = deps ? deps : [];
    // deps.push(selectedDepType);
    // console.log(deps);
    // this.setOtherFieldValue('dependencies', deps);
  }

  private createSelectBoxes(): void {
    const selectedPackageType$ = this.fh.form.valueChanges.pipe(
      map<any, string>(values => values['type']),
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
