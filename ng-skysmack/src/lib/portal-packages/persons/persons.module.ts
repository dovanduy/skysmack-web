import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonsRoutingModule } from './persons-routing.module';
import { PersonsIndexComponent } from './components/persons-index/persons-index.component';
import { HttpClientModule } from '@angular/common/http';
import { NgPersonsModule } from './../../ng-packages/persons';
import { PersonsPackageManifest } from './../../portal-packages/persons/persons-package-manifest';
import { PackageLoader } from './../../ng-packages/packages/package-loader';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PersonsRoutingModule,
    NgPersonsModule
  ],
  exports: [],
  declarations: [PersonsIndexComponent],
  providers: [],
})
export class PersonsModule { }

export function loadPersonPackage(packageLoader: PackageLoader) {
  return () => packageLoader.add(new PersonsPackageManifest());
}